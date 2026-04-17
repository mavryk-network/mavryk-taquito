/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { WebMavrykError, MavrykToolkitConfigError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates CompositeForger.forge() results doesn't match each other
 */
export class ForgingMismatchError extends WebMavrykError {
  constructor(public readonly results: string[]) {
    super();
    this.name = 'ForgingMismatchError';
    this.message = `Forging mismatch error`;
  }
}

/**
 *  @category Error
 *  @description Error that indicates no forger has been configured for CompositeForger
 */
export class UnspecifiedForgerError extends MavrykToolkitConfigError {
  constructor() {
    super();
    this.name = 'UnspecifiedForgerError';
    this.message =
      'No forger has been configured. Please configure new CompositeForger([rpcForger, localForger]) with your MavrykToolkit instance.';
  }
}
