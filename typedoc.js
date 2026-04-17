/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

module.exports = {
  out: 'website/build/typedoc',
  readme: 'packages/webmavryk/README.md',
  entryPoints: [
    './packages/webmavryk/src/webmavryk.ts',
    './packages/webmavryk-mavlet-wallet/src/webmavryk-mavlet-wallet.ts',
    './packages/webmavryk-core/src/webmavryk-core.ts',
    './packages/webmavryk-http-utils/src/webmavryk-http-utils.ts',
    './packages/webmavryk-ledger-signer/src/webmavryk-ledger-signer.ts',
    './packages/webmavryk-local-forging/src/webmavryk-local-forging.ts',
    './packages/webmavryk-michelson-encoder/src/webmavryk-michelson-encoder.ts',
    './packages/webmavryk-remote-signer/src/webmavryk-remote-signer.ts',
    './packages/webmavryk-rpc/src/webmavryk-rpc.ts',
    './packages/webmavryk-signer/src/webmavryk-signer.ts',
    './packages/webmavryk-tzip12/src/webmavryk-tzip12.ts',
    './packages/webmavryk-tzip16/src/webmavryk-tzip16.ts',
    './packages/webmavryk-utils/src/webmavryk-utils.ts',
    './packages/webmavryk-contracts-library/src/webmavryk-contracts-library.ts',
    './packages/webmavryk-sapling/src/webmavryk-sapling.ts',
    './packages/webmavryk-michel-codec/src/webmavryk-michel-codec.ts',
  ],
  exclude: [
    '**/*.spec.ts',
    '**/data/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/rollup*.ts',
    '**/test/**',
    '/coverage/**',
  ],
  name: 'Webmavryk',
  excludePrivate: true,
};
