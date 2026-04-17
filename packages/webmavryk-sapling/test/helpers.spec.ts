/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { memoHexToUtf8 } from '../src/sapling-tx-viewer/helpers';

describe('Sapling helper functions', () => {
  it('Should transform memo to utf8 string', () => {
    const memoTaco = Buffer.from([116, 97, 99, 111]).toString('hex');
    expect(memoHexToUtf8(memoTaco)).toEqual('taco');

    const memoWebMavryk = Buffer.from([119, 101, 98, 109, 97, 118, 114, 121, 107, 0]).toString('hex');
    expect(memoHexToUtf8(memoWebMavryk)).toEqual('webmavryk');

    const memoTest = Buffer.from([116, 101, 115, 116, 0, 0, 0, 0]).toString('hex');
    expect(memoHexToUtf8(memoTest)).toEqual('test');

    const memoEmpty = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]).toString('hex');
    expect(memoHexToUtf8(memoEmpty)).toEqual('');

    const memoHi = Buffer.from([104, 105, 0, 0, 0, 0, 0, 0]).toString('hex');
    expect(memoHexToUtf8(memoHi)).toEqual('hi');
  });
});
