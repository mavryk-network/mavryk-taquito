/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

export const genericStorage = {
  prim: 'Unit',
};

export const genericCode = (op: string) => [
  {
    prim: 'parameter',
    args: [{ prim: 'unit' }],
  },
  {
    prim: 'storage',
    args: [{ prim: 'unit' }],
  },
  {
    prim: 'code',
    args: [{ prim: op }],
  },
];
