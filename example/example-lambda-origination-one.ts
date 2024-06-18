import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { MichelsonMap, MavrykToolkit } from '@mavrykdynamics/taquito';
import { tzip7Contract } from '../integration-tests/data/tzip_7_contract';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
    const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
    const mavryk = new MavrykToolkit(provider);
    mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying LambdaOne contract...');

    const mapAccount1 = new MichelsonMap();
    mapAccount1.set('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc', '25');
    mapAccount1.set('mv1HDistHPoEHEN2dAPZXmxyiBCZAqufraBi', '25');

    const mapAccount2 = new MichelsonMap();
    mapAccount2.set('mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q', '25');
    mapAccount2.set('mv1VezducUiKAyuzmt15pQCqYQz3S5Vw5io8', '25');

    const bigMapLedger = new MichelsonMap();
    bigMapLedger.set('mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF', {
      balance: '50',
      allowances: mapAccount1
    });
    bigMapLedger.set('mv1SYCrLhPXMoDeB2eh4FRwiSW5weQBDu4tx', {
      balance: '50',
      allowances: mapAccount2
    });

    const the_owner = await mavryk.signer.publicKeyHash()

    const op = await mavryk.contract.originate({
      balance: "1",
      code: tzip7Contract,
      storage: {
        owner: the_owner,
        totalSupply: '100',
        ledger: bigMapLedger
      },
    });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('LambdaOne Contract address',contract.address)
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
