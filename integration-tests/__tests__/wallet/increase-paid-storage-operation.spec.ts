import { CONFIGS } from '../../config';

CONFIGS().forEach(({ lib, rpc, setup }) => {

  const Mavryk = lib;
  let simpleContractAddress: string;
  describe(`Test Increase Paid Storage using: ${rpc}`, () => {
    beforeAll(async () => {
      await setup(true);

      try {
        const op = await Mavryk.wallet.originate({
          balance: "1",
          code: `parameter string;
          storage string;
          code {CAR;
                PUSH string "Hello ";
                CONCAT;
                NIL operation; PAIR};
          `,
          init: `"test"`
        }).send();

        await op.confirmation();

        simpleContractAddress = (await op.contract()).address
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });

    it(`should be able to increase the paid storage of a contract successfully: ${rpc}`, async () => {
      const paidSpaceBefore = await Mavryk.rpc.getStoragePaidSpace(simpleContractAddress);

      const op = await Mavryk.wallet.increasePaidStorage({
        amount: 1,
        destination: simpleContractAddress
      }).send();

      await op.confirmation();
      expect(op.opHash).toBeDefined();
      expect(op.status).toBeTruthy();

      const paidSpaceAfter = await Mavryk.rpc.getStoragePaidSpace(simpleContractAddress);

      expect(parseInt(paidSpaceAfter)).toEqual(parseInt(paidSpaceBefore) + 1);
    });

    it(`should be able to include increasePaidStorage operation in a batch: ${rpc}`, async () => {
      const paidSpaceBefore = await Mavryk.rpc.getStoragePaidSpace(simpleContractAddress);

      const batch = await Mavryk.wallet
        .batch()
        .withOrigination({
          balance: "1",
          code: `parameter string;
          storage string;
          code {CAR;
                PUSH string "Hello ";
                CONCAT;
                NIL operation; PAIR};
          `,
          init: `"test"`
        })
        .withIncreasePaidStorage({
          amount: 1,
          destination: simpleContractAddress
        })
      const op = await batch.send();
      const conf = await op.confirmation();
      const currentConf = await op.getCurrentConfirmation();

      expect(currentConf).toEqual(1);
      expect(conf).toEqual(expect.objectContaining({
        expectedConfirmation: 1,
        currentConfirmation: 1,
        completed: true
      }))
      expect(op.status).toBeTruthy();

      const paidSpaceAfter = await Mavryk.rpc.getStoragePaidSpace(simpleContractAddress);

      expect(parseInt(paidSpaceAfter)).toEqual(parseInt(paidSpaceBefore) + 1);
    });

    it('should return error when destination contract address is invalid', async () => {
      expect(async () => {
        const op = await Mavryk.wallet.increasePaidStorage({
          amount: 1,
          destination: 'invalid_address'
        });
      }).rejects.toThrow();
    });
  });
});
