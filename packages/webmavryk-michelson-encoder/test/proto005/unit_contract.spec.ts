/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { params } from '../../data/proto005/unit_contract';
import { ParameterSchema } from '../../src/schema/parameter';
import { UnitValue } from '../../src/webmavryk-michelson-encoder';

describe('Contract with unit encoding', () => {
  it('Should encode parameter properly', () => {
    const schema = new ParameterSchema(params);
    expect(schema.Encode('deposit', UnitValue)).toEqual({ prim: 'Left', args: [{ prim: 'Unit' }] });
  });

  it('Should extract signature properly', () => {
    const schema = new ParameterSchema(params);
    expect(schema.ExtractSignatures()).toContainEqual(['deposit', 'unit']);
  });
});
