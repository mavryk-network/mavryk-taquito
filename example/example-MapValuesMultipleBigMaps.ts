import { MichelsonMap, MavrykToolkit } from '@mavrykdynamics/taquito';
import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { tokenCode } from '../integration-tests/data/tokens';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
    const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
    const mavryk = new MavrykToolkit(provider);
    mavryk.setSignerProvider(signer);
  
  try {
    console.log('Deploying MapValuesMultipleBigMaps contract...');
    
    const signer = await mavryk.signer.publicKeyHash();

            const bigMapInit = new MichelsonMap();
            bigMapInit.set(signer, { 0: '1', 1: new MichelsonMap() });
            bigMapInit.set('mv3Bk6yGMcuVGYqzJ31iMQyhNhmfSJAJJina', { 0: '2', 1: new MichelsonMap() });
            bigMapInit.set('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ', { 0: '3', 1: new MichelsonMap() });
            bigMapInit.set('mv3WNhwFRPV4fCkK2iBDWZtLNsDg4tecU5X5', { 0: '4', 1: new MichelsonMap() });
            // Deploy a contract with a big map
            const op = await mavryk.contract.originate({
                code: tokenCode,
                storage: {
                    0: bigMapInit,
                    1: signer,
                    2: true,
                    3: '3'
                }
            });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('MapValuesMultipleBigMaps Contract address',contract.address)
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
