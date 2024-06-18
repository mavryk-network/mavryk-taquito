import { CONFIGS } from "../../config";

CONFIGS().forEach(({ lib, rpc, setup, createAddress }) => {
  const Mavryk = lib;
  describe(`Test emptying a revealed implicit account through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify that a new revealed implicit account can be created, funded and emptied', async () => {
      const LocalTez = await createAddress();
      const op = await Mavryk.contract.transfer({ to: await LocalTez.signer.publicKeyHash(), amount: 2 });
      await op.confirmation();

      // Sending token from the account we want to empty
      // This will do the reveal operation automatically
      const op2 = await LocalTez.contract.transfer({ to: await Mavryk.signer.publicKeyHash(), amount: 1 });
      await op2.confirmation();

      const balance = await Mavryk.mv.getBalance(await LocalTez.signer.publicKeyHash())
      const estimate = await LocalTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), amount: balance.toNumber(), mumav: true });

      // Emptying the account
      // The max amount that can be sent now is the total balance minus the fees (no need for reveal fees)
      const maxAmount = balance.minus(estimate.suggestedFeeMumav).toNumber();
      const op3 = await LocalTez.contract.transfer({ to: await Mavryk.signer.publicKeyHash(), mumav: true, amount: maxAmount, fee: estimate.suggestedFeeMumav, gasLimit: estimate.gasLimit, storageLimit: 0 })
      await op3.confirmation();

      expect((await Mavryk.mv.getBalance(await LocalTez.signer.publicKeyHash())).toString()).toEqual("0")

    });
  });
})
