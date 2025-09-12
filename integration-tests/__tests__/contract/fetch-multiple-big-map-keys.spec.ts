import { CONFIGS } from '../../config';
import { tokenCode } from '../../data/tokens';
import { MichelsonMap, BigMapAbstraction } from '@mavrykdynamics/taquito';
import BigNumber from 'bignumber.js';

CONFIGS().forEach(({ lib, rpc, setup }) => {
    const Mavryk = lib;

    describe(`Test contract origination with multiple BigMap variations through contract api using: ${rpc}`, () => {
        /**  The contract code doesn't have annotations, so the keys of the storage and of the bigmap are indexes. */

        beforeEach(async () => {
            await setup();
        });

        test('Verify contract.originate for a contract with a BigMap with multiple values to be indexed (also fetching the Storage/BigMap)', async () => {

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
                    3: '3'
                }
            });
            await op.confirmation();
            const contract = await op.contract();

            interface StorageType {
                0: BigMapAbstraction,
                1: string,
                2: boolean,
                3: BigNumber
            }
            interface BigMapVal {
                0: BigNumber,
                1: MichelsonMap<string, BigNumber>
            }

            // Fetch the storage of the newly deployed contract
            const storage = await contract.storage<StorageType>();

            // First property is the big map abstraction (This contract does not have annotations so we access by index)
            const bigMap = storage['0'];

            // Fetch multiples keys
            const bigMapValues = await bigMap.getMultipleValues<BigMapVal>(['mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina', 'mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ', 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW', 'mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5']);
            expect(bigMapValues.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['0'].toString()).toEqual('2');
            expect(bigMapValues.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['1']).toEqual(expect.objectContaining(new MichelsonMap()));

            expect(bigMapValues.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['0'].toString()).toEqual('3');
            expect(bigMapValues.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['1']).toEqual(expect.objectContaining(new MichelsonMap()));

            expect(bigMapValues.has('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeTruthy();
            expect(bigMapValues.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeUndefined();

            expect(bigMapValues.get('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5')!['0'].toString()).toEqual('4');
            expect(bigMapValues.get('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5')!['1']).toEqual(expect.objectContaining(new MichelsonMap()));


            // Specify a level
            const { header } = await Mavryk.rpc.getBlock();

            // Fetch multiples keys
            const bigMapValuesWithLevel = await bigMap.getMultipleValues<BigMapVal>(['mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina', 'mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ'], header.level);
            expect(bigMapValuesWithLevel.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['0'].toString()).toEqual('2');
            expect(bigMapValuesWithLevel.get('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina')!['1']).toEqual(expect.objectContaining(new MichelsonMap()));

            expect(bigMapValuesWithLevel.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['0'].toString()).toEqual('3');
            expect(bigMapValuesWithLevel.get('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ')!['1']).toEqual(expect.objectContaining(new MichelsonMap()));

        });
    });
});
