/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import fs from 'fs';
import path from 'path';

export const addContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/and_bytes.mv`)).toString();
export const lslContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/lsl_bytes.mv`)).toString();
export const lsrContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/lsr_bytes.mv`)).toString();
export const notContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/not_bytes.mv`)).toString();
export const orContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/or_bytes.mv`)).toString();
export const xorContract =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/xor_bytes.mv`)).toString();
