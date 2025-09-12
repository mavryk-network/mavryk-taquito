import { InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { MavrykToolkit } from '@mavrykdynamics/taquito';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network';
  const signer = new InMemorySigner('edskRtmEwZxRzwd1obV9pJzAoLoxXFWTSHbgqpDBRHx1Ktzo5yVuJ37e2R4nzjLnNbxFU4UiBU1iHzAy52pK5YBRpaFwLbByca');
  const mavryk = new MavrykToolkit(provider);
  mavryk.setSignerProvider(signer);

  try {
    console.log('Deploying Wallet Test contract...');
    const op = await mavryk.contract.originate({
      balance: '0',
      code: `parameter unit;
      storage int;
      code { PUSH address "mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo" ;
             CONTRACT unit ;
             IF_NONE { PUSH string "Not a contract" ; FAILWITH } { DUP ; DIP { DROP } } ;
             DUP ;
             AMOUNT ;
             UNIT ;
             TRANSFER_TOKENS ;
             NIL operation ;
             DIG 1 ;
             DUP ;
             DUG 2 ;
             CONS ;
             DIG 3 ;
             DUP ;
             DUG 4 ;
             CDR ;
             DIG 1 ;
             DUP ;
             DUG 2 ;
             PAIR ;
             DIP { DROP 4 } }
            `,
      init: `0`,
    });

    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    const contractAddress = (await op.contract()).address;
    console.log('contractAddress', contractAddress);
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