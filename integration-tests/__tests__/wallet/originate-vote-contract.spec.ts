import { CONFIGS } from "../../config";
import { voteSample } from "../../data/vote-contract";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  describe(`Test contract origination of a vote contract through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    test('Verify wallet.originate for a voting contract and initialize the storage', async () => {
      const op = await Mavryk.wallet.originate({
        balance: "1",
        code: voteSample,
        storage: {
          mgr1: {
            addr: await Mavryk.signer.publicKeyHash(),
            key: null,
          },
          mgr2: {
            addr: await Mavryk.signer.publicKeyHash(),
            key: await Mavryk.signer.publicKeyHash(),
          },
        }
      }).send()
      await op.confirmation()
      expect(op.opHash).toBeDefined();
      expect(op.operationResults).toBeDefined();
    });
  });
})
