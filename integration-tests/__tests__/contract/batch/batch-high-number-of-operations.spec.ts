/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { CONFIGS } from '../../../config';
import { b58cencode, Prefix, prefix } from '@mavrykdynamics/webmavryk-utils';
import { InMemorySigner } from '@mavrykdynamics/webmavryk-signer';
const crypto = require('crypto');

// This test is skipped on Mavbox due to the high number of operations taking too long to resolve in the sandbox
CONFIGS().forEach(({ lib, rpc, setup }) => {
    const Mavryk = lib;

    describe(`Test contract.batch containing a high number of operations through contract api using: ${rpc}`, () => {
        beforeEach(async () => {
            await setup(true);
        });

        it('Verify contract.batch with 150 operations', async () => {
            const dests: { key: string, pkh: string }[] = [];
            const batchSize = 150;

            for (let i = 0; i < batchSize; i++) {
                const keyBytes = Buffer.alloc(32);
                crypto.randomFillSync(keyBytes)

                const key = b58cencode(new Uint8Array(keyBytes), prefix[Prefix.SPSK]);
                const pkh = await new InMemorySigner(key).publicKeyHash();
                dests.push({ key, pkh });
            }

            const batch = Mavryk.contract.batch()
            dests.forEach(({ pkh }) => {
                batch.withTransfer({ to: pkh, amount: 0.001 });
            })

            const op = await batch.send();
            await op.confirmation(1, 300);

            expect(op.status).toEqual('applied');
        });
    });
});
