/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { SaplingState } from '../../src/sapling-state/sapling-state';
import { sapling_state_diff, witnessString, stateTree } from '../data/sapling_test_data';
import { BigNumber } from 'bignumber.js';

let state: SaplingState;

describe('Sapling State Tree tests', () => {
  beforeEach(async () => {
    state = new SaplingState(32);
  });

  it('Should be able to construct a new Sapling State', () => {
    const result = new SaplingState(32);

    expect(result).toBeInstanceOf(SaplingState);
    expect(result.height).toEqual(32);
  });

  it('Should be able to instantiate SaplingState class object', async () => {
    const result = await state.getStateTree(sapling_state_diff);

    expect(result).toBeDefined();
    expect(JSON.stringify(result)).toEqual(stateTree);
  });

  it('Should be able to get witness from Sapling state diff', async () => {
    const result = await state.getWitness(
      await state.getStateTree(sapling_state_diff),
      new BigNumber(0)
    );

    expect(result).toEqual(witnessString);
  });
});
