/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { MichelsonMap } from '../src/michelson-map';

export const expectMichelsonMap = (literal = {}) =>
  expect.objectContaining(MichelsonMap.fromLiteral(literal));
