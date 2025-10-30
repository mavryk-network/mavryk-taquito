/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

// KT1R3uoZ6W1ZxEwzqtv75Ro7DhVY6UAcxuK2 on mainnet

import { params as params10 } from '../data/sample10';
import { ParameterSchema } from '../src/schema/parameter';

describe('Schema test', () => {
  it('Should parse storage properly', () => {
    const schema = new ParameterSchema(params10);
    expect({
      args: [
        {
          args: [
            {
              args: [
                {
                  args: [
                    [
                      {
                        args: [
                          {
                            int: '200',
                          },
                          {
                            string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
                          },
                        ],
                        prim: 'Pair',
                      },
                      {
                        args: [
                          {
                            int: '201',
                          },
                          {
                            string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
                          },
                        ],
                        prim: 'Pair',
                      },
                    ],
                    {
                      string: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
                    },
                  ],
                  prim: 'Pair',
                },
                {
                  args: [
                    {
                      string: 'edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t',
                    },
                    {
                      string:
                        'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg',
                    },
                  ],
                  prim: 'Pair',
                },
              ],
              prim: 'Pair',
            },
          ],
          prim: 'Right',
        },
      ],
      prim: 'Some',
    }).toEqual(
      schema.Encode(
        'transfer',
        [
          { amount: 200, beneficiary: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX' },
          { amount: 201, beneficiary: 'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX' },
        ],
        'mv1U1aAsZk2cXBBdAtfGnSb7R5yvXr1CyEkX',
        'edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t',
        'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg'
      )
    );
    expect(schema.isMultipleEntryPoint).toBeTruthy();

    expect(schema.ExtractSignatures()).toContainEqual(["transfer", 
        {list: {"amount": "mumav", "beneficiary": "contract"}}, 
        "key_hash", 
        "key", 
        "signature"]);
  });
});
