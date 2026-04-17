/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import BigNumber from 'bignumber.js';
import { Schema } from '../src/schema/storage';

describe('Ticket token type structure', () => {
  it('Should extract correct schema for token type ticket', () => {
    const schema = new Schema({
        prim: 'big_map',
        args: [{ prim: 'nat' }, { prim: 'ticket', args: [{ prim: 'nat' }] }],
        annots: ['%tickets']
    });

    const value = schema.ExecuteOnBigMapValue({
        prim: 'Pair',
        args: [
            { string: 'KT1EAMUQC1yJ2sRPNPpLHVMGCzroYGe1C1ea' },
            {
                prim: 'Pair',
                args: [{ int: '0' }, { int: '1' }],
            },
        ],
    });
    expect(value).toEqual({
        ticketer: 'KT1EAMUQC1yJ2sRPNPpLHVMGCzroYGe1C1ea',
        value: new BigNumber('0'),
        amount: new BigNumber('1')
    });

  });
});