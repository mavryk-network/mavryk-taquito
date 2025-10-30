/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { OpKind } from '@mavrykdynamics/taquito-rpc';

/**
 * @description FailingNoopOperation interface that contains information about a signed failing_noop operation
 */
export interface FailingNoopOperation {
  signedContent: {
    branch: string;
    contents: [
      {
        kind: OpKind.FAILING_NOOP;
        arbitrary: string;
      }
    ];
  };
  bytes: string;
  signature: string;
}
