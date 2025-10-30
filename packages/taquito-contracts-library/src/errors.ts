/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { ParameterValidationError } from '@mavrykdynamics/taquito-core';
import { ScriptedContracts } from '@mavrykdynamics/taquito-rpc';
/**
 *  @category Error
 *  @description Error that indicates invalid script format being useed or passed
 */
export class InvalidScriptFormatError extends ParameterValidationError {
  constructor(
    public readonly message: string,
    public readonly script: ScriptedContracts,
    public readonly address: string
  ) {
    super();
    this.name = 'InvalidScriptFormatError';
  }
}
