/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import fs from 'fs';
import path from 'path';

export const bytesAndInt =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/bytes_of_int.mv`)).toString();
export const bytesAndNat =  fs.readFileSync(path.resolve(`${__dirname}/../../packages/taquito-michel-codec/test/contracts_016/opcodes/bytes_of_nat.mv`)).toString();
