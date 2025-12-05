/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { PermissionScope } from '@mavrykdynamics/mavlet-dapp';
import { PermissionDeniedError } from '@mavrykdynamics/webmavryk-core';

/**
 *  @category Error
 *  @description Error that indicates the Mavlet wallet not being initialized
 */
export class MavletWalletNotInitialized extends PermissionDeniedError {
  constructor() {
    super();
    this.name = 'MavletWalletNotInitialized';
    this.message =
      'MavletWallet needs to be initialized by calling `await MavletWallet.requestPermissions({network: {type: "chosen_network"}})` first.';
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
