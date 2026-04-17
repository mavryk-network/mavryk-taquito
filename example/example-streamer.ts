/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { PollingSubscribeProvider, MavrykToolkit } from '@mavrykdynamics/webmavryk';

async function example() {
  const provider = 'https://basenet.rpc.mavryk.network/';
  const mavryk = new MavrykToolkit(provider)
  mavryk.setStreamProvider(mavryk.getFactory(PollingSubscribeProvider)({ shouldObservableSubscriptionRetry: true, pollingIntervalMilliseconds: 15000 }));
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

    const sub = mavryk.stream.subscribeOperation({
      or: [bakerAttestationFilter, bakerEndorsementFilter, bakerDelegation]
    })

    sub.on('data', console.log)
  }
  catch (ex) {
    console.error(ex)
  }
}

example();
