import BigNumber from 'bignumber.js';
import { bigMapDiff, params, rpcContractResponse, storage, txParams } from '../data/sample1';
import { ParameterSchema } from '../src/schema/parameter';
import { Schema } from '../src/schema/storage';
import { MichelsonMap } from '../src/michelson-map';
import { expectMichelsonMap } from './utils';

describe('Schema test', () => {
  it('Should extract schema properly', () => {
    const schema = new Schema(storage);
    const s = schema.ExtractSchema();
    expect(s).toEqual({
      accounts: {
        big_map: {
          key: "address",
          value: {
            allowances: {
              map: {
                key: 'address',
                value: 'nat',
              },
            },
            balance: 'nat',
          },
        },
      },
      name: 'string',
      owner: 'address',
      symbol: 'string',
      totalSupply: 'nat',
      version: 'nat',
    });

    expect(schema.generateSchema()).toEqual({
      __michelsonType: "pair",
      schema: {
        accounts: {
          __michelsonType: "big_map",
          schema: {
            key: {
              __michelsonType: "address",
              schema: "address"
            },
            value: {
              __michelsonType: "pair",
              schema: {
                allowances: {
                  __michelsonType: "map",
                  schema: {
                    key: {
                      __michelsonType: "address",
                      schema: "address"
                    },
                    value: {
                      __michelsonType: "nat",
                      schema: "nat"
                    },
                  },
                },
                balance: {
                  __michelsonType: "nat",
                  schema: "nat"
                }
              }
            },
          },
        },
        name: {
          __michelsonType: "string",
          schema: "string"
        },
        owner: {
          __michelsonType: "address",
          schema: "address"
        },
        symbol: {
          __michelsonType: "string",
          schema: "string"
        },
        totalSupply: {
          __michelsonType: "nat",
          schema: "nat"
        },
        version: {
          __michelsonType: "nat",
          schema: "nat"
        },
      }
    });
  });

  it('Should encode storage properly', () => {
    const schema = new Schema(storage);
    const result = schema.Encode({
      accounts: new MichelsonMap(),
      name: 'Token B',
      owner: 'mv1Ly8iGNbSg8hSNd632hnGf5xKzoGE67MTp',
      symbol: 'B',
      totalSupply: new BigNumber('1000'),
      version: new BigNumber('1'),
    });
    expect(result).toEqual({
      args: [[], rpcContractResponse.script.storage.args[1]],
      prim: 'Pair',
    });
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode('approve', 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW', '0');
    expect(schema.isMultipleEntryPoint).toBeTruthy();
    expect(result).toEqual({
      prim: 'Right',
      args: [
        {
          prim: 'Left',
          args: [
            {
              prim: 'Pair',
              args: [{ string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }, { int: '0' }],
            },
          ],
        },
      ],
    });
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode(
      'allowance',
      'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
      'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
      'KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D'
    );
    expect(result).toEqual({
      prim: 'Right',
      args: [
        {
          prim: 'Right',
          args: [
            {
              prim: 'Right',
              args: [
                {
                  prim: 'Right',
                  args: [
                    {
                      prim: 'Left',
                      args: [
                        {
                          prim: 'Pair',
                          args: [
                            { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                            {
                              prim: 'Pair',
                              args: [
                                { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                                { string: 'KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
  it('Should parse storage properly', () => {
    const schema = new Schema(storage);
    const s = schema.Execute(rpcContractResponse.script.storage);
    expect(s).toEqual({
      accounts: expectMichelsonMap(),
      name: 'Token B',
      owner: 'mv1Ly8iGNbSg8hSNd632hnGf5xKzoGE67MTp',
      symbol: 'B',
      totalSupply: new BigNumber('1000'),
      version: new BigNumber('1'),
    });
  });

  it('Should parse big map properly', () => {
    const schema = new Schema(storage);
    const s = schema.ExecuteOnBigMapDiff(bigMapDiff);
    expect(s).toEqual(
      expectMichelsonMap({
        mv1TmzDzJj8sTDgdnfr3RC8uAwzPpkcf5uWc: {
          allowances: MichelsonMap.fromLiteral({
            mv1QDoi63Zde221sAaHHXttwZB9cmMhHyuQf: new BigNumber('60'),
          }),
          balance: new BigNumber('200'),
        },
      })
    );
  });

  it('Should build parameter schema properly', () => {
    const schema = new ParameterSchema(params);
    const s = schema.ExtractSchema();
    expect(s).toEqual({
      allowance: {
        '4': 'address',
        '5': 'address',
        NatNatContract: 'contract',
      },
      approve: {
        '1': 'address',
        '2': 'nat',
      },
      balanceOf: {
        '3': 'address',
        NatContract: 'contract',
      },
      createAccount: {
        '5': 'address',
        '6': 'nat',
      },
      createAccounts: {
        list: {
          "6": "address",
          "7": "nat",
        },
      },
      transfer: {
        '0': 'address',
        '1': 'nat',
      },
      transferFrom: {
        '2': 'address',
        '3': 'address',
        '4': 'nat',
      },
    });

    expect(schema.generateSchema()).toEqual({
      __michelsonType: "or",
      schema: {
        allowance: {
          __michelsonType: "pair",
          schema: {
            '4': {
              __michelsonType: "address",
              schema: "address"
            },
            '5': {
              __michelsonType: "address",
              schema: "address"
            },
            NatNatContract: {
              __michelsonType: "contract",
              schema: {
                parameter: {
                  __michelsonType: "pair",
                  schema: {
                    '0': {
                      __michelsonType: "nat",
                      schema: "nat"
                    },
                    '1': {
                      __michelsonType: "nat",
                      schema: "nat"
                    }
                  }
                }
              }
            }
          }
        },
        approve: {
          __michelsonType: "pair",
          schema: {
            '1': {
              __michelsonType: "address",
              schema: "address"
            },
            '2': {
              __michelsonType: "nat",
              schema: "nat"
            }
          }
        },
        balanceOf: {
          __michelsonType: "pair",
          schema: {
            '3': {
              __michelsonType: "address",
              schema: "address"
            },
            NatContract: {
              __michelsonType: "contract",
              schema: {
                parameter: {
                  __michelsonType: "nat",
                  schema: "nat"
                }
              }
            },
          }
        },
        createAccount: {
          __michelsonType: "pair",
          schema: {
            '5': {
              __michelsonType: "address",
              schema: "address"
            },
            '6': {
              __michelsonType: "nat",
              schema: "nat"
            },
          }
        },
        createAccounts: {
          __michelsonType: "list",
          schema: {
            __michelsonType: "pair",
            schema: {
              "6": {
                __michelsonType: "address",
                schema: "address"
              },
              "7": {
                __michelsonType: "nat",
                schema: "nat"
              },
            }
          },
        },
        transfer: {
          __michelsonType: "pair",
          schema: {
            '0': {
              __michelsonType: "address",
              schema: "address"
            },
            '1': {
              __michelsonType: "nat",
              schema: "nat"
            },
          }
        },
        transferFrom: {
          __michelsonType: "pair",
          schema: {
            '2': {
              __michelsonType: "address",
              schema: "address"
            },
            '3': {
              __michelsonType: "address",
              schema: "address"
            },
            '4': {
              __michelsonType: "nat",
              schema: "nat"
            },
          }
        },
      }
    });
  });

  it('Should extract signature properly', () => {
    const schema = new ParameterSchema(params);
    const sig = schema.ExtractSignatures();
    expect(sig).toContainEqual(['allowance', 'address', 'address', 'contract']);
    expect(sig).toContainEqual(['approve', 'address', 'nat']);
    expect(sig).toContainEqual(['balanceOf', 'address', 'contract']);
    expect(sig).toContainEqual(['createAccount', 'address', 'nat']);
    expect(sig).toContainEqual(["createAccounts", {
      list: {
        "6": "address",
        "7": "nat"
      }
    }
    ]);
    expect(sig).toContainEqual(['transfer', 'address', 'nat']);
    expect(sig).toContainEqual(['transferFrom', 'address', 'address', 'nat']);
  });

  it('Should parse parameter properly', () => {
    const schema = new ParameterSchema(params);
    const s = schema.Execute(txParams);
    expect(s).toEqual({
      approve: {
        '1': 'mv1QDoi63Zde221sAaHHXttwZB9cmMhHyuQf',
        '2': new BigNumber('60'),
      },
    });
  });

  it(`Should find the value that corresponds to the type ({ prim: 'string', annots: ['%name'] }) in top-level pairs of the storage`, () => {
    const typeOfValueToFind = { prim: 'string', annots: ['%name'] };
    const storageSchema = new Schema(storage);
    const valueFound = storageSchema.FindFirstInTopLevelPair(rpcContractResponse.script.storage, typeOfValueToFind);
    expect(valueFound).toEqual({ string: 'Token B' });
  });

});
