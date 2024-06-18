import { CONFIGS } from '../../config';
import { storageContract } from '../../data/storage-contract';
import { MichelsonMap, BigMapAbstraction, MichelCodecPacker } from '@mavrykdynamics/taquito';
import { tokenBigmapCode } from '../../data/token_bigmap';
import { tokenCode, tokenInit } from '../../data/tokens';
import BigNumber from 'bignumber.js';

CONFIGS().forEach(({ lib, rpc, setup, knownBigMapContract }) => {
  const Mavryk = lib;

  describe(`Test contract origination with initialized Maps with variants of data through contract api using: ${rpc}`, () => {
    /** The purpose of the test is to make sure that the keys in the map are properly ordered by Taquito before injection of the operation,
    *   If the keys are not ordered, the node will reject the operation. */

    beforeEach(async () => {
      await setup()
    })

    it('Verify contract.originate with initialized Map with variants of data', async () => {
      const op = await Mavryk.contract.originate({
        balance: '1',
        code: storageContract,
        storage: {
          map1: MichelsonMap.fromLiteral({
            mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ: 1,
            KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv: 2,
            mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5: 2,
            mv1Ly8iGNbSg8hSNd632hnGf5xKzoGE67MTp: 3,
          }),
          map2: MichelsonMap.fromLiteral({
            '12': 3,
            '2': 1,
            '3': 2,
            '1': 2,
            '4': 3,
          }),
          map3: MichelsonMap.fromLiteral({
            '2': 1,
            '3': 2,
            '12': 3,
            '1': 2,
            '4': 3,
          }),
          map4: MichelsonMap.fromLiteral({
            zz: 1,
            aa: 2,
            ab: 2,
            cc: 3,
          }),
          map5: MichelsonMap.fromLiteral({
            aaaa: 1,
            aa: 1,
            ab: 2,
            '01': 2,
            '22': 3,
          }),
          map6: MichelsonMap.fromLiteral({
            '2': 1,
            '3': 2,
            '12': 3,
            '1': 2,
            '4': 3,
          }),
          map7: MichelsonMap.fromLiteral({
            '2018-04-23T10:26:00.996Z': 1,
            '2017-04-23T10:26:00.996Z': 2,
            '2019-04-23T10:26:00.996Z': 2,
            '2015-04-23T10:26:00.996Z': 3,
          }),
        },
      });
      await op.confirmation();
      await op.contract();
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });

    test(
      'originates a contract with empty bigmap and fetches the storage/bigmap',
      async () => {
        const signer = await Mavryk.signer.publicKeyHash();

        const bigMapInit = new MichelsonMap();
        bigMapInit.set(signer, { 0: '1', 1: new MichelsonMap() });
        bigMapInit.set('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina', { 0: '2', 1: new MichelsonMap() });
        bigMapInit.set('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ', { 0: '3', 1: new MichelsonMap() });
        bigMapInit.set('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5', { 0: '4', 1: new MichelsonMap() });
        // Deploy a contract with a big map
        const op = await Mavryk.contract.originate({
          code: tokenCode,
          storage: {
            0: bigMapInit,
            1: signer,
            2: true,
            3: '3',
          },
        });
        await op.confirmation();
        const contract = await op.contract();

        interface StorageType {
          0: BigMapAbstraction;
          1: string;
          2: boolean;
          3: BigNumber;
        }
        interface BigMapVal {
          0: BigNumber;
          1: MichelsonMap<string, BigNumber>;
        }

        // Fetch the storage of the newly deployed contract
        const storage = await contract.storage<StorageType>();

        // First property is the big map abstraction (This contract does not have annotations so we access by index)
        const bigMap = storage['0'];

        // Fetch multiples keys
        const bigMapValues = await bigMap.getMultipleValues<BigMapVal>([
          'mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina',
          'mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ',
          'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
          'mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5',
        ]);
        expect(bigMapValues.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['0'].toString()).toEqual(
          '2'
        );
        expect(bigMapValues.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['1']).toEqual(
          expect.objectContaining(new MichelsonMap())
        );

        expect(bigMapValues.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['0'].toString()).toEqual(
          '3'
        );
        expect(bigMapValues.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['1']).toEqual(
          expect.objectContaining(new MichelsonMap())
        );

        expect(bigMapValues.has('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeTruthy();
        expect(bigMapValues.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeUndefined();

        expect(bigMapValues.get('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5')!['0'].toString()).toEqual(
          '4'
        );
        expect(bigMapValues.get('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5')!['1']).toEqual(
          expect.objectContaining(new MichelsonMap())
        );

        // Specify a level
        const { header } = await Mavryk.rpc.getBlock();

        // Fetch multiples keys
        const bigMapValuesWithLevel = await bigMap.getMultipleValues<BigMapVal>(
          ['mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina', 'mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ'],
          header.level
        );
        expect(
          bigMapValuesWithLevel.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['0'].toString()
        ).toEqual('2');
        expect(bigMapValuesWithLevel.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['1']).toEqual(
          expect.objectContaining(new MichelsonMap())
        );

        expect(
          bigMapValuesWithLevel.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['0'].toString()
        ).toEqual('3');
        expect(bigMapValuesWithLevel.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['1']).toEqual(
          expect.objectContaining(new MichelsonMap())
        );

      }
    );
    it('Originate contract and init bigmap to empty map', async () => {
      const op = await Mavryk.contract.originate({
        balance: '1',
        code: tokenBigmapCode,
        storage: {
          owner: await Mavryk.signer.publicKeyHash(),
          accounts: new MichelsonMap(),
          totalSupply: '0',
        },
      });
      await op.confirmation();
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });
    it('originates a contract with empty bigmap and fetches the storage/bigmap', async () => {
      // Deploy a contract with a big map
      const op = await Mavryk.contract.originate({
        balance: '1',
        code: tokenCode,
        init: tokenInit(`${await Mavryk.signer.publicKeyHash()}`),
      });
      await op.confirmation();
      const contract = await op.contract();

      // Fetch the storage of the newly deployed contract
      const storage: any = await contract.storage();

      // First property is the big map abstraction (This contract does not have annotations so we access by index)
      const bigMap = storage['0'];

      // Fetch the key (current pkh that is running the test)
      const bigMapValue = await bigMap.get(await Mavryk.signer.publicKeyHash());
      expect(bigMapValue['0'].toString()).toEqual('2');
      expect(bigMapValue['1']).toEqual(expect.objectContaining(new MichelsonMap()));
    });

    it('Return undefined when BigMap key is not found', async () => {
      const myContract = await Mavryk.contract.at(knownBigMapContract);
      const contractStorage: any = await myContract.storage();
      const value = await contractStorage.ledger.get('mv19g9pKpuXGNKHv9unEpUHY1UBiAfhzX1dj');
      expect(value).toBeUndefined();
    });

    it('originates a contract with empty bigmap and fetches value in the bigMap using local packing', async () => {
      // Configure the mavrykToolkit to use the MichelCodecPacker (the data will be packed locally instead of using the rpc)
      Mavryk.setPackerProvider(new MichelCodecPacker());

      // Deploy a contract with a big map
      const op = await Mavryk.contract.originate({
        balance: '1',
        code: tokenCode,
        init: tokenInit(`${await Mavryk.signer.publicKeyHash()}`),
      });
      await op.confirmation();
      const contract = await op.contract();

      // Fetch the storage of the newly deployed contract
      const storage: any = await contract.storage();

      // First property is the big map abstraction (This contract does not have annotations so we access by index)
      const bigMap = storage['0'];

      // Fetch the key (current pkh that is running the test)
      const bigMapValue = await bigMap.get(await Mavryk.signer.publicKeyHash());
      expect(bigMapValue['0'].toString()).toEqual('2');
      expect(bigMapValue['1']).toEqual(expect.objectContaining(new MichelsonMap()));
    });

    it('originate a contract with empty bigMap but represented with object literal', async () => {
      const signer = await Mavryk.signer.publicKeyHash();
      const objLitAsMichelsonMap = {
        [signer]: { 0: '1', 1: {} },
        'mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina': { 0: '2', 1: {} },
        'mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ': { 0: '3', 1: {} },
        'mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5': { 0: '4', 1: {} },
      }
      const op = await Mavryk.contract.originate({
        code: tokenCode,
        storage: {
          0: objLitAsMichelsonMap,
          1: signer,
          2: true,
          3: '3',
        },
      });
      await op.confirmation();
      await op.contract();
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });
  });
});
