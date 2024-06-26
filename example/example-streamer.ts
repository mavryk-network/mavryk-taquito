import { PollingSubscribeProvider, TezosToolkit } from '@mavrykdynamics/taquito';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network/';
  const tezos = new TezosToolkit(provider)
  tezos.setStreamProvider(tezos.getFactory(PollingSubscribeProvider)({ shouldObservableSubscriptionRetry: true, pollingIntervalMilliseconds: 15000 }));
  try {

    const bakerAttestationFilter = {
      and: [{ source: 'mv1JcvcbLirx2oH94vjT62SXaTbStyDwsVx5' }, { kind: 'attestation' }]
    }

    const bakerEndorsementFilter = {
      and: [{ source: 'mv1JcvcbLirx2oH94vjT62SXaTbStyDwsVx5' }, { kind: 'endorsement' }]
    }

    const bakerDelegation = {
      and: [{ destination: 'mv1JcvcbLirx2oH94vjT62SXaTbStyDwsVx5' }, { kind: 'delegation' }]
    }

    const sub = tezos.stream.subscribeOperation({
      or: [bakerAttestationFilter, bakerEndorsementFilter, bakerDelegation]
    })

    sub.on('data', console.log)
  }
  catch (ex) {
    console.error(ex)
  }
}

example();
