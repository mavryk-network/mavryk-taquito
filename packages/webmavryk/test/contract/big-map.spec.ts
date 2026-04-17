/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { HttpResponseError, STATUS_CODE } from '@mavrykdynamics/webmavryk-http-utils';
import BigNumber from 'bignumber.js';
import { MichelsonMap, Schema } from '@mavrykdynamics/webmavryk-michelson-encoder';
import { BigMapAbstraction } from '../../src/contract/big-map';

/**
 * BigMapAbstraction test
 */
describe('BigMapAbstraction test', () => {
  let rpcContractProvider: {
    getBigMapKeysByID: jest.Mock<any, any>;
    getStorage: jest.Mock<any, any>;
    getBigMapKey: jest.Mock<any, any>;
    getBigMapKeyByID: jest.Mock<any, any>;
  };

  beforeEach(() => {
    rpcContractProvider = {
      getBigMapKeysByID: jest.fn(),
      getStorage: jest.fn(),
      getBigMapKey: jest.fn(),
      getBigMapKeyByID: jest.fn(),
    };
  });

  describe('BigMapAbstraction getMultipleValues method', () => {
    it('throws error if error is not 404 from key lookup in BigMap', async () => {
      const expectedError = new HttpResponseError(
        'fail',
        STATUS_CODE.FORBIDDEN,
        'err',
        'test',
        'https://test.com'
      );
      rpcContractProvider.getBigMapKeysByID.mockRejectedValue(expectedError);
      const bigMap = new BigMapAbstraction(
        new BigNumber('1'),
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        }),
        rpcContractProvider as any
      );
      await expect(
        bigMap.getMultipleValues([
          'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8test',
          'mv2QzQq5ExjZTPHnEaNBKkieUF55npMTpcWS',
        ])
      ).rejects.toEqual(expectedError);
    });

    it('returns value for 1 key', async () => {
      rpcContractProvider.getBigMapKeysByID.mockResolvedValue(
        MichelsonMap.fromLiteral({
          mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8: new BigNumber(3),
        })
      );
      const bigMap = new BigMapAbstraction(
        new BigNumber('1'),
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        }),
        rpcContractProvider as any
      );
      const result = await bigMap.getMultipleValues(['mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8']);
      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(3));
    });

    it('returns values for 2 keys', async () => {
      rpcContractProvider.getBigMapKeysByID.mockResolvedValue(
        MichelsonMap.fromLiteral({
          mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: undefined,
          mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8: new BigNumber(3),
        })
      );
      const bigMap = new BigMapAbstraction(
        new BigNumber('1'),
        new Schema({
          prim: 'big_map',
          args: [{ prim: 'address' }, { prim: 'nat' }],
        }),
        rpcContractProvider as any
      );
      const result = await bigMap.getMultipleValues([
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        'mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8',
      ]);
      expect(result.get('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toBeUndefined();
      expect(result.get('mv1QBdiEFdMZ6HiZynK7ApD6diVCAAZpXBB8')).toEqual(new BigNumber(3));
    });
  });

  describe('BigMapAbstraction get method', () => {
    it('The get method accepts a parameter of type number', async () => {
      rpcContractProvider.getBigMapKeyByID.mockResolvedValue('test');
      const schema = new Schema({
        prim: 'big_map',
        args: [{ prim: 'int' }, { prim: 'string' }],
      });
      const bigMap = new BigMapAbstraction(new BigNumber('1'), schema, rpcContractProvider as any);
      expect(await bigMap.get(23)).toEqual('test');
      expect(rpcContractProvider.getBigMapKeyByID).toHaveBeenCalledWith('1', 23, schema, undefined);
    });

    it('The get method accepts a parameter of type string', async () => {
      rpcContractProvider.getBigMapKeyByID.mockResolvedValue('test');
      const schema = new Schema({
        prim: 'big_map',
        args: [{ prim: 'int' }, { prim: 'string' }],
      });
      const bigMap = new BigMapAbstraction(new BigNumber('1'), schema, rpcContractProvider as any);
      expect(await bigMap.get('23')).toEqual('test');
      expect(rpcContractProvider.getBigMapKeyByID).toHaveBeenCalledWith(
        '1',
        '23',
        schema,
        undefined
      );
    });

    it('The get method accepts a parameter of type string and a level', async () => {
      rpcContractProvider.getBigMapKeyByID.mockResolvedValue('test');
      const schema = new Schema({
        prim: 'big_map',
        args: [{ prim: 'int' }, { prim: 'string' }],
      });
      const bigMap = new BigMapAbstraction(new BigNumber('1'), schema, rpcContractProvider as any);
      expect(await bigMap.get('23', 123456)).toEqual('test');
      expect(rpcContractProvider.getBigMapKeyByID).toHaveBeenCalledWith('1', '23', schema, 123456);
    });

    it('includes type argument when calling the get method', async () => {
      rpcContractProvider.getBigMapKeyByID.mockResolvedValue('test');
      const schema = new Schema({
        prim: 'big_map',
        args: [{ prim: 'int' }, { prim: 'string' }],
      });
      const bigMap = new BigMapAbstraction(new BigNumber('1'), schema, rpcContractProvider as any);
      expect(await bigMap.get<string>('23')).toEqual('test');
      expect(rpcContractProvider.getBigMapKeyByID).toHaveBeenCalledWith(
        '1',
        '23',
        schema,
        undefined
      );
    });

    it('The get method accepts an object as parameter', async () => {
      rpcContractProvider.getBigMapKeyByID.mockResolvedValue('test');
      const schema = new Schema({
        prim: 'big_map',
        args: [
          {
            prim: 'pair',
            args: [
              { prim: 'string', annots: ['%test'] },
              { prim: 'string', annots: ['%test2'] },
            ],
          },
          { prim: 'string' },
        ],
      });
      const bigMap = new BigMapAbstraction(new BigNumber('1'), schema, rpcContractProvider as any);
      expect(await bigMap.get({ test: 'test2', test2: 'test3' }, 123456)).toEqual('test');
      expect(rpcContractProvider.getBigMapKeyByID).toHaveBeenCalledWith(
        '1',
        { test: 'test2', test2: 'test3' },
        schema,
        123456
      );
    });
  });
});
