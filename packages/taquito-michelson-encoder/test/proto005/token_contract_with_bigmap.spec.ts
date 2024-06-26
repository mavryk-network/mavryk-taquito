import {
  rpcContractResponse,
  bigMapDiff,
  bigMapValue,
} from '../../data/proto005/token_contract_with_bigmap';
import { Schema } from '../../src/schema/storage';
import BigNumber from 'bignumber.js';
import { MichelsonMap } from '../../src/michelson-map';
import { expectMichelsonMap } from '../utils';

describe('Token contract with big map', () => {
  it('should extract schema properly', () => {
    const schema = Schema.fromRPCResponse(rpcContractResponse as any);
    expect(schema.ExtractSchema()).toEqual({
      '0': {
        big_map: {
          key: 'address',
          value: {
            '0': 'nat',
            '1': {
              map: {
                key: 'address',
                value: 'nat',
              },
            },
          },
        },
      },
      '1': 'address',
      '2': 'bool',
      '3': 'nat',
    });

    expect(schema.generateSchema()).toEqual({
      __michelsonType: 'pair',
      schema: {
        '0': {
          __michelsonType: 'big_map',
          schema: {
            key: {
              __michelsonType: 'address',
              schema: 'address'
            },
            value: {
              __michelsonType: 'pair',
              schema: {
                '0': {
                  __michelsonType: 'nat',
                  schema: 'nat'
                },
                '1': {
                  __michelsonType: 'map',
                  schema: {
                    key: {
                      __michelsonType: 'address',
                      schema: 'address'
                    },
                    value: {
                      __michelsonType: 'nat',
                      schema: 'nat'
                    },
                  },
                },
              }
            },
          },
        },
        '1': {
          __michelsonType: 'address',
          schema: 'address'
        },
        '2': {
          __michelsonType: 'bool',
          schema: 'bool'
        },
        '3': {
          __michelsonType: 'nat',
          schema: 'nat'
        },
      }
    });
  });

  it('should encode a big map key properly', () => {
    const schema = Schema.fromRPCResponse(rpcContractResponse as any);
    expect(schema.EncodeBigMapKey('mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM')).toEqual({
      key: {
        bytes: '000099e9dc72acd837c6c069a30688969e8747a32157',
      },
      type: {
        prim: 'bytes',
      },
    });
  });

  it('should return big map id when decoding storage', () => {
    const schema = Schema.fromRPCResponse(rpcContractResponse as any);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual({
      '0': '20',
      '1': 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
      '2': false,
      '3': new BigNumber('300'),
    });
  });

  it('should decode big map diff properly', () => {
    const schema = Schema.fromRPCResponse(rpcContractResponse as any);
    expect(schema.ExecuteOnBigMapDiff(bigMapDiff)).toEqual(
      expectMichelsonMap({
        mv1TmzDzJj8sTDgdnfr3RC8uAwzPpkcf5uWc: {
          '0': new BigNumber('200'),
          '1': MichelsonMap.fromLiteral({
            mv1QDoi63Zde221sAaHHXttwZB9cmMhHyuQf: new BigNumber('60'),
          }),
        },
      })
    );
  });

  it('should decode big map value properly', () => {
    const schema = Schema.fromRPCResponse(rpcContractResponse as any);
    expect(schema.ExecuteOnBigMapValue(bigMapValue)).toEqual({
      '0': new BigNumber('200'),
      '1': expectMichelsonMap({
        mv1QDoi63Zde221sAaHHXttwZB9cmMhHyuQf: new BigNumber('60'),
      }),
    });
  });
});
