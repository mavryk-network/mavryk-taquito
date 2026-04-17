/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Schema, Semantic } from '@mavrykdynamics/webmavryk-michelson-encoder';
import { BigMapAbstraction } from './big-map';
import { ContractProvider } from './interface';
import BigNumber from 'bignumber.js';
import { MichelsonV1Expression } from '@mavrykdynamics/webmavryk-rpc';
import { SaplingStateAbstraction } from './sapling-state-abstraction';

/**
 * @description Override the default michelson encoder semantic to provide richer abstraction over storage properties
 * @param provider ContractProvider (contract API)
 */
// Override the default michelson encoder semantic to provide richer abstraction over storage properties
export const smartContractAbstractionSemantic: (p: ContractProvider) => Semantic = (
  provider: ContractProvider
) => ({
  // Provide a specific abstraction for BigMaps
  big_map: (val: MichelsonV1Expression, code: MichelsonV1Expression) => {
    if (!val || !('int' in val) || val.int === undefined) {
      // Return an empty object in case of missing big map ID
      return {};
    } else {
      const schema = new Schema(code);
      return new BigMapAbstraction(new BigNumber(val.int), schema, provider);
    }
  },
  sapling_state: (val: MichelsonV1Expression) => {
    if (!val || !('int' in val) || val.int === undefined) {
      // Return an empty object in case of missing sapling state ID
      return {};
    } else {
      return new SaplingStateAbstraction(new BigNumber(val.int), provider);
    }
  },
  /*
  // TODO: embed useful other abstractions
  'contract':  () => {},
  'address':  () => {}
  */
});
