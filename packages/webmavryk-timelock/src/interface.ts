/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BigInteger } from 'big-integer';

export interface RNG {
  getRandomValues: (array: Uint8Array) => Uint8Array;
}

export interface TimelockInit {
  lockedValue: BigInteger;
  unlockedValue: BigInteger;
  vdfProof: BigInteger;
  modulus?: BigInteger;
}

export interface CipherText {
  nonce: Uint8Array;
  payload: Uint8Array;
}
