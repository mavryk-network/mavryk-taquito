/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Packer } from './interface';
import { Context } from '../context';
import { PackDataParams, PackDataResponse } from '@mavrykdynamics/webmavryk-rpc';

export class RpcPacker implements Packer {
  constructor(private context: Context) {}
  
  async packData(data: PackDataParams): Promise<PackDataResponse> {
    return this.context.rpc.packData(data);
  }
}
