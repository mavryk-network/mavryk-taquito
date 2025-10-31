/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Prim, Expr } from './micheline';
import { GlobalConstantHashAndValue } from './micheline-parser';

export function expandGlobalConstants(ex: Prim, hashAndValue: GlobalConstantHashAndValue): Expr {
  if (
    ex.args !== undefined &&
    ex.args.length === 1 &&
    'string' in ex.args[0] &&
    ex.args[0].string in hashAndValue
  ) {
    return hashAndValue[ex.args[0].string];
  }

  return ex;
}
