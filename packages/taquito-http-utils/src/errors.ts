/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { NetworkError } from '@mavrykdynamics/taquito-core';
import { STATUS_CODE } from './status_code';

/**
 *  @category Error
 *  @description Error that indicates a general failure in making the HTTP request
 */
export class HttpRequestFailed extends NetworkError {
  constructor(
    public readonly method: string,
    public readonly url: string,
    public readonly cause: Error
  ) {
    super();
    this.name = 'HttpRequestFailed';
    this.message = `${method} ${url} ${String(cause)}`;
  }
}

/**
 *  @category Error
 *  @description Error thrown when the endpoint returns an HTTP error to the client
 */
export class HttpResponseError extends NetworkError {
  constructor(
    public readonly message: string,
    public readonly status: STATUS_CODE,
    public readonly statusText: string,
    public readonly body: string,
    public readonly url: string
  ) {
    super();
    this.name = 'HttpResponseError';
  }
}

/**
 *  @category Error
 *  @description Error
 */
export class HttpTimeoutError extends NetworkError {
  constructor(
    public readonly timeout: number,
    public readonly url: string
  ) {
    super();
    this.name = 'HttpTimeoutError';
    this.message = `HTTP request timeout of ${timeout}ms exceeded`;
  }
}
