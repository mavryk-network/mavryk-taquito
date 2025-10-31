/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Signer } from './interface';
import { UnconfiguredSignerError } from './errors';
/**
 * @description Default signer implementation which does nothing and produce invalid signature
 * @throw {@link UnconfiguredSignerError}
 */
export class NoopSigner implements Signer {
  async publicKey(): Promise<string> {
    throw new UnconfiguredSignerError();
  }
  async publicKeyHash(): Promise<string> {
    throw new UnconfiguredSignerError();
  }
  async secretKey(): Promise<string> {
    throw new UnconfiguredSignerError();
  }
  async sign(_bytes: string, _watermark?: Uint8Array): Promise<any> {
    throw new UnconfiguredSignerError();
  }
}
