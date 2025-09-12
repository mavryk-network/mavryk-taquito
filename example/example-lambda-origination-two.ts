import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { MichelsonMap, MavrykToolkit } from '@mavrykdynamics/taquito';
import { fa2Contract } from '../integration-tests/data/fa2_contract';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
    const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
    const mavryk = new MavrykToolkit(provider);
    mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying LambdaTwo contract...');

    const bigMapLedger = new MichelsonMap();
    bigMapLedger.set('mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF', {
      allowances: ['mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc'],
      balance: '50'
    });
    bigMapLedger.set('mv1SYCrLhPXMoDeB2eh4FRwiSW5weQBDu4tx', {
      allowances: ['mv1HDistHPoEHEN2dAPZXmxyiBCZAqufraBi'],
      balance: '50',
    });

    const tokenMetadataBigMap = new MichelsonMap();
    tokenMetadataBigMap.set('0', {
      token_id: '0',
      symbol: 'hello',
      name: 'test',
      decimals: '0',
      extras: new MichelsonMap()
    });
    tokenMetadataBigMap.set('1', {
      token_id: '1',
      symbol: 'world',
      name: 'test2',
      decimals: '0',
      extras: new MichelsonMap()
    });

    const op = await mavryk.contract.originate({
      balance: "1",
      code: fa2Contract,
      storage: {
        ledger: bigMapLedger,
        token_metadata: tokenMetadataBigMap,
        total_supply: '100'
      },
    })

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('LambdaTwo Contract address',contract.address)
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
