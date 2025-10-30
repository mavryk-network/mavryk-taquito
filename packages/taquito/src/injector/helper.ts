/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { HttpResponseError } from '@mavrykdynamics/taquito-http-utils';

export function formatErrorMessage(error: HttpResponseError, stringToReplace: string) {
  const body = JSON.parse(error.body);
  if (body[0] && body[0].kind && body[0].msg) {
    const newBody = JSON.stringify({
      kind: body[0].kind,
      id: body[0].id,
      msg: body[0].msg.replace(stringToReplace, ''),
    });
    return new HttpResponseError(
      `Http error response: (${error.status}) ${newBody}`,
      error.status,
      error.statusText,
      newBody,
      error.url
    );
  } else {
    return error;
  }
}
