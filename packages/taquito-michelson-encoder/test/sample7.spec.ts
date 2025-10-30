/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { rpcContractResponse as rpcContractResponse7, storage as storage7 } from '../data/sample7';
import { Schema } from '../src/schema/storage';

describe('Schema test', () => {
  it('Should parse storage properly', () => {
    const schema = new Schema(storage7);
    const storage = schema.Execute(rpcContractResponse7.script.storage);
    expect(storage).toEqual({
      game: null,
      oracle_id: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
    });
  });

  it('Should encode storage properly', () => {
    const schema = new Schema(storage7);
    const storage = schema.Encode({
      game: null,
      oracle_id: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
    });
    expect(storage).toEqual(rpcContractResponse7.script.storage);
  });

  it('Should encode storage properly', () => {
    const schema = new Schema(storage7);
    const storage = schema.Encode({
      game: {
        number: 1,
        bet: 1,
        player: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
      },
      oracle_id: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
    });
    expect(storage).toEqual({
      args: [
        {
          args: [
            {
              args: [
                {
                  int: '1',
                },
                {
                  args: [
                    {
                      int: '1',
                    },
                    {
                      string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
                    },
                  ],
                  prim: 'Pair',
                },
              ],
              prim: 'Pair',
            },
          ],
          prim: 'Some',
        },
        {
          string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
        },
      ],
      prim: 'Pair',
    });
  });
});
