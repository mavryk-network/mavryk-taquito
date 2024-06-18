import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { MavrykToolkit } from '@mavrykdynamics/taquito';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
    const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
    const mavryk = new MavrykToolkit(provider);
    mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying Michelson Tutorial contract...');
    const op = await mavryk.contract.originate({
      code: `parameter (pair address mumav);
      storage (map address mumav);
      code { DUP ; CAR ; SWAP ; CDR ; SWAP ; DUP ; DUG 2 ; CDR ; DIG 2 ; CAR ; SWAP ; SOME ; SWAP ; UPDATE ; NIL operation ; PAIR }`,
      init: [{
        prim: 'Elt',
        args: [{ string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }, { int: '0' }],
      }],
    });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    console.log('Michelson Tutorial Contract address', contract.address);
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
