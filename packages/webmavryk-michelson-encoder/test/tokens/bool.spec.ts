/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BoolToken } from '../../src/tokens/comparable/bool';

describe('Bool token', () => {
  let token: BoolToken;
  beforeEach(() => {
    token = new BoolToken({ prim: 'bool', args: [], annots: [] }, 0, null as any);
  });

  describe('EncodeObject', () => {
    it('Should encode the boolean true properly', () => {
      expect(token.EncodeObject(true)).toEqual({
        prim: 'True',
      });
    });

    it('Should encode the boolean false properly', () => {
      expect(token.EncodeObject(false)).toEqual({
        prim: 'False',
      });
    });
  });

  describe('Encode', () => {
    it('Should encode the boolean true properly', () => {
      expect(token.Encode([true])).toEqual({
        prim: 'True',
      });
    });

    it('Should encode the boolean false properly', () => {
      expect(token.Encode([false])).toEqual({
        prim: 'False',
      });
    });
  });
});
