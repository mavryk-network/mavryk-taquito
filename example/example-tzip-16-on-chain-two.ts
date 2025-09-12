import { MichelsonMap, MavrykToolkit } from '@mavrykdynamics/taquito';
import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { contractCode, metadataViewsExample2 } from '../integration-tests/data/metadataViews';
import { stringToBytes } from '@mavrykdynamics/taquito-utils';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
  const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
  const mavryk = new MavrykToolkit(provider);
  mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying Tzip16OffChainTwo contract...');

    const metadataBigMAp = new MichelsonMap();
    metadataBigMAp.set("", stringToBytes('mavryk-storage:here'));
    metadataBigMAp.set("here", stringToBytes(JSON.stringify(metadataViewsExample2)))

    const op = await mavryk.contract.originate({
      code: contractCode,
      storage: {
        0: 7,
        metadata: metadataBigMAp
      }
    });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('Tzip16OffChainTwo Contract address', contract.address)
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
