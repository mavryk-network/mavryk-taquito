import { CONFIGS } from "./config";
import { storageContract } from "./data/storage-contract";
import { MichelsonMap } from "@mavrykdynamics/taquito";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Tezos = lib;

  describe(`Test contract origination with initialized Map with variants of data through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })

    it('Verify wallet.originate with initialized Map with variants of data', async () => {

      const op = await Tezos.wallet.originate({
        balance: "1",
        code: storageContract,
        storage: {
          "map1": MichelsonMap.fromLiteral({
            "mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ": 1,
            'KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv': 2,
            "mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5": 2,
            "mv1Ly8iGNbSg8hSNd632hnGf5xKzoGE67MTp": 3,
          }),
          "map2": MichelsonMap.fromLiteral({
            "2": 1,
            '3': 2,
            "1": 2,
            "4": 3,
          }),
          "map3": MichelsonMap.fromLiteral({
            "2": 1,
            '3': 2,
            "1": 2,
            "4": 3,
          }),
          "map4": MichelsonMap.fromLiteral({
            "zz": 1,
            'aa': 2,
            "ab": 2,
            "cc": 3,
          }),
          "map5": MichelsonMap.fromLiteral({
            "aaaa": 1,
            "aa": 1,
            'ab': 2,
            "01": 2,
            "22": 3,
          }),
          "map6": MichelsonMap.fromLiteral({
            "2": 1,
            '3': 2,
            "1": 2,
            "4": 3,
          }),
          "map7": MichelsonMap.fromLiteral({
            "2018-04-23T10:26:00.996Z": 1,
            '2017-04-23T10:26:00.996Z': 2,
            "2019-04-23T10:26:00.996Z": 2,
            "2015-04-23T10:26:00.996Z": 3,
          }),
        }
      }).send();

      await op.confirmation();
      expect(op.opHash).toBeDefined();

      const contract = await op.contract();
      expect(contract.storage).toBeDefined();
    })
  });
})
