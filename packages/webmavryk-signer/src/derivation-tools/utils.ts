/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { InvalidHexStringError } from '@mavrykdynamics/webmavryk-core';

export function parseHex(s: string): Uint8Array {
  const res: number[] = [];
  for (let i = 0; i < s.length; i += 2) {
    const ss = s.slice(i, i + 2);
    const x = parseInt(ss, 16);
    if (Number.isNaN(x)) {
      throw new InvalidHexStringError(ss);
    }
    res.push(x);
  }
  return new Uint8Array(res);
}
