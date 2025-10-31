/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { PermissionScope } from '@mavrykdynamics/beacon-dapp';
import { PermissionDeniedError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates the Beacon wallet not being initialized
 */
export class BeaconWalletNotInitialized extends PermissionDeniedError {
  constructor() {
    super();
    this.name = 'BeaconWalletNotInitialized';
    this.message =
      'BeaconWallet needs to be initialized by calling `await BeaconWallet.requestPermissions({network: {type: "chosen_network"}})` first.';
  }
}

/**
 *  @category Error
 *  @description Error that indicates missing required persmission scopes
 */
export class MissingRequiredScopes extends PermissionDeniedError {
  constructor(public readonly requiredScopes: PermissionScope[]) {
    super();
    this.name = 'MissingRequiredScopes';
    this.message = `Required permissions scopes: ${requiredScopes.join(',')} were not granted.`;
  }
}
