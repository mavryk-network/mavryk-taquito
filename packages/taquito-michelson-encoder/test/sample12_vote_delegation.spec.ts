/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Schema } from '../src/schema/storage';
import { storage, parameter } from '../data/sample12_vote_delegation';
import { ParameterSchema } from '../src/schema/parameter';

const testStorage = {
  prim: 'Pair',
  args: [
    {
      prim: 'Pair',
      args: [
        {
          string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        },
        { prim: 'None' },
      ],
    },
    {
      prim: 'Pair',
      args: [
        {
          string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        },
        { prim: 'None' },
      ],
    },
  ],
};

describe('Exchange contract test', () => {
  it('Test storage schema', () => {
    const schema = new Schema(storage.args[0] as any);
    expect(schema.Execute(testStorage)).toEqual({
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

  it('Test storage schema', () => {
    const schema = new Schema(storage.args[0] as any);
    expect(
      schema.Encode({
        mgr1: {
          addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
          key: null,
        },
        mgr2: {
          addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
          key: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        },
      })
    ).toEqual({
      args: [
        {
          args: [
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
            {
              prim: 'None',
            },
          ],
          prim: 'Pair',
        },
        {
          args: [
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
            {
              args: [
                {
                  string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
                },
              ],
              prim: 'Some',
            },
          ],
          prim: 'Pair',
        },
      ],
      prim: 'Pair',
    });
  });

  it('Test storage schema with undefined property', () => {
    const schema = new Schema(storage.args[0] as any);
    expect(
      schema.Encode({
        mgr1: {
          addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        },
        mgr2: {
          addr: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
          key: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        },
      })
    ).toEqual({
      args: [
        {
          args: [
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
            {
              prim: 'None',
            },
          ],
          prim: 'Pair',
        },
        {
          args: [
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
            {
              args: [
                {
                  string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
                },
              ],
              prim: 'Some',
            },
          ],
          prim: 'Pair',
        },
      ],
      prim: 'Pair',
    });
  });

  it('Test execute parameter', () => {
    const schema = new ParameterSchema(parameter.args[0]);
    expect(schema.Execute({ prim: 'None' })).toEqual(null);
  });

  it('Test execute parameter', () => {
    const schema = new ParameterSchema(parameter.args[0]);
    expect(schema.Encode(null)).toEqual({ prim: 'None' });
  });

  it('Test execute parameter', () => {
    const schema = new ParameterSchema(parameter.args[0]);
    expect(schema.Encode('mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX')).toEqual({
      prim: 'Some',
      args: [{ string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX' }],
    });
  });

  it('Should extract signature properly', () => {
    const schema = new ParameterSchema(parameter.args[0]);
    expect(schema.ExtractSignatures()).toContainEqual(['key_hash']);
  });
});
