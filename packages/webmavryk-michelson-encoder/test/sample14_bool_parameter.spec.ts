/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { params } from '../data/sample14_bool_parameter';
import { ParameterSchema } from '../src/schema/parameter';

describe('Bool parameter encoding', () => {
  test('Bool parameter are encoded properly when truthy (true)', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode('setBool', true);
    expect(result).toEqual({
      prim: 'Left',
      args: [{ prim: 'True' }],
    });
  });

  test('Bool parameter are encoded properly when truthy (object)', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode('setBool', {});
    expect(result).toEqual({
      prim: 'Left',
      args: [{ prim: 'True' }],
    });
  });

  test('Bool parameter are encoded properly when falsy (false)', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode('setBool', false);
    expect(result).toEqual({
      prim: 'Left',
      args: [{ prim: 'False' }],
    });
  });

  test('Bool parameter are encoded properly when falsy (undefined)', () => {
    const schema = new ParameterSchema(params);
    const result = schema.Encode('setBool', undefined);
    expect(result).toEqual({
      prim: 'Left',
      args: [{ prim: 'False' }],
    });
  });
});
