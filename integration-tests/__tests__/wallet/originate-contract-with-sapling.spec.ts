import { CONFIGS } from "../../config";
import { SaplingStateValue } from '@mavrykdynamics/taquito-michelson-encoder';
import { saplingContractDoubleJProto } from "../../data/sapling_test_contracts";

CONFIGS().forEach(({ lib, rpc, setup, }) => {
  const Mavryk = lib;

  describe(`Test contract origination with sapling through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup();
    })

    it('Originates a contract made with wallet api with sapling states in its storage', async () => {
      const op = await Mavryk.wallet.originate({
        code: saplingContractDoubleJProto,
        storage: {
          left: SaplingStateValue,
          right: SaplingStateValue
        }
      }).send();
      await op.confirmation();
      expect(op.opHash).toBeDefined();
    });
  });
})
