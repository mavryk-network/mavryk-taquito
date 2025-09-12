import { CONFIGS } from '../config';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test injecting more than one manager operation in a block: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();
    });

    it('Verify that doing transfers without awaiting the confirmation after each will fail', async () => {
      try {
        const op1 = await Mavryk.contract.transfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 1 });
        const op2 = await Mavryk.contract.transfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 2 });

        await op1.confirmation();
        await op2.confirmation();
      } catch (error: any) {
        // not checking for exact error message because it is not deterministic
        expect(error.message).toBeDefined();
      }
    });
  });
});
