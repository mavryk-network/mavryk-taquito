/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Schema } from '../src/schema/storage';
import { storage, rpcContractResponse } from '../data/sample20';
import BigNumber from 'bignumber.js';
import { MichelsonMap } from '../src/michelson-map';
import { expectMichelsonMap } from './utils';

describe('Contract test where the value of the map "selling" is a big_map', () => {
  it('Test storage schema', () => {
    const schema = new Schema(storage);
    expect(schema.ExtractSchema()).toEqual({
      _euranov: 'address',
      admin: 'address',
      auctions: {
        big_map: {
          key: "address",
          value: {
            map: {
              key: 'nat',
              value: {
                assetId: 'nat',
                bidCount: 'nat',
                claimed: 'bool',
                creator: 'address',
                currentBidAmount: 'mumav',
                currentBidOwner: 'address',
                duration: 'int',
                startTime: 'timestamp',
              },
            },
          },
        },
      },
      authorizedSC: {
        big_map: {
          key: "address",
          value: "bool",
        },
      },
      balance: 'int',
      paused: 'bool',
      selling: {
        map: {
          key: 'address',
          value: {
            big_map: {
              key: "nat",
              value: {
                fee: 'nat',
                owner: 'address',
                price: 'mumav',
              },
            },
          },
        },
      },
      tokenAddress: 'address',
    });

    expect(schema.generateSchema()).toEqual({
      "__michelsonType": "pair",
      schema: {
        _euranov: {
          "__michelsonType": "address",
          "schema": "address"
        },
        admin: {
          "__michelsonType": "address",
          "schema": "address"
        },
        auctions: {
          "__michelsonType": "big_map",
          "schema": {
            key: {
              "__michelsonType": "address",
              "schema": "address"
            },
            value: {
              __michelsonType: 'map',
              schema: {
                key: {
                  "__michelsonType": "nat",
                  "schema": "nat"
                },
                value: {
                  "__michelsonType": "pair",
                  "schema": {
                    assetId: {
                      "__michelsonType": "nat",
                      "schema": "nat"
                    },
                    bidCount: {
                      "__michelsonType": "nat",
                      "schema": "nat"
                    },
                    claimed: {
                      "__michelsonType": "bool",
                      "schema": "bool"
                    },
                    creator: {
                      "__michelsonType": "address",
                      "schema": "address"
                    },
                    currentBidAmount: {
                      "__michelsonType": "mumav",
                      "schema": "mumav"
                    },
                    currentBidOwner: {
                      "__michelsonType": "address",
                      "schema": "address"
                    },
                    duration: {
                      "__michelsonType": "int",
                      "schema": "int"
                    },
                    startTime: {
                      "__michelsonType": "timestamp",
                      "schema": "timestamp"
                    },
                  }
                },
              },
            },
          }
        },
        authorizedSC: {
          "__michelsonType": "big_map",
          "schema": {
            key: {
              "__michelsonType": "address",
              "schema": "address"
            },
            value: {
              "__michelsonType": "bool",
              "schema": "bool"
            },
          },
        },
        balance: {
          "__michelsonType": "int",
          "schema": "int"
        },
        paused: {
          "__michelsonType": "bool",
          "schema": "bool"
        },
        selling: {
          "__michelsonType": "map",
          "schema": {
            key: {
              "__michelsonType": "address",
              "schema": "address"
            },
            value: {
              "__michelsonType": "big_map",
              "schema": {
                key: {
                  "__michelsonType": "nat",
                  "schema": "nat"
                },
                value: {
                  "__michelsonType": "pair",
                  "schema": {
                    fee: {
                      "__michelsonType": "nat",
                      "schema": "nat"
                    },
                    owner: {
                      "__michelsonType": "address",
                      "schema": "address"
                    },
                    price: {
                      "__michelsonType": "mumav",
                      "schema": "mumav"
                    },
                  }
                },
              },
            },
          },
        },
        tokenAddress: {
          "__michelsonType": "address",
          "schema": "address"
        },
      }
    });
  });

  it('Test storage parsing', () => {
    const schema = new Schema(storage);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual({
      _euranov: 'mv18iDc74fniK8jDLRxFhMRxJByUoT82YJWo',
      admin: 'mv1BGRhvgEi5NFv5r317pu8GTLJvHnWY51ht',
      auctions: '68953',
      authorizedSC: '68954',
      balance: new BigNumber('5000000000000000000'),
      paused: false,
      selling: expectMichelsonMap(),
      tokenAddress: 'KT1Dd8G6EVG3HTYZpp4wn8dnzKBEeE1eftTt',
    });
  });

  it('Test storage encoding', () => {
    const schema = new Schema(storage);
    const selling = new MichelsonMap();
    const nestedBigMap = new MichelsonMap();
    nestedBigMap.set(2, {
      fee: '3',
      owner: 'mv18iDc74fniK8jDLRxFhMRxJByUoT82YJWo',
      price: '2',
    });
    selling.set('KT1LGGwuY8BVnnzuQCNmJgsY49VhqnxmnZh8', nestedBigMap);

    expect(
      schema.Encode({
        _euranov: 'mv18iDc74fniK8jDLRxFhMRxJByUoT82YJWo',
        admin: 'mv1BGRhvgEi5NFv5r317pu8GTLJvHnWY51ht',
        auctions: new MichelsonMap(),
        authorizedSC: new MichelsonMap(),
        balance: new BigNumber('5000000000000000000'),
        paused: false,
        selling,
        tokenAddress: 'KT1Dd8G6EVG3HTYZpp4wn8dnzKBEeE1eftTt',
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            {
              prim: 'Pair',
              args: [
                { string: 'mv18iDc74fniK8jDLRxFhMRxJByUoT82YJWo' },
                { string: 'mv1BGRhvgEi5NFv5r317pu8GTLJvHnWY51ht' },
              ],
            },
            {
              prim: 'Pair',
              args: [[], []],
            },
          ],
        },
        {
          prim: 'Pair',
          args: [
            {
              prim: 'Pair',
              args: [
                {
                  int: '5000000000000000000',
                },
                {
                  prim: 'False',
                },
              ],
            },
            {
              prim: 'Pair',
              args: [
                [
                  {
                    prim: 'Elt',
                    args: [
                      {
                        string: 'KT1LGGwuY8BVnnzuQCNmJgsY49VhqnxmnZh8',
                      },
                      [
                        {
                          prim: 'Elt',
                          args: [
                            {
                              int: '2',
                            },
                            {
                              prim: 'Pair',
                              args: [
                                {
                                  int: '3',
                                },
                                {
                                  prim: 'Pair',
                                  args: [
                                    {
                                      string: 'mv18iDc74fniK8jDLRxFhMRxJByUoT82YJWo',
                                    },
                                    {
                                      int: '2',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    ],
                  },
                ],
                {
                  string: 'KT1Dd8G6EVG3HTYZpp4wn8dnzKBEeE1eftTt',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
