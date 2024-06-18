//This contract is used in integration tests where origination of contracts using voting is tested.

import { CONFIGS } from "../../config";
import { voteSample } from "../../data/vote-contract";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  describe(`Test contract origination of a vote contract through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify contract.originate for a voting contract and init the storage', async () => {
      // TODO: probably remove this as very expensive
      const op = await Mavryk.contract.originate({
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
      })
      await op.confirmation()
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY)
    });
  });
})
