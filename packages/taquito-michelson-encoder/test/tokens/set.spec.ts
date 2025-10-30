/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { SetToken } from '../../src/tokens/set';
import { createToken } from '../../src/tokens/createToken';

describe('Set token', () => {
  let token: SetToken;
  beforeEach(() => {
    token = new SetToken({ prim: 'set', args: [{ prim: 'int' }], annots: [] }, 0, createToken);
  });

  describe('EncodeObject', () => {
    it('Should encode set properly', () => {
      expect(token.EncodeObject([0, 1, 2, 30])).toEqual([
        { int: '0' },
        { int: '1' },
        { int: '2' },
        { int: '30' },
      ]);
    });
  });

  describe('Encode', () => {
    it('Should encode set properly', () => {
      expect(token.Encode([[0, 1, 2, 30]])).toEqual([
        { int: '0' },
        { int: '1' },
        { int: '2' },
        { int: '30' },
      ]);
    });
  });
});
