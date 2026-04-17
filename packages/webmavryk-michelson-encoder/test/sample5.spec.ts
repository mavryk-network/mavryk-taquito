/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import BigNumber from 'bignumber.js';
import { rpcContractResponse as rpcContractResponse5, storage as storage5 } from '../data/sample5';
import { Schema } from '../src/schema/storage';
import { MichelsonMap } from '../src/michelson-map';
import { expectMichelsonMap } from './utils';

describe('Schema test', () => {
  it('Should parse storage properly', () => {
    const schema = new Schema(storage5);
    const storage = schema.Execute(rpcContractResponse5.script.storage);
    expect(storage).toEqual({
      '0': expectMichelsonMap(),
      totalSupply: new BigNumber('1000'),
      approver: { Some: 'mv1U68kfyTneQYZUKgk5gjN2rfvmSvcRBBWA' },
      centralBank: 'mv1U68kfyTneQYZUKgk5gjN2rfvmSvcRBBWA',
    });
  });

  it('Should encode storage properly', () => {
    const schema = new Schema(storage5);
    const result = schema.Encode({
      '0': new MichelsonMap(),
      totalSupply: new BigNumber('1000'),
      approver: 'mv1U68kfyTneQYZUKgk5gjN2rfvmSvcRBBWA',
      centralBank: 'mv1U68kfyTneQYZUKgk5gjN2rfvmSvcRBBWA',
    });
    expect(result).toEqual({
      args: [[], rpcContractResponse5.script.storage.args[1]],
      prim: 'Pair',
    });
  });
});
