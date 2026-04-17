/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

export const contractMapPairKey = [
    { prim: 'parameter', args: [{ prim: 'unit' }] },
    {
      prim: 'storage',
      args: [
        {
          prim: 'pair',
          args: [
            {
              prim: 'pair',
              args: [
                { prim: 'address', annots: ['%theAddress'] },
                {
                  prim: 'map',
                  args: [
                    { prim: 'pair', args: [{ prim: 'nat' }, { prim: 'address' }] },
                    {
                      prim: 'pair',
                      args: [
                        { prim: 'mumav', annots: ['%amount'] },
                        { prim: 'int', annots: ['%quantity'] },
                      ],
                    },
                  ],
                  annots: ['%theMap'],
                },
              ],
            },
            { prim: 'int', annots: ['%theNumber'] },
          ],
        },
      ],
    },
    {
      prim: 'code',
      args: [
        [
          { prim: 'DUP' },
          { prim: 'CDR' },
          { prim: 'NIL', args: [{ prim: 'operation' }] },
          { prim: 'PAIR' },
          { prim: 'DIP', args: [[{ prim: 'DROP' }]] },
        ],
      ],
    },
  ];