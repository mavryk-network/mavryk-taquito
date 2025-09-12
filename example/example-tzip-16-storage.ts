import { MichelsonMap, MavrykToolkit } from '@mavrykdynamics/taquito';
import { tacoContractTzip16 } from "../integration-tests/data/modified-taco-contract"
import { stringToBytes } from '@mavrykdynamics/taquito-utils';
import { InMemorySigner } from '@mavrykdynamics/taquito-signer';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
  const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
  const mavryk = new MavrykToolkit(provider);
  mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying Tzip16Storage contract...');

    const metadataJSON = {
      "name": "test",
      "description": "A metadata test",
      "version": "0.1",
      "license": "MIT",
      "authors": [
        "Taquito <https://taquito.mavryk.org/>"
      ],
      "homepage": "https://taquito.mavryk.org/"
    };

    const metadataBigMap = new MichelsonMap();
    metadataBigMap.set("", stringToBytes('mavryk-storage:here'));
    metadataBigMap.set("here", stringToBytes(JSON.stringify(metadataJSON)))

    // Ligo Taco shop contract modified to include metadata in storage
    // https://ide.ligolang.org/p/-uS469slzUlSm1zwNqHl1A

    const tacoShopStorageMap = new MichelsonMap();

    const op = await mavryk.contract.originate({
      code: tacoContractTzip16,
      storage: {
        metadata: metadataBigMap,
        taco_shop_storage: tacoShopStorageMap
      },
    });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('Tzip16Storage Contract address', contract.address)
    console.log('Gas Used', op.consumedGas);
    console.log('Storage Paid', op.storageDiff);
    console.log('Storage Size', op.storageSize);
    console.log('Storage', await contract.storage());
    console.log('Operation hash:', op.hash, 'Included in block level:', op.includedInBlock);
  } catch (ex) {
    console.error(ex);
  }
}

example();
