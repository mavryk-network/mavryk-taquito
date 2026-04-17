/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const rpcContractResponse = { "manager": "mv1Qar5YS7LGthsaiYvLhkcd5A2DGQn8tjsN", "balance": "1000000", "spendable": false, "delegate": { "setable": false }, "script": { "code": [{ "prim": "parameter", "args": [{ "prim": "string" }] }, { "prim": "storage", "args": [{ "prim": "string" }] }, { "prim": "code", "args": [[{ "prim": "CAR" }, { "prim": "PUSH", "args": [{ "prim": "string" }, { "string": "Hello " }] }, { "prim": "CONCAT" }, { "prim": "NIL", "args": [{ "prim": "operation" }] }, { "prim": "PAIR" }]] }], "storage": { "string": "test" } }, "counter": "0" }

export const storage = rpcContractResponse.script.code.find(
    x => x.prim === 'storage'
)!.args[0] as any;

export const params = rpcContractResponse.script.code.find(
    x => x.prim === 'parameter'
)!.args[0] as any;