import { CONFIGS } from "../../config";
import { MichelsonMap } from "@mavrykdynamics/taquito";
import { tokenBigmapCode } from "../../data/token_bigmap";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  const test = require('jest-retries');

  describe(`Test token contract origination with big map and with initial data through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    test('Verify contract.originate for a token contract with BigMap and with initialized Storage/BigMap', 2, async () => {
      const addr = await Mavryk.signer.publicKeyHash();
      const initialStorage = {
        owner: addr,
        accounts: MichelsonMap.fromLiteral({
          [addr]: {
            balance: "1",
            allowances: MichelsonMap.fromLiteral({
              [addr]: "1"
            })
          },
          "mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ": {
            balance: "1",
            allowances: MichelsonMap.fromLiteral({
              [addr]: "1"
            })
          },
          "mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5": {
            balance: "2",
            allowances: MichelsonMap.fromLiteral({
              KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv: "1",
              [addr]: "1"
            })
          },
          "mv1Ly8iGNbSg8hSNd632hnGf5xKzoGE67MTp": {
            balance: "1",
            allowances: MichelsonMap.fromLiteral({
              [addr]: "1"
            })
          },
          "KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv": {
            balance: "1",
            allowances: MichelsonMap.fromLiteral({
              [addr]: "1"
            })
          }
        }),
        totalSupply: "6"
      }

      const op = await Mavryk.contract.originate({
        balance: "1",
        code: tokenBigmapCode,
        storage: initialStorage
      })
      await op.confirmation()
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY)
      const contract = await op.contract()
      const storage: any = await contract.storage()
      const got = (await storage.accounts.get(addr)).allowances.get(addr).toString()
      const want = (initialStorage.accounts.get(addr) as { balance: string, allowances: MichelsonMap<string, string> }).allowances.get(addr)
      expect(got).toEqual(want)
    });
  });
})
