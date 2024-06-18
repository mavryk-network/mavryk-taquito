import { Context, Extension } from "@mavrykdynamics/taquito";
import { Handler, MetadataProvider, MetadataProviderInterface } from "./metadata-provider";
import { HttpHandler } from "./handlers/http-handler";
import { MavrykStorageHandler } from "./handlers/mavryk-storage-handler";
import { IpfsHttpHandler } from "./handlers/ipfs-handler";

export const DEFAULT_HANDLERS = new Map<string, Handler>([
    ['http', new HttpHandler()],
    ['https', new HttpHandler()],
    ['mavryk-storage', new MavrykStorageHandler()],
    ['ipfs', new IpfsHttpHandler()]
])
export class Tzip16Module implements Extension {
    private _metadataProvider: MetadataProviderInterface;

    constructor(metadataProvider?: MetadataProviderInterface) {
        this._metadataProvider = metadataProvider ? metadataProvider : new MetadataProvider(DEFAULT_HANDLERS);
    }

    configureContext(context: Context) {
        Object.assign(context, { metadataProvider: this._metadataProvider });
    }
}