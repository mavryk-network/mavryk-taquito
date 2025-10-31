/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

const setDelegate = (key: string) => {
  return [
    { prim: 'DROP' },
    { prim: 'NIL', args: [{ prim: 'operation' }] },
    {
      prim: 'PUSH',
      args: [{ prim: 'key_hash' }, { string: key }],
    },
    { prim: 'SOME' },
    { prim: 'SET_DELEGATE' },
    { prim: 'CONS' },
  ];
};

const transferImplicit = (key: string, mumav: number) => {
  return [
    { prim: 'DROP' },
    { prim: 'NIL', args: [{ prim: 'operation' }] },
    {
      prim: 'PUSH',
      args: [{ prim: 'key_hash' }, { string: key }],
    },
    { prim: 'IMPLICIT_ACCOUNT' },
    {
      prim: 'PUSH',
      args: [{ prim: 'mumav' }, { int: `${mumav}` }],
    },
    { prim: 'UNIT' },
    { prim: 'TRANSFER_TOKENS' },
    { prim: 'CONS' },
  ];
};

const removeDelegate = () => {
  return [
    { prim: 'DROP' },
    { prim: 'NIL', args: [{ prim: 'operation' }] },
    { prim: 'NONE', args: [{ prim: 'key_hash' }] },
    { prim: 'SET_DELEGATE' },
    { prim: 'CONS' },
  ];
};

const transferToContract = (key: string, amount: number) => {
  return [
    { prim: 'DROP' },
    { prim: 'NIL', args: [{ prim: 'operation' }] },
    {
      prim: 'PUSH',
      args: [{ prim: 'address' }, { string: key }],
    },
    { prim: 'CONTRACT', args: [{ prim: 'unit' }] },
    {
      prim: 'IF_NONE',
      args: [[{ prim: 'UNIT' }, { prim: 'FAILWITH' }], []],
    },
    {
      prim: 'PUSH',
      args: [{ prim: 'mumav' }, { int: `${amount}` }],
    },
    { prim: 'UNIT' },
    { prim: 'TRANSFER_TOKENS' },
    { prim: 'CONS' },
  ];
};

export const MANAGER_LAMBDA = {
  setDelegate,
  removeDelegate,
  transferImplicit,
  transferToContract,
};
