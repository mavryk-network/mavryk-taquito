/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { code } from '../../data/proto005/big_map_encoding';
import { Schema } from '../../src/schema/storage';
import { MichelsonMap } from '../../src/michelson-map';

describe('Contract with unit encoding', () => {
  it('Should encode storage properly when using empty big map', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: new MichelsonMap(),
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });

  it('Should encode storage properly when using empty big map represented with object literal', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: {},
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });

  it('Should encode storage properly when using big map with single entry', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: MichelsonMap.fromLiteral({
          mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: {
            balance: '0',
            allowances: new MichelsonMap(),
          },
        }),
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [
              {
                prim: 'Elt',
                args: [
                  { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                  {
                    prim: 'Pair',
                    args: [[], { int: '0' }],
                  },
                ],
              },
            ],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });

  it('Should encode storage properly when using big map with single entry represented with object literal', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: {
          mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: {
            balance: '0',
            allowances: {},
          },
        },
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [
              {
                prim: 'Elt',
                args: [
                  { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                  {
                    prim: 'Pair',
                    args: [[], { int: '0' }],
                  },
                ],
              },
            ],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });

  it('Should encode storage properly when using complex big map initialisation', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: MichelsonMap.fromLiteral({
          mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: {
            balance: '0',
            allowances: new MichelsonMap(),
          },
          mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g: {
            balance: '0',
            allowances: MichelsonMap.fromLiteral({
              mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: '2',
              mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g: '3',
            }),
          },
        }),
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [
              {
                prim: 'Elt',
                args: [
                  { string: 'mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g' },
                  {
                    prim: 'Pair',
                    args: [
                      [
                        {
                          prim: 'Elt',
                          args: [{ string: 'mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g' }, { int: '3' }],
                        },
                        {
                          prim: 'Elt',
                          args: [{ string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }, { int: '2' }],
                        },
                      ],
                      { int: '0' },
                    ],
                  },
                ],
              },
              {
                prim: 'Elt',
                args: [
                  { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                  {
                    prim: 'Pair',
                    args: [[], { int: '0' }],
                  },
                ],
              },
            ],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });

  it('Should encode storage properly when using complex big map initialisation represented with object literal', () => {
    const schema = new Schema(code[1].args[0] as any);
    expect(
      schema.Encode({
        owner: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
        totalSupply: '100',
        accounts: {
          mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: {
            balance: '0',
            allowances: {},
          },
          mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g: {
            balance: '0',
            allowances: {
              mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW: '2',
              mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g: '3',
            },
          },
        },
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            [
              {
                prim: 'Elt',
                args: [
                  { string: 'mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g' },
                  {
                    prim: 'Pair',
                    args: [
                      [
                        {
                          prim: 'Elt',
                          args: [{ string: 'mv185dsN5Nk3wWeGH5XiKpS5KzCmavMzLc9g' }, { int: '3' }],
                        },
                        {
                          prim: 'Elt',
                          args: [{ string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }, { int: '2' }],
                        },
                      ],
                      { int: '0' },
                    ],
                  },
                ],
              },
              {
                prim: 'Elt',
                args: [
                  { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' },
                  {
                    prim: 'Pair',
                    args: [[], { int: '0' }],
                  },
                ],
              },
            ],
            {
              string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
            },
          ],
        },
        {
          int: '100',
        },
      ],
    });
  });
});
