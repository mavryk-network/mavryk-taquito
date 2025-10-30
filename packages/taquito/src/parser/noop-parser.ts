/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { OriginateParams } from "../operations/types";
import { ParserProvider } from "./interface";

export class NoopParser implements ParserProvider {
    async prepareCodeOrigination(params: OriginateParams): Promise<OriginateParams> {
        return params;
    }
}