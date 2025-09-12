import { CONFIGS } from "../../config";
import { failwithContractCode } from "../../data/failwith";
import { managerCode } from "../../data/manager_code";
import { DefaultContractType, MANAGER_LAMBDA, OriginationOperation } from "@mavrykdynamics/taquito";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  let contract: DefaultContractType;
  let opManager: OriginationOperation<DefaultContractType>;

  describe(`Test contract origination of a contract that calls 2nd contract that FAILs through contract api: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();

      try {
        const op = await Mavryk.contract.originate({
          balance: "1",
          code: failwithContractCode,
          storage: null
        });
        await op.confirmation();
        contract = await op.contract();

        opManager = await Mavryk.contract.originate({
          balance: "1",
          code: managerCode,
          init: { "string": await Mavryk.signer.publicKeyHash() },
        });
        await opManager.confirmation();
      } catch(e) {
        console.log(`Error when preparing the test: ${e}`);
      }
    });

    it('Verify that transferring token from the manager contract to a contract having a FAILWITH instruction will fail', async () => {
      const managerContract = await opManager.contract()
      expect(opManager.hash).toBeDefined();
      expect(opManager.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY)
      expect(opManager.status).toEqual('applied');

      try {
        await managerContract.methods.do(MANAGER_LAMBDA.transferToContract(contract.address, 1)).send({ amount: 0 })
        fail('Expected transfer operation to throw error')
      } catch (ex: any) {
        expect(ex.message).toMatch('test')
      }
    });
  });
})
