/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { WebMavrykError, MavrykToolkitConfigError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates that a global constant does not exist
 */
export class GlobalConstantNotFound extends WebMavrykError {
  constructor(public readonly hash: string) {
    super();
    this.name = 'GlobalConstantNotFound';
    this.message = `Please load the value associated with the constant ${hash} using the loadGlobalConstant method of the DefaultGlobalConstantsProvider.`;
  }
}

/**
 *  @category Error
 *  @description Error that indicates the global constant provider not being configured under MavrykToolkit
 */
export class UnconfiguredGlobalConstantsProviderError extends MavrykToolkitConfigError {
  constructor() {
    super();
    this.name = 'UnconfiguredGlobalConstantsProviderError';
    this.message =
      'No global constants provider has been configured. Please configure one by calling setGlobalConstantsProvider({globalConstantsProvider}) on your MavrykToolkit instance.';
  }
}
