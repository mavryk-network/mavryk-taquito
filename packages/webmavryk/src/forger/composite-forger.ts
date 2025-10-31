/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Forger, ForgeParams, ForgeResponse } from '@mavrykdynamics/webmavryk-local-forging';
import { UnspecifiedForgerError, ForgingMismatchError } from './errors';

export class CompositeForger implements Forger {
  constructor(private forgers: Forger[]) {
    if (forgers.length === 0) {
      throw new UnspecifiedForgerError();
    }
  }

  async forge({ branch, contents }: ForgeParams): Promise<ForgeResponse> {
    const results = await Promise.all(
      this.forgers.map((forger) => {
        return forger.forge({ branch, contents });
      })
    );

    if (results.length === 0) {
      throw new UnspecifiedForgerError();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let lastResult: string = results.pop()!; // Assumed to be more than one since we
    while (results.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentResult = results.pop()!;

      if (currentResult !== lastResult) {
        throw new ForgingMismatchError([lastResult, currentResult]);
      }
      lastResult = currentResult;
    }

    return lastResult;
  }
}
