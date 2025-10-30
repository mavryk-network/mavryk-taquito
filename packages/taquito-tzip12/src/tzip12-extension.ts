/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Context, Extension } from "@mavrykdynamics/taquito";
import { DEFAULT_HANDLERS, MetadataProviderInterface, MetadataProvider } from '@mavrykdynamics/taquito-tzip16'

// The same default metadataProvider is used for tzip16 and tzip12
export class Tzip12Module implements Extension {
    private _metadataProvider: MetadataProviderInterface;

    constructor(metadataProvider?: MetadataProviderInterface) {
        this._metadataProvider = metadataProvider ? metadataProvider : new MetadataProvider(DEFAULT_HANDLERS);
    }

    configureContext(context: Context) {
        Object.assign(context, { metadataProvider: this._metadataProvider });
    }
}