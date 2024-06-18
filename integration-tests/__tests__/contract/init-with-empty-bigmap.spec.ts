import { CONFIGS } from "../../config";
import { tokenBigmapCode } from "../../data/token_bigmap";
import { MichelsonMap } from "@mavrykdynamics/taquito";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  describe(`Test contract origination with empty BigMap origination scenario through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify contract.originate for a contract and init the BigMap to empty map', async () => {
      const op = await Mavryk.contract.originate({
        balance: "1",
        code: tokenBigmapCode,
        storage: {
          owner: await Mavryk.signer.publicKeyHash(),
          accounts: new MichelsonMap(),
          totalSupply: "0"
        }
      })
      await op.confirmation()
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY)
    });
  });
})
