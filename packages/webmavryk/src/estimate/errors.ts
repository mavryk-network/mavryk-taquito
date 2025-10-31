/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { WebMavrykError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates unable to get public key to estimate reveal operation in Wallet API
 */
export class RevealEstimateError extends WebMavrykError {
  constructor() {
    super();
    this.name = 'RevealEstimateError';
    this.message = 'Public key is unknown, unable to estimate the reveal operation in Wallet API.';
  }
}
