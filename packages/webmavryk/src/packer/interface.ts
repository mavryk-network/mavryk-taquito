/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { PackDataParams, PackDataResponse } from '@mavrykdynamics/webmavryk-rpc';

export interface Packer {
    packData(data: PackDataParams): Promise<PackDataResponse>
}