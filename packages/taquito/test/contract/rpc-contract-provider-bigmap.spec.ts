import { RpcContractProvider } from '../../src/contract/rpc-contract-provider';
import { HttpResponseError, STATUS_CODE } from '@mavrykdynamics/taquito-http-utils';
import {
  sample,
  sampleStorage,
  sampleBigMapValue,
  tokenInit,
  tokenCode,
  sampleBigMapAbstractionValue,
} from './data';
import BigNumber from 'bignumber.js';
import { Context } from '../../src/context';
import { ContractMethod } from '../../src/contract/contract-methods/contract-method-flat-param';
import { MichelsonMap, Schema } from '@mavrykdynamics/taquito-michelson-encoder';
import { BigMapAbstraction } from '../../src/contract/big-map';
import { ContractMethodObject } from '../../src/contract/contract-methods/contract-method-object-param';
import { smallNestedMapTypecheck, ticketTokenTestMock } from '../helpers';

/**
 * RPCContractProvider test
 */
describe('RpcContractProvider test', () => {
  let rpcContractProvider: RpcContractProvider;
  let mockRpcClient: {
    getScript: jest.Mock<any, any>;
    getStorage: jest.Mock<any, any>;
    getBigMapExpr: jest.Mock<any, any>;
    getBigMapKey: jest.Mock<any, any>;
    getBlockHeader: jest.Mock<any, any>;
    getEntrypoints: jest.Mock<any, any>;
    getManagerKey: jest.Mock<any, any>;
    getBlock: jest.Mock<any, any>;
    getContract: jest.Mock<any, any>;
    getBlockMetadata: jest.Mock<any, any>;
    injectOperation: jest.Mock<any, any>;
    packData: jest.Mock<any, any>;
    preapplyOperations: jest.Mock<any, any>;
    getChainId: jest.Mock<any, any>;
    getSaplingDiffById: jest.Mock<any, any>;
  };

  let mockSigner: {
    publicKeyHash: jest.Mock<any, any>;
    publicKey: jest.Mock<any, any>;
    sign: jest.Mock<any, any>;
  };

  let mockEstimate;

  beforeEach(() => {
    mockRpcClient = {
      getBigMapExpr: jest.fn(),
      getEntrypoints: jest.fn(),
      getBlock: jest.fn(),
      getScript: jest.fn(),
      getManagerKey: jest.fn(),
      getStorage: jest.fn(),
      getBigMapKey: jest.fn(),
      getBlockHeader: jest.fn(),
      getBlockMetadata: jest.fn(),
      getContract: jest.fn(),
      injectOperation: jest.fn(),
      packData: jest.fn(),
      preapplyOperations: jest.fn(),
      getChainId: jest.fn(),
      getSaplingDiffById: jest.fn(),
    };

    mockSigner = {
      publicKeyHash: jest.fn(),
      publicKey: jest.fn(),
      sign: jest.fn(),
    };

    mockEstimate = {};

    // Required for operations confirmation polling
    mockRpcClient.getBlock.mockResolvedValue({
      operations: [[], [], [], []],
      header: {
        level: 0,
      },
    });

    const context = new Context(mockRpcClient as any, mockSigner as any);
    rpcContractProvider = new RpcContractProvider(
      // deepcode ignore no-any: any is good enough
      context,
      mockEstimate as any
    );

    mockRpcClient.getBigMapExpr.mockResolvedValue({
      prim: 'Pair',
      args: [{ int: '100' }, []],
    });
    mockRpcClient.getContract.mockResolvedValue({
      counter: 0,
      script: {
        code: [sample],
        storage: sampleStorage,
      },
    });
    mockRpcClient.getBlockHeader.mockResolvedValue({ hash: 'test' });

    mockRpcClient.packData.mockResolvedValue({
      packed: '747a325542477245424b7a7a5736686a586a78786951464a4e6736575232626d3647454e',
    });
  });

  describe('getStorage', () => {
    it('should call getStorage', async () => {
      const result = await rpcContractProvider.getStorage('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
      expect(result).toEqual({
        '0': {},
        '1': 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        '2': false,
        '3': new BigNumber('200'),
      });
    });
  });

  describe('getBigMapKey', () => {
    it('should call getBigMapKey', async () => {
      mockRpcClient.getBigMapKey.mockResolvedValue(sampleBigMapValue);
      const result = await rpcContractProvider.getBigMapKey(
        'KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D',
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW'
      );
      expect(result).toEqual({
        '0': new BigNumber('261'),
        '1': expect.objectContaining(
          MichelsonMap.fromLiteral({
            mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: new BigNumber('100'),
            KT1SawqvsVdAbDzqc4KwPpaS1S1veuFgF9AN: new BigNumber('100'),
          })
        ),
      });
      expect(mockRpcClient.getBigMapKey.mock.calls[0][0]).toEqual(
        'KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D'
      );
      expect(mockRpcClient.getBigMapKey.mock.calls[0][1]).toEqual({
        key: { bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17' },
        type: { prim: 'bytes' },
      });
    });
  });

  describe('getBigMapKeyByID', () => {
    it('should call getBigMapKeyByID', async () => {
      mockRpcClient.packData.mockResolvedValue({
        packed: '050a00000016000035e993d8c7aaa42b5e3ccd86a33390ececc73abd',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValue({ int: '3' });

      const result = await rpcContractProvider.getBigMapKeyByID(
        '133',
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        })
      );
      expect(result).toEqual(new BigNumber(3));
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruc6BZL8Lz2pipLAwGEqGwUjbdMzbVikNvD589fhVf4tKSG58ic'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][2]).toEqual({ block: 'head' });
    });

    it('should call getBigMapKeyByID when a block level is specified', async () => {
      mockRpcClient.packData.mockResolvedValue({
        packed: '050a00000016000035e993d8c7aaa42b5e3ccd86a33390ececc73abd',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValue({ int: '3' });

      const result = await rpcContractProvider.getBigMapKeyByID(
        '133',
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        }),
        123456
      );
      expect(result).toEqual(new BigNumber(3));
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruc6BZL8Lz2pipLAwGEqGwUjbdMzbVikNvD589fhVf4tKSG58ic'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][2]).toEqual({
        block: '123456',
      });
    });
  });

  describe('getBigMapKeysByID', () => {
    it('should call getBigMapKeysByID', async () => {
      mockRpcClient.getBlockHeader.mockResolvedValue({ level: 123456 });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a00000016000035e993d8c7aaa42b5e3ccd86a33390ececc73abd',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '3' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a0000001601e7670f32038107a59a2b9cfefae36ea21f5aa63c00',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '7' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a00000016000002298c03ed7d454a101eb7022bc95f7e5f41ac78',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '6' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a0000001601eadc0855adb415fa69a76fc10397dc2fb37039a000',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '5' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a000000160000cf49f66b9ea137e11818f2a78b4b6fc9895b4e50',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '4' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a0000001600001bc28a6b8fb2fb6af99fe3bba054e614539e5f12',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '1' });

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        [
          'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
          'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8',
          'mv18Cw7psUrAAPBpXYd9CtCpHg9EgjHP9KTe',
          'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc',
          'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m',
          'mv1KTJozfW7fHNjtLkeViQ5a864TU7TVdxbe',
        ],
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        })
      );
      expect(result.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(new BigNumber(3));
      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(7));
      expect(result.get('mv18Cw7psUrAAPBpXYd9CtCpHg9EgjHP9KTe')).toEqual(new BigNumber(6));
      expect(result.get('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc')).toEqual(new BigNumber(5));
      expect(result.get('mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m')).toEqual(new BigNumber(4));
      expect(result.get('mv1KTJozfW7fHNjtLkeViQ5a864TU7TVdxbe')).toEqual(new BigNumber(1));

      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[1][0]).toEqual({
        data: {
          bytes: '0000b16c9cee6f2de4c202fd55970a4be37ad5c127af',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[2][0]).toEqual({
        data: {
          bytes: '000002298c03ed7d454a101eb7022bc95f7e5f41ac78',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[3][0]).toEqual({
        data: {
          bytes: '0000e4b741173a16122e008cf1687389081b2d37cda7',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[4][0]).toEqual({
        data: {
          bytes: '0000ddc2d54fcb398b654d591060fb074e6a00b9c6ce',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[5][0]).toEqual({
        data: {
          bytes: '00007d8adcb03b4220f3c4788060e3b160497c4aff89',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruc6BZL8Lz2pipLAwGEqGwUjbdMzbVikNvD589fhVf4tKSG58ic'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][1]).toEqual(
        'expruEi8ai1ByaLny6wzWAnF5TkoperbVusBqp9vK8HM6cSLJkp9ym'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[2][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[2][1]).toEqual(
        'expruH3qgknRBJVLVkwdzf6wfBxd7Y1uqNxr7zuMFxTC12e5PacLfv'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[2][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[3][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[3][1]).toEqual(
        'expruQrA5Ttw1xDntbJfyMj7FZoe6qoWmiFXgVgW4UJyaSaKmi84BZ'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[3][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[4][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[4][1]).toEqual(
        'exprvPo6agtDv551oeRrjSDcETVHBi8TkRvFy7W6f3fGvygU6Un8NX'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[4][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[5][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[5][1]).toEqual(
        'exprtzAeDbQY935rEquwCdbZaaTYgXttwjkBNAVkRGck1EY6smmFUF'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[5][2]).toEqual({
        block: '123456',
      });
    });

    it('getBigMapKeysByID should set value to undefined for key that does not exist', async () => {
      mockRpcClient.getBlockHeader.mockResolvedValue({ level: 123456 });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a00000016000035e993d8c7aaa42b5e3ccd86a33390ececc73abd',
      });
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.NOT_FOUND,
        'err',
        'test',
        'https://test.com'
      );
      mockRpcClient.getBigMapExpr.mockRejectedValueOnce(expectedError);
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a0000001601e7670f32038107a59a2b9cfefae36ea21f5aa63c00',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '3' });

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        [
          'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW', // this is not a key of the big map
          'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8',
        ],
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        })
      );
      expect(result.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeUndefined();
      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(3));

      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[1][0]).toEqual({
        data: {
          bytes: '0000b16c9cee6f2de4c202fd55970a4be37ad5c127af',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruc6BZL8Lz2pipLAwGEqGwUjbdMzbVikNvD589fhVf4tKSG58ic'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][2]).toEqual({
        block: '123456',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][1]).toEqual(
        'expruEi8ai1ByaLny6wzWAnF5TkoperbVusBqp9vK8HM6cSLJkp9ym'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][2]).toEqual({
        block: '123456',
      });
    });

    it("getBigMapKeysByID should accept a level has a parameter and don't fetch the level form the rpc", async () => {
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a00000016000035e993d8c7aaa42b5e3ccd86a33390ececc73abd',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '34' });
      mockRpcClient.packData.mockResolvedValueOnce({
        packed: '050a0000001601e7670f32038107a59a2b9cfefae36ea21f5aa63c00',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValueOnce({ int: '3' });

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        ['mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW', 'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8'],
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        }),
        654321
      );
      expect(result.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(new BigNumber(34));
      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(3));

      expect(mockRpcClient.getBlock.mock.calls[0]).toBeUndefined();
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000a147d3fdd7df7eac61a24ea9ee4aac730ad3ab17',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.packData.mock.calls[1][0]).toEqual({
        data: {
          bytes: '0000b16c9cee6f2de4c202fd55970a4be37ad5c127af',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruc6BZL8Lz2pipLAwGEqGwUjbdMzbVikNvD589fhVf4tKSG58ic'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][2]).toEqual({
        block: '654321',
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][1]).toEqual(
        'expruEi8ai1ByaLny6wzWAnF5TkoperbVusBqp9vK8HM6cSLJkp9ym'
      );
      expect(mockRpcClient.getBigMapExpr.mock.calls[1][2]).toEqual({
        block: '654321',
      });
    });

    it('getBigMapKeysByID should set value to undefined if only 1 key to fetch and that it does not exist', async () => {
      mockRpcClient.packData.mockResolvedValue({
        packed: '050a0000001601e7670f32038107a59a2b9cfefae36ea21f5aa63c00',
      });
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.NOT_FOUND,
        'err',
        'test',
        'https://test.com'
      );
      mockRpcClient.getBigMapExpr.mockRejectedValue(expectedError);

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        ['mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8'],
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        })
      );

      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toBeUndefined();

      expect(mockRpcClient.getBlock.mock.calls[0]).toBeUndefined();
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000b16c9cee6f2de4c202fd55970a4be37ad5c127af',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruEi8ai1ByaLny6wzWAnF5TkoperbVusBqp9vK8HM6cSLJkp9ym'
      );
    });

    it('getBigMapKeysByID should not call getBlock when there is only 1 key to fetch', async () => {
      mockRpcClient.packData.mockResolvedValue({
        packed: '050a0000001601e7670f32038107a59a2b9cfefae36ea21f5aa63c00',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValue({ int: '3' });

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        ['mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8'],
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        })
      );

      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(3));

      expect(mockRpcClient.getBlock.mock.calls[0]).toBeUndefined();
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          bytes: '0000b16c9cee6f2de4c202fd55970a4be37ad5c127af',
        },
        type: {
          prim: 'bytes',
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'expruEi8ai1ByaLny6wzWAnF5TkoperbVusBqp9vK8HM6cSLJkp9ym'
      );
    });

    it('getBigMapKeysByID with a pair as key and a pair as value', async () => {
      mockRpcClient.packData.mockResolvedValue({
        packed: '0507070100000005746573743201000000057465737433',
      });
      mockRpcClient.getBigMapExpr.mockResolvedValue({
        prim: 'Pair',
        args: [{ int: '2' }, { string: '3' }],
      });

      const result = await rpcContractProvider.getBigMapKeysByID(
        '133',
        [{ test: 'test2', test2: 'test3' }],
        new Schema({
          prim: 'big_map',
          args: [
            {
              prim: 'pair',
              args: [
                { prim: 'string', annots: ['%test'] },
                { prim: 'string', annots: ['%test2'] },
              ],
            },
            { prim: 'pair', args: [{ prim: 'int' }, { prim: 'int' }] },
          ],
        })
      );
      expect(result.has({ test: 'test2', test2: 'test3' })).toBeTruthy();
      expect(result.get({ test: 'test2', test2: 'test3' })).toEqual({
        0: new BigNumber(2),
        1: new BigNumber(3),
      });
      expect(mockRpcClient.getBlock.mock.calls[0]).toBeUndefined();
      expect(mockRpcClient.packData.mock.calls[0][0]).toEqual({
        data: {
          prim: 'Pair',
          args: [{ string: 'test2' }, { string: 'test3' }],
        },
        type: {
          prim: 'pair',
          args: [{ prim: 'string' }, { prim: 'string' }],
        },
      });
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getBigMapExpr.mock.calls[0][1]).toEqual(
        'exprteZPr9h8pkyKKw9PMFEXqG1jbMBkj4A2KC9Mp5cAAjSrDWvfXs'
      );
    });

    it('getBigMapKeysByID unexpected exception', async () => {
      mockRpcClient.getBlock.mockResolvedValue({ header: { level: 123456 } });
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.UNAUTHORIZED,
        'err',
        'test',
        'https://test.com'
      );
      mockRpcClient.packData.mockRejectedValue(expectedError);

      try {
        await rpcContractProvider.getBigMapKeysByID(
          '133',
          ['mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW', 'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8'],
          new Schema({
            prim: 'big_map',
            args: [{ prim: 'address' }, { prim: 'nat' }],
          })
        );
      } catch (err) {
        expect(err).toBeInstanceOf(HttpResponseError);
      }
    });
  });

  describe('BigMapAbstraction', () => {
    it('returns undefined on bad key in BigMap', async () => {
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.NOT_FOUND,
        'err',
        'test',
        'https://test.com'
      );
      mockRpcClient.getBigMapExpr.mockRejectedValue(expectedError);
      const schema = new Schema(sampleBigMapAbstractionValue);
      const bigMap = new BigMapAbstraction(
        new BigNumber('mv2bm7Juz5FAKvcGS1Zqcakz1LBVc92Xu2QJ'),
        schema,
        rpcContractProvider
      );
      const returnValue = await bigMap.get('test');
      expect(returnValue).toEqual(undefined);
    });
    it('returns error if error is not 404 from key lookup in BigMap', async () => {
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.FORBIDDEN,
        'err',
        'test',
        'https://test.com'
      );
      mockRpcClient.getBigMapExpr.mockRejectedValue(expectedError);
      const schema = new Schema(sampleBigMapAbstractionValue);
      const bigMap = new BigMapAbstraction(
        new BigNumber('mv2bm7Juz5FAKvcGS1Zqcakz1LBVc92Xu2QJ'),
        schema,
        rpcContractProvider
      );
      await expect(bigMap.get('test')).rejects.toEqual(expectedError);
    });
  });

  describe('getSaplingDiffByID', () => {
    it('should call getSaplingDiffById', async () => {
      mockRpcClient.getBlock.mockResolvedValue({ header: { level: 123456 } });
      mockRpcClient.getSaplingDiffById.mockResolvedValue({
        root: 'fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e',
        commitments_and_ciphertexts: [],
        nullifiers: [],
      });

      const result = await rpcContractProvider.getSaplingDiffByID('133');
      expect(result.root).toEqual(
        'fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e'
      );
      expect(result.commitments_and_ciphertexts).toEqual([]);
      expect(result.nullifiers).toEqual([]);

      expect(mockRpcClient.getSaplingDiffById.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getSaplingDiffById.mock.calls[0][1]).toEqual({ block: 'head' }); // no block specified
    });

    it('should call getSaplingDiffById with a specified block level', async () => {
      mockRpcClient.getBlock.mockResolvedValue({ header: { level: 123456 } });
      mockRpcClient.getSaplingDiffById.mockResolvedValue({
        root: 'fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e',
        commitments_and_ciphertexts: [],
        nullifiers: [],
      });

      const result = await rpcContractProvider.getSaplingDiffByID('133', 654321);
      expect(result.root).toEqual(
        'fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e'
      );
      expect(result.commitments_and_ciphertexts).toEqual([]);
      expect(result.nullifiers).toEqual([]);

      expect(mockRpcClient.getSaplingDiffById.mock.calls[0][0]).toEqual('133');
      expect(mockRpcClient.getSaplingDiffById.mock.calls[0][1]).toEqual({ block: '654321' });
    });
  });

  describe('at', () => {
    it('should return contract method', async () => {
      mockRpcClient.getBlockHeader.mockResolvedValue({ hash: 'test' });
      mockRpcClient.getEntrypoints.mockResolvedValue({
        entrypoints: {
          mint: { prim: 'pair', args: [{ prim: 'key' }, { prim: 'nat' }] },
        },
      });
      mockRpcClient.preapplyOperations.mockResolvedValue([]);
      mockRpcClient.getContract.mockResolvedValue({
        counter: 0,
        script: {
          code: tokenCode,
          storage: tokenInit,
        },
      });
      mockRpcClient.getBlockMetadata.mockResolvedValue({
        next_protocol: 'PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU',
      });
      mockSigner.sign.mockResolvedValue({ sbytes: 'test', prefixSig: 'test_sig' });
      mockSigner.publicKey.mockResolvedValue('test_pub_key');
      mockSigner.publicKeyHash.mockResolvedValue('mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q');
      const result = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
      expect(result.methods.mint('test', 100)).toBeInstanceOf(ContractMethod);
      expect(result.methodsObject.mint({ 0: 'test', 1: 100 })).toBeInstanceOf(ContractMethodObject);
    });
  });

  describe('Storage', () => {
    it('should have defined storage with TicketTokens without errors', async () => {
      mockRpcClient.getEntrypoints.mockResolvedValue({
        entrypoints: {},
      });
      mockRpcClient.getContract.mockResolvedValue(ticketTokenTestMock);
      const rpcContract = await rpcContractProvider.at('KT19mzgsjrR2Er4rm4vuDqAcMfBF5DBMs2uq');
      const storage = (await rpcContract.storage()) as any;
      expect(rpcContract).toBeDefined();

      const keyList = storage.keyMap;
      expect(keyList.size).toEqual(3);
    });

    it('Should have defined storage with Nested bigmap in multiple maps', async () => {
      mockRpcClient.getEntrypoints.mockResolvedValue({
        entrypoints: {},
      });
      mockRpcClient.getContract.mockResolvedValue(smallNestedMapTypecheck);
      const rpcContract = await rpcContractProvider.at('KT1SpsNu3hGHN5T5Vt9g9GKUggzvBpxaLxq7');
      expect(rpcContract).toBeDefined();
      const storage = (await rpcContract.storage()) as any;

      const keyList = storage.keyMap;
      expect(keyList.size).toEqual(1);
    });
  });
});
