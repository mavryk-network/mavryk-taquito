/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { CONFIGS } from "../../config";
import { tzip16, Tzip16Module, stringToBytes } from '@mavrykdynamics/webmavryk-tzip16';
import { tacoContractTzip16 } from "../../data/modified-taco-contract"
import { MichelsonMap } from "@mavrykdynamics/webmavryk";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  Mavryk.addExtension(new Tzip16Module());
  let contractAddress: string;
  let contractMetadataInAnotherContract: string;

  describe(`Test contract origination having metadata stored on chain through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup()
    })
    it('Verify contract.originate for a contract having metadata inside its own storage', async () => {

      const metadataJSON = {
        "name": "test",
        "description": "A metadata test",
        "version": "0.1",
        "license": "MIT",
        "authors": [
          "Webmavryk <https://webmavryk.mavryk.org/>"
        ],
        "homepage": "https://webmavryk.mavryk.org/"
      };

      const metadataBigMap = new MichelsonMap();
      metadataBigMap.set("", stringToBytes('mavryk-storage:here'));
      metadataBigMap.set("here", stringToBytes(JSON.stringify(metadataJSON)))

      // Ligo Taco shop contract modified to include metadata in storage
      // https://ide.ligolang.org/p/-uS469slzUlSm1zwNqHl1A

      const tacoShopStorageMap = new MichelsonMap();

      const op = await Mavryk.contract.originate({
        code: tacoContractTzip16,
        storage: {
          metadata: metadataBigMap,
          taco_shop_storage: tacoShopStorageMap
        },
      });
      await op.confirmation();
      contractAddress = (await op.contract()).address;
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });

    it('Verify the metadata for a contract having metadata inside its own storage can be fetched', async () => {

      const contract = await Mavryk.wallet.at(contractAddress, tzip16);
      const metadata = await contract.tzip16().getMetadata();

      expect(metadata.uri).toEqual('mavryk-storage:here');
      expect(metadata.integrityCheckResult).toBeUndefined();
      expect(metadata.sha256Hash).toBeUndefined();
      expect(metadata.metadata).toEqual({
        "name": "test",
        "description": "A metadata test",
        "version": "0.1",
        "license": "MIT",
        "authors": [
          "Webmavryk <https://webmavryk.mavryk.org/>"
        ],
        "homepage": "https://webmavryk.mavryk.org/"
      });

      expect(await (await contract.tzip16()).metadataName()).toEqual('test')
      expect(await (await contract.tzip16()).metadataDescription()).toEqual('A metadata test')
      expect(await (await contract.tzip16()).metadataVersion()).toEqual('0.1')
      expect(await (await contract.tzip16()).metadataLicense()).toEqual('MIT')
      expect(await (await contract.tzip16()).metadataAuthors()).toEqual(["Webmavryk <https://webmavryk.mavryk.org/>"])
      expect(await (await contract.tzip16()).metadataHomepage()).toEqual('https://webmavryk.mavryk.org/')
      expect(await (await contract.tzip16()).metadataSource()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataInterfaces()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataErrors()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataViews()).toEqual({});

    });

    it('Verify contract.originate for a contract having metadata inside another contract same network', async () => {

      const metadataBigMap = new MichelsonMap();
      metadataBigMap.set("", stringToBytes(`mavryk-storage://${contractAddress}/here`));

      const tacoShopStorageMap = new MichelsonMap();

      const op = await Mavryk.contract.originate({
        code: tacoContractTzip16,
        storage: {
          metadata: metadataBigMap,
          taco_shop_storage: tacoShopStorageMap
        },
      });
      await op.confirmation();
      contractMetadataInAnotherContract = (await op.contract()).address;
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
    });

    it('Verify that metadata for contract having metadata inside another contract on the same network can be fetched', async () => {

      const contract = await Mavryk.wallet.at(contractMetadataInAnotherContract, tzip16);
      const metadata = await contract.tzip16().getMetadata();

      expect(metadata.uri).toEqual(`mavryk-storage://${contractAddress}/here`);
      expect(metadata.integrityCheckResult).toBeUndefined();
      expect(metadata.sha256Hash).toBeUndefined();
      expect(metadata.metadata).toEqual({
        "name": "test",
        "description": "A metadata test",
        "version": "0.1",
        "license": "MIT",
        "authors": [
          "Webmavryk <https://webmavryk.mavryk.org/>"
        ],
        "homepage": "https://webmavryk.mavryk.org/"
      });

      expect(await (await contract.tzip16()).metadataName()).toEqual('test')
      expect(await (await contract.tzip16()).metadataDescription()).toEqual('A metadata test')
      expect(await (await contract.tzip16()).metadataVersion()).toEqual('0.1')
      expect(await (await contract.tzip16()).metadataLicense()).toEqual('MIT')
      expect(await (await contract.tzip16()).metadataAuthors()).toEqual(["Webmavryk <https://webmavryk.mavryk.org/>"])
      expect(await (await contract.tzip16()).metadataHomepage()).toEqual('https://webmavryk.mavryk.org/')
      expect(await (await contract.tzip16()).metadataSource()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataInterfaces()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataErrors()).toBeUndefined()
      expect(await (await contract.tzip16()).metadataViews()).toEqual({});

    });

  });
})
