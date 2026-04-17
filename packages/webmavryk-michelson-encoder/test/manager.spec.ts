/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { doSchema, rpcContractResponse, storage } from '../data/manager';
import { ParameterSchema } from '../src/schema/parameter';
import { Schema } from '../src/schema/storage';

describe('Schema test', () => {
  it('Should parse storage schema properly', () => {
    const schema = new Schema(storage);
    expect(schema.ExtractSchema()).toEqual('key_hash');
    expect(schema.generateSchema()).toEqual({
      __michelsonType: "key_hash",
      schema:'key_hash'
    });
  });

  it('Should parse storage properly', () => {
    const schema = new Schema(storage);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual(
      'mv1PwvFACmM7WAsRAqoESk8VQWsazRgpYmQN'
    );
  });

  it('Should extract signature properly', () => {
    const schema = new ParameterSchema(doSchema);
    expect(schema.ExtractSignatures()).toContainEqual([
      { lambda: { parameters: 'unit', returns: {list: "operation"} } },
    ]);
  });

  it('Should parse parameter properly', () => {
    const schema = new ParameterSchema(doSchema);
    expect(
      schema.Encode([
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
          prim: 'PUSH',
          args: [{ prim: 'key_hash' }, { string: 'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m' }],
        },
        { prim: 'SOME' },
        { prim: 'SET_DELEGATE' },
        { prim: 'CONS' },
      ])
    ).toEqual([
      { prim: 'DROP' },
      { prim: 'NIL', args: [{ prim: 'operation' }] },
      {
        prim: 'PUSH',
        args: [{ prim: 'key_hash' }, { string: 'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m' }],
      },
      { prim: 'SOME' },
      { prim: 'SET_DELEGATE' },
      { prim: 'CONS' },
    ]);
  });
});
