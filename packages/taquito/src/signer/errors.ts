/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { MavrykToolkitConfigError } from '@mavrykdynamics/taquito-core';

/**
 *  @category Error
 *  @description Error that indicates no signer has been configured in the MavrykToolkit instance
 */
export class UnconfiguredSignerError extends MavrykToolkitConfigError {
  constructor() {
    super();
    this.name = 'UnconfiguredSignerError';
    this.message =
      'No signer has been configured. Please configure one by calling setProvider({signer}) on your MavrykToolkit instance.';
  }
}
