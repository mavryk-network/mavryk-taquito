/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { HttpBackend } from "@mavrykdynamics/taquito-http-utils";
import { ContractAbstraction, ContractProvider, Wallet, Context } from "@mavrykdynamics/taquito";
import { Handler, Tzip16Uri } from "../metadata-provider";

export class IpfsHttpHandler implements Handler {
    private _ipfsGateway: string;
    public httpBackend = new HttpBackend();

    constructor(ipfsGatheway?:string){
        this._ipfsGateway = ipfsGatheway? ipfsGatheway: 'ipfs.io';
    }

    async getMetadata(_contractAbstraction: ContractAbstraction<ContractProvider | Wallet>, { location }: Tzip16Uri, _context: Context): Promise<string> {
        return this.httpBackend.createRequest<string>({
            url: `https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`,
            method: 'GET',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            },
            json: false
        })
    }
}
