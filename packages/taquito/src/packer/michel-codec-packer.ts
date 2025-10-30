/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Packer } from './interface';
import { packDataBytes, MichelsonData, MichelsonType } from '@mavrykdynamics/taquito-michel-codec'
import { PackDataResponse, PackDataParams } from '@mavrykdynamics/taquito-rpc';

export class MichelCodecPacker implements Packer {

  async packData(data: PackDataParams): Promise<PackDataResponse> {
    const { bytes } = packDataBytes(data.data as MichelsonData, data.type as MichelsonType);
    return { packed: bytes }
  }
}
