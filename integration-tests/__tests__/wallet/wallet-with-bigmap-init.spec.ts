import { CONFIGS } from "../../config";
import { MichelsonMap } from "@mavrykdynamics/taquito";
import { tokenBigmapCode } from "../../data/token_bigmap";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Tezos = lib;
  describe(`Test token contract origination with big map and with initial data through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify wallet.originate for a token contract with BigMap and with initialized Storage/BigMap', async () => {
      const addr = await Tezos.signer.publicKeyHash();
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

      const op = await Tezos.wallet.originate({
        balance: "1",
        code: tokenBigmapCode,
        storage: initialStorage
      }).send();
      await op.confirmation()
      expect(op.opHash).toBeDefined();
      expect(op.status).toBeTruthy
      const contract = await op.contract()
      // file deepcode ignore no-any: any is good enough
      const storage: any = await contract.storage()
      const got = (await storage.accounts.get(addr)).allowances.get(addr).toString()
      const want = (initialStorage.accounts.get(addr) as { balance: string, allowances: MichelsonMap<string, string> }).allowances.get(addr)
      expect(got).toEqual(want)
    });
  });
})
