/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { CONFIGS, SignerType } from "../../../config";

CONFIGS().forEach(({ lib, rpc, setup, signerConfig }) => {
    const Mavryk = lib;
    describe(`Test reveal of account through contract API using: ${rpc}`, () => {

        const testWithKeyGen = signerConfig.type === SignerType.SECRET_KEY ? test.skip : test;

        beforeEach(async () => {
            await setup(true)
        })

        testWithKeyGen('verify that contract.reveal reveals the current account', async () => {
            const pkh = await Mavryk.signer.publicKeyHash()
            const pk = await Mavryk.signer.publicKey()

            try {
                const op = await Mavryk.contract.reveal({})
                await op.confirmation();

                expect(op.hash).toBeDefined();
                expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
                expect(Number(op.consumedGas)).toBeGreaterThan(0);
                expect(op.publicKey).toEqual(pk);
                expect(op.source).toEqual(pkh);
                expect(op.status).toEqual('applied');
                expect(op.storageDiff).toEqual('0');

                // if the account is revealed, it has a manager
                expect(await Mavryk.rpc.getManagerKey(pkh)).toEqual(pk)
            } catch (ex: any) {
                // When running tests with the same key multiple times, account may already be revealed
                expect(ex.message).toMatch(`The publicKeyHash '${pkh}' has already been revealed.`)

                // Verify the account is indeed revealed
                expect(await Mavryk.rpc.getManagerKey(pkh)).toEqual(pk)
            }
        });
    });
})
