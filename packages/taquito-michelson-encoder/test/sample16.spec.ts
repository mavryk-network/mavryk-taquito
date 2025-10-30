/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { getAllowance, getBalance, getTotalSupply } from '../data/sample16';
import { ParameterSchema } from '../src/schema/parameter';
import { UnitValue } from '../src/taquito-michelson-encoder';

describe('Schema test when calling contract with complex object as param and null value', () => {
  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(getTotalSupply.args[0]);
    const result = schema.Encode([UnitValue]);
    expect(schema).toBeTruthy();
    expect(result).toEqual({ prim: 'Unit' });
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(getBalance.args[0]);
    const result = schema.Encode('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3');
    expect(schema).toBeTruthy();
    expect(result).toEqual({ string: 'mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3' });
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(getAllowance.args[0]);
    const result = schema.Encode(
      'mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3',
      'mv1W9WUWpdHfgSYwV9hksndfxJYGAQqhLZra'
    );
    expect(schema).toBeTruthy();
    expect(result).toEqual({
      prim: 'Pair',
      args: [
        { string: 'mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3' },
        { string: 'mv1W9WUWpdHfgSYwV9hksndfxJYGAQqhLZra' },
      ],
    });
  });
});
