/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Expr } from "@mavrykdynamics/webmavryk-michel-codec";

export type GlobalConstantHash = string; 

export interface GlobalConstantsProvider {

    /**
     *
     * @description Retrieve the Michelson value of a global constant based on its hash
     *
     * @param hash a string representing the global constant hash
     */
    getGlobalConstantByHash(hash: GlobalConstantHash): Promise<Expr>;
}