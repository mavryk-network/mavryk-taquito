/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { PollingSubscribeProvider, MavrykToolkit } from '@mavrykdynamics/taquito';
import { delay, retryWhen, tap, scan } from 'rxjs/operators';

async function example() {
  // This example will intentionally fail after two attempts as the RPC URL is invalid.
  const provider = 'https://mainnet.rpc.mavryk.network/notValid';
  const mavryk = new MavrykToolkit(provider);
  mavryk.setStreamProvider(mavryk.getFactory(PollingSubscribeProvider)({
    shouldObservableSubscriptionRetry: true, observableSubscriptionRetryFunction:
      retryWhen(error =>
        error.pipe(
          scan((acc, error) => {
            if (acc > 2) throw error;
            console.log("attempt " + acc);
            return acc + 1;
          }, 1),
          delay(3),
          tap(() => console.log("Retrying ..."))
        )
      ) as any
  }));

  const bakerAttestationFilter = {
    and: [{ source: 'mv2MzgCFpDwh37SnEdzzMhQWzmCyj32tCsMG' }, { kind: 'attestation' }]
  }

  const bakerEndorsementFilter = {
    and: [{ source: 'mv2MzgCFpDwh37SnEdzzMhQWzmCyj32tCsMG' }, { kind: 'endorsement' }]
  }

  const bakerDelegation = {
    and: [{ destination: 'mv2MzgCFpDwh37SnEdzzMhQWzmCyj32tCsMG' }, { kind: 'delegation' }]
  }

  mavryk.stream.subscribeOperation({
    or: [bakerAttestationFilter, bakerEndorsementFilter, bakerDelegation]
  })
}

example();
