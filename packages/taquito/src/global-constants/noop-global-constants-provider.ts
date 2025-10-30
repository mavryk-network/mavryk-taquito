/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Expr } from '@mavrykdynamics/taquito-michel-codec';
import { UnconfiguredGlobalConstantsProviderError } from './errors';
import { GlobalConstantHash, GlobalConstantsProvider } from './interface-global-constants-provider';

export class NoopGlobalConstantsProvider implements GlobalConstantsProvider {
  async getGlobalConstantByHash(_hash: GlobalConstantHash): Promise<Expr> {
    throw new UnconfiguredGlobalConstantsProviderError();
  }
}
