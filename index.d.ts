/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

declare module 'bs58check' {
  export function decode(encodedStr: string): Buffer;
  export function encode(buf: Buffer): string;
  export function decodeUnsafe(string: string): Buffer | undefined;
}
