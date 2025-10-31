/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { MavrykToolkitConfigError, NetworkError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates undefined confirmation has not been specified or configured
 */
export class ConfirmationUndefinedError extends MavrykToolkitConfigError {
  constructor() {
    super();
    this.name = 'ConfirmationUndefinedError';
    this.message = 'Default confirmation count can not be undefined';
  }
}

/**
 *  @category Error
 *  @description Error that indicates a generic failure when trying to fetch an observable
 */
export class ObservableError extends NetworkError {
  constructor(public readonly message: string) {
    super();
    this.name = 'ObservableError';
  }
}
