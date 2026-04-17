/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { params as params8, storage as storage8 } from '../data/sample8';
import { ParameterSchema } from '../src/schema/parameter';
import { Schema } from '../src/schema/storage';

describe('Schema test', () => {
  it('Should parse storage properly', () => {
    const schema = new ParameterSchema(params8);
    const storage = schema.ExtractSchema();
    expect(storage).toEqual('string');
    expect(schema.generateSchema()).toEqual({
      __michelsonType: "string",
      schema: 'string'
    });
    expect({ string: 'test' }).toEqual(schema.Encode('test'));
    expect(schema.isMultipleEntryPoint).toBeFalsy();

    expect(schema.ExtractSignatures()).toContainEqual(['string']);
  });
  it('Should encode storage properly', () => {
    const schema = new Schema(storage8);
    expect(schema.Encode('test')).toEqual({ string: 'test' });
  });
});
