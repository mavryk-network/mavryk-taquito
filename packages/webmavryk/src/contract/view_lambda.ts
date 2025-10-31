/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

const code = [
  {
    prim: 'parameter',
    args: [
      {
        prim: 'lambda',
        args: [
          { prim: 'unit' },
          {
            prim: 'pair',
            args: [{ prim: 'list', args: [{ prim: 'operation' }] }, { prim: 'unit' }],
          },
        ],
      },
    ],
  },
  { prim: 'storage', args: [{ prim: 'unit' }] },
  { prim: 'code', args: [[{ prim: 'CAR' }, { prim: 'UNIT' }, { prim: 'EXEC' }]] },
];

const storage = 'Unit';

export const VIEW_LAMBDA = {
  code,
  storage
}
