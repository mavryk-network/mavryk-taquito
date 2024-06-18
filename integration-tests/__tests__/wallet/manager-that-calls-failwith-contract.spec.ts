import { CONFIGS } from "../../config";
import { failwithContractCode } from "../../data/failwith";
import { managerCode } from "../../data/manager_code";
import { MANAGER_LAMBDA } from "@mavrykdynamics/taquito";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test contract origination of a contract that calls 2nd contract that FAILs through wallet api: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    test('Verify that transferring token from the manager contract to a contract having a FAILWITH instruction will fail.', async () => {
      const op = await Mavryk.wallet.originate({
        balance: "1",
        code: failwithContractCode,
        storage: null
      }).send();
      const contract = await op.contract()
      expect(op.opHash).toBeDefined();
      await op.confirmation();

      const opManager = await Mavryk.wallet.originate({
        balance: "1",
        code: managerCode,
        init: { "string": await Mavryk.signer.publicKeyHash() },
      }).send()

      const managerContract = await opManager.contract()
      expect(opManager.opHash).toBeDefined();
      await opManager.confirmation();
      try {
        await managerContract.methods.do(MANAGER_LAMBDA.transferToContract(contract.address, 1)).send({ amount: 0 })
        fail('Expected transfer operation to throw error')
      } catch (ex: any) {
        expect(ex.message).toMatch('test')
      }
    });
  });
})
