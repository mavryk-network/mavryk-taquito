/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { MumavToken, MumavValidationError } from '../../src/tokens/comparable/mumav';

describe('Mumav token', () => {
  let token: MumavToken;
  beforeEach(() => {
    token = new MumavToken({ prim: 'mumav', args: [], annots: [] }, 0, null as any);
  });

  describe('EncodeObject', () => {
    it('Should encode number to string', () => {
      expect(token.EncodeObject(0)).toEqual({ int: '0' });
      expect(token.EncodeObject(1000)).toEqual({ int: '1000' });
    });

    it('Should throw a validation error when value is not a number', () => {
      expect(() => token.EncodeObject('test')).toThrowError(MumavValidationError);
      expect(() => token.EncodeObject([])).toThrowError(MumavValidationError);
      expect(() => token.EncodeObject({})).toThrowError(MumavValidationError);
    });
  });

  describe('Encode', () => {
    it('Should encode number to string', () => {
      expect(token.Encode([0])).toEqual({ int: '0' });
      expect(token.Encode([1000])).toEqual({ int: '1000' });
    });

    it('Should throw a validation error when value is not a number', () => {
      expect(() => token.Encode(['test'])).toThrowError(MumavValidationError);
      expect(() => token.Encode(['test'])).toThrowError('Value is not a number: test');
      expect(() => token.Encode([])).toThrowError(MumavValidationError);
      expect(() => token.Encode([{}])).toThrowError(MumavValidationError);
    });
  });

  describe('ToBigMapKey', () => {
  it('accepts a number as parameter', () => {
      expect(token.ToBigMapKey(10000000)).toEqual({
        key: { int: '10000000' },
        type: { prim: MumavToken.prim },
      });
    });
  it('accepts a string as parameter', () => {
      expect(token.ToBigMapKey('10000000')).toEqual({
        key: { int: '10000000' },
        type: { prim: MumavToken.prim },
      });    
    });
  });

  describe('generateSchema', () => {
    it('Should generate the schema properly', () => {
      expect(token.generateSchema()).toEqual({
        __michelsonType: 'mumav',
        schema: 'mumav'
      });
    });
  });
});
