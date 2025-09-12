import { Schema } from '@mavrykdynamics/taquito-michelson-encoder';
import { Context, ContractAbstraction, ContractProvider, Wallet } from '@mavrykdynamics/taquito';
import { Handler, Tzip16Uri } from '../metadata-provider';
import { bytesToString } from '@mavrykdynamics/taquito-utils';
import {
  InvalidContractMetadataTypeError,
  BigMapContractMetadataNotFoundError,
  InvalidUriError,
  ContractMetadataNotFoundError,
} from '../errors';

const typeOfValueToFind = {
  prim: 'big_map',
  args: [{ prim: 'string' }, { prim: 'bytes' }],
  annots: ['%metadata'],
};

export type BigMapId = { int: string };

export class MavrykStorageHandler implements Handler {
  private readonly MAVRYK_STORAGE_REGEX = /^(?:\/\/(KT1\w{33})(?:\.(.+))?\/)?([\w|%]+)$/;

  async getMetadata(
    contractAbstraction: ContractAbstraction<ContractProvider | Wallet>,
    { location }: Tzip16Uri,
    context: Context
  ) {
    const parsedMavrykStorageUri = this.parseMavrykStorageUri(location);
    if (!parsedMavrykStorageUri) {
      throw new InvalidUriError(`mavryk-storage:${location}`);
    }
    const script = await context.readProvider.getScript(
      parsedMavrykStorageUri.contractAddress || contractAbstraction.address,
      'head'
    );
    const bigMapId = Schema.fromRPCResponse({ script }).FindFirstInTopLevelPair<BigMapId>(
      script.storage,
      typeOfValueToFind
    );

    if (!bigMapId || !bigMapId.int) {
      throw new BigMapContractMetadataNotFoundError(bigMapId);
    }
    const bytes = await context.contract.getBigMapKeyByID<string>(
      bigMapId.int.toString(),
      parsedMavrykStorageUri.path,
      new Schema(typeOfValueToFind)
    );

    if (!bytes) {
      throw new ContractMetadataNotFoundError(
        `No '${parsedMavrykStorageUri.path}' key found in the big map %metadata of the contract ${
          parsedMavrykStorageUri.contractAddress || contractAbstraction.address
        }`
      );
    }

    if (!/^[0-9a-fA-F]*$/.test(bytes)) {
      throw new InvalidContractMetadataTypeError();
    }
    return bytesToString(bytes);
  }

  /**
   * @description Extract the smart contract address, the network and the path pointing to the metadata from the uri
   * @returns an object which contains the properties allowing to find where the metadata are located or it returns undefined if the uri is not valid
   * @param mavrykStorageURI URI (without the mavryk-storage prefix)
   */
  private parseMavrykStorageUri(mavrykStorageURI: string) {
    const extractor = this.MAVRYK_STORAGE_REGEX.exec(mavrykStorageURI);
    if (!extractor) return;
    return {
      contractAddress: extractor[1],
      network: extractor[2],
      path: decodeURIComponent(extractor[3]),
    };
  }
}
