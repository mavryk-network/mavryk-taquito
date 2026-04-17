/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { AddressToken, AddressValidationError } from '../../src/tokens/comparable/address';

describe('Address token', () => {
  let token: AddressToken;
  beforeEach(() => {
    token = new AddressToken({ prim: 'address', args: [], annots: [] }, 0, null as any);
  });

  describe('EncodeObject', () => {
    it('Should encode address to string', () => {
      expect(token.EncodeObject('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual({
        string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
      });
    });

    it('Should throw a validation error when address is not valid', () => {
      expect(() => token.EncodeObject('test')).toThrowError(AddressValidationError);
      expect(() => token.EncodeObject(0)).toThrowError(AddressValidationError);
      expect(() => token.EncodeObject([])).toThrowError(AddressValidationError);
    });
  });

  describe('Encode', () => {
    it('Should encode address to string', () => {
      expect(token.Encode(['mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW'])).toEqual({
        string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW',
      });
    });

    it('Should throw a validation error when address is not valid', () => {
      expect(() => token.Encode(['test'])).toThrowError(AddressValidationError);

      try {
        token.Encode(['test']);
      } catch (ex) {
        expect(ex.name).toEqual('AddressValidationError');
      }
    });
  });

  describe('generateSchema', () => {
    it('Should generate the schema properly', () => {
      expect(token.generateSchema()).toEqual({
        __michelsonType: 'address',
        schema: 'address',
      });
    });
  });
});
