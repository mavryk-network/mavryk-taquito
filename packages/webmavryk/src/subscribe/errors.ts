/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { ParameterValidationError } from '@mavrykdynamics/webmavryk-core';
import { FilterExpression } from '../webmavryk';

/**
 *  @category Error
 *  @description Error that indicates an unsupported event being passed or used
 */
export class UnsupportedEventError extends ParameterValidationError {
  constructor(public readonly type: string) {
    super();
    this.name = 'UnsupportedEventError';
    this.message = `Unsupported event type "${type}" expecting one of the "data", "error", or "close".`;
  }
}

/**
 *  @category Error
 *  @description Error that indicates an invalid filter expression being passed or used
 */
export class InvalidFilterExpressionError extends ParameterValidationError {
  constructor(public readonly invalidExpression: FilterExpression) {
    super();
    this.name = 'InvalidFilterExpressionError';
    this.message = `Invalid filter expression expecting the object to contain either and/or property`;
  }
}
