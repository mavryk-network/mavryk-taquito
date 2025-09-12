import { CONFIGS } from "../../config";
import { BigMapAbstraction, MichelsonMap } from "@mavrykdynamics/taquito";
import { storageContractWithPairAsKey } from "../../data/storage-contract-with-pair-as-key";
import { mapWithPairAsKeyCode, mapWithPairAsKeyStorage } from "../../data/bigmap_with_pair_as_key";
import { MichelsonMapKey } from "@mavrykdynamics/taquito-michelson-encoder";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  let storageMap: MichelsonMap<MichelsonMapKey, unknown>;

  describe(`Test contract origination with pair as key in storage through contract api using: ${rpc}`, () => {
    beforeAll(async () => {
      await setup();

      storageMap = new MichelsonMap();
      // The contract schema in this example has a key with 8 nested pairs
      // (int(nat(string(bytes(mumav(bool(key_hash(timestamp(address)))))))))
      // and a value of `int`
      // The contract schema in this particular test does not have map
      // annotations which means that each value needs to have an index
      // as property name.
      storageMap.set({
        0: "1",                                    // int
        1: "2",                                    // nat
        2: "test",                                 // string
        3: "cafe",                                 // bytes
        4: "10",                                   // mumav
        5: true,                                   // bool
        6: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV", // key_hash
        7: "2019-09-06T15:08:29.000Z",             // timestamp
        8: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"  // address
      }, 100);

      storageMap.set({
        0: "1",
        1: "2",
        2: "test",
        3: "cafe",
        4: "10",
        5: false,
        6: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV",
        7: "2019-09-06T15:08:29.000Z",
        8: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
      }, 100);

      storageMap.set({
        0: "2",
        1: "2",
        2: "test",
        3: "cafe",
        4: "10",
        5: true,
        6: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV",
        7: "2019-09-06T15:08:29.000Z",
        8: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
      }, 100);

      storageMap.set({
        0: "1",
        1: "2",
        2: "test",
        3: "cafe",
        4: "10",
        5: true,
        6: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV",
        7: "2018-09-06T15:08:29.000Z",
        8: "mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV"
      }, 100);
    });

    it('Verify contract.originate for a contract with pair as a key', async () => {
      const op = await Mavryk.contract.originate({
        balance: "0",
        code: storageContractWithPairAsKey,
        storage: storageMap
      });

      await op.confirmation();
      
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });

    it('Verify contract.originate for a contract with pair as a key in map ', async () => {
      /** The init property is used in this test instead of the storage property as in the previous test. */
      const op = await Mavryk.contract.originate({
        balance: "0",
        code: mapWithPairAsKeyCode,
        init: mapWithPairAsKeyStorage
      });
      await op.confirmation();

      const contract = await op.contract();

      const storage2: BigMapAbstraction = await contract.storage();
      const value = await storage2.get({ 'test': 'test2', 'test2': 'test3' });
      expect(value).toEqual('test');
    });
  });
});
