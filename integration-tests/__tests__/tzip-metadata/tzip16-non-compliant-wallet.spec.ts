import { CONFIGS } from "../../config";
import { tzip16, Tzip16Module, BigMapContractMetadataNotFoundError } from '@mavrykdynamics/taquito-tzip16';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  Mavryk.addExtension(new Tzip16Module());

  describe(`Test contract origination of a Tzip16 non-complaint contract through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify contract.originate for a simple contract having no metadata and then try to fetch metadata', async () => {

      const value = '1234';
      const code =
        [{ "prim": "parameter", "args": [{ "prim": "bytes" }] },
        { "prim": "storage", "args": [{ "prim": "bytes" }] },
        {
          "prim": "code",
          "args":
            [[{ "prim": "DUP" }, { "prim": "CAR" }, { "prim": "SWAP" },
            { "prim": "CDR" }, { "prim": "CONCAT" },
            { "prim": "NIL", "args": [{ "prim": "operation" }] },
            { "prim": "PAIR" }]]
        }];

      const op = await Mavryk.wallet.originate({
        code,
        storage: value
      }).send();
      await op.confirmation();
      const contractAddress = (await op.contract()).address;

      const contract = await Mavryk.wallet.at(contractAddress, tzip16);
      try {
        await contract.tzip16().getMetadata();
      } catch (ex) {
        expect(ex).toBeInstanceOf(BigMapContractMetadataNotFoundError);
      }
    });
  });
})
