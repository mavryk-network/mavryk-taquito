import { CONFIGS } from "../../config";

CONFIGS().forEach(({ lib, rpc, setup, createAddress, knownBaker }) => {
  const Mavryk = lib;


  describe(`Test emptying a delegated implicit account through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    test('Verify that new Account can be created, delegated and attempt to empty, it should fail despite delegation', async () => {
      const LocalTez = await createAddress();
      const op = await Mavryk.wallet.transfer({ to: await LocalTez.signer.publicKeyHash(), amount: 2 }).send();
      await op.confirmation();

      // Delegating from the account we want to empty
      // This will do the reveal operation automatically
      const op2 = await LocalTez.wallet.setDelegate({ delegate: knownBaker }).send();
      await op2.confirmation();

      const estimate = await LocalTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), amount: 0.5 });

      // Emptying the account
      // The max amount that can be sent now is the total balance minus the fees (no need for reveal fees)
      const balance = await Mavryk.mv.getBalance(await LocalTez.signer.publicKeyHash())
      const maxAmount = balance.minus(estimate.suggestedFeeMumav).toNumber();
      expect.assertions(1)
      try {
        await LocalTez.wallet.transfer({ to: await Mavryk.signer.publicKeyHash(), mumav: true, amount: maxAmount }).send();
      } catch (ex: any) {
        expect(ex.message).toMatch('empty_implicit_delegated_contract')
      }
    });
  });
})
