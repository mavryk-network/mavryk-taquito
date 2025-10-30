/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { rpcContractResponse, storage } from '../data/vote_contract';
import { Schema } from '../src/schema/storage';

describe('Schema test', () => {
  it('Should parse storage schema properly', () => {
    const schema = new Schema(storage);
    expect(schema.ExtractSchema()).toEqual({
      mgr1: {
        addr: 'address',
        key: { Some: 'key_hash' },
      },
      mgr2: {
        addr: 'address',
        key: { Some: 'key_hash' },
      },
    });

    expect(schema.generateSchema()).toEqual({
      __michelsonType: 'pair',
      schema: {
        mgr1: {
          __michelsonType: 'pair',
          schema: {
            addr: {
              __michelsonType: 'address',
              schema: 'address',
            },
            key: {
              __michelsonType: 'option',
              schema: {
                __michelsonType: 'key_hash',
                schema: 'key_hash',
              },
            },
          },
        },
        mgr2: {
          __michelsonType: 'pair',
          schema: {
            addr: {
              __michelsonType: 'address',
              schema: 'address',
            },
            key: {
              __michelsonType: 'option',
              schema: {
                __michelsonType: 'key_hash',
                schema: 'key_hash',
              },
            },
          },
        },
      },
    });
  });

  it('Should parse storage properly', () => {
    const schema = new Schema(storage);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual({
      mgr1: {
        addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        key: null,
      },
      mgr2: {
        addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        key: null,
      },
    });
  });
});
