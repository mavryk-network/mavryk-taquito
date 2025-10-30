/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { OperationContentsAndResult } from '@mavrykdynamics/taquito-rpc';

export const resultOriginations = [
  {
    kind: 'origination',
    source: 'mv2iDQevDLRrRkCLYMEbg8M7E4ofso8eS442',
    fee: '723',
    counter: '587775',
    gas_limit: '1570',
    storage_limit: '571',
    balance: '1000000',
    script: {
      code: [],
      storage: {
        int: '0',
      },
    },
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        originated_contracts: ['KT1Wr1xjQAzb44AcPRV9F9oyPurkFz7y2otC'],
        consumed_milligas: '1469767',
        storage_size: '314',
        paid_storage_size_diff: '314',
      },
    },
  },
  {
    kind: 'origination',
    source: 'mv2iDQevDLRrRkCLYMEbg8M7E4ofso8eS442',
    fee: '723',
    counter: '587776',
    gas_limit: '1570',
    storage_limit: '571',
    balance: '1000000',
    script: {
      code: [],
      storage: {
        int: '0',
      },
    },
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        originated_contracts: ['KT1SG1LfkoMoEqR5srtiYeYcciaZfBTGzTgY'],
        consumed_milligas: '1469767',
        storage_size: '314',
        paid_storage_size_diff: '314',
      },
    },
  },
] as unknown as OperationContentsAndResult[];

export const successfulResult = [
  {
    kind: 'transaction',
    source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
    fee: '1831',
    counter: '121636',
    gas_limit: '15385',
    storage_limit: '257',
    amount: '1000000',
    destination: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
    metadata: {
      balance_updates: [
        { kind: 'contract', contract: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg', change: '-1831' },
        {
          kind: 'freezer',
          category: 'fees',
          delegate: 'mv1CSUcVn1mpn8GKw9uWwAD44YeknDWTBhPQ',
          cycle: 55,
          change: '1831',
        },
      ],
      operation_result: {
        status: 'applied',
        storage: { bytes: '00b2e19a9e74440d86c59f13dab8a18ff873e889ea' },
        balance_updates: [
          {
            kind: 'contract',
            contract: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
            change: '-1000000',
          },
          {
            kind: 'contract',
            contract: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
            change: '1000000',
          },
        ],
        consumed_milligas: '15285000',
        storage_size: '232',
      },
    },
  },
  {
    kind: 'transaction',
    source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
    fee: '2991',
    counter: '121637',
    gas_limit: '26260',
    storage_limit: '257',
    amount: '0',
    destination: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
    parameters: {
      entrypoint: 'do',
      value: [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
          prim: 'PUSH',
          args: [{ prim: 'key_hash' }, { string: 'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m' }],
        },
        { prim: 'IMPLICIT_ACCOUNT' },
        { prim: 'PUSH', args: [{ prim: 'mumav' }, { int: '50' }] },
        { prim: 'UNIT' },
        { prim: 'TRANSFER_TOKENS' },
        { prim: 'CONS' },
      ],
    },
    metadata: {
      balance_updates: [
        { kind: 'contract', contract: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg', change: '-2991' },
        {
          kind: 'freezer',
          category: 'fees',
          delegate: 'mv1CSUcVn1mpn8GKw9uWwAD44YeknDWTBhPQ',
          cycle: 55,
          change: '2991',
        },
      ],
      operation_result: {
        status: 'applied',
        storage: { bytes: '00b2e19a9e74440d86c59f13dab8a18ff873e889ea' },
        consumed_milligas: '15953000',
        storage_size: '232',
      },
      internal_operation_results: [
        {
          kind: 'transaction',
          source: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
          nonce: 0,
          amount: '50',
          destination: 'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m',
          result: {
            status: 'applied',
            balance_updates: [
              {
                kind: 'contract',
                contract: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
                change: '-50',
              },
              {
                kind: 'contract',
                contract: 'mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m',
                change: '50',
              },
            ],
            consumed_milligas: '10207000',
          },
        },
      ],
    },
  },
  {
    kind: 'transaction',
    source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
    fee: '2947',
    counter: '121638',
    gas_limit: '25894',
    storage_limit: '257',
    amount: '0',
    destination: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
    parameters: {
      entrypoint: 'do',
      value: [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
          prim: 'PUSH',
          args: [{ prim: 'key_hash' }, { string: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq' }],
        },
        { prim: 'SOME' },
        { prim: 'SET_DELEGATE' },
        { prim: 'CONS' },
      ],
    },
    metadata: {
      balance_updates: [
        { kind: 'contract', contract: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg', change: '-2947' },
        {
          kind: 'freezer',
          category: 'fees',
          delegate: 'mv1CSUcVn1mpn8GKw9uWwAD44YeknDWTBhPQ',
          cycle: 55,
          change: '2947',
        },
      ],
      operation_result: {
        status: 'applied',
        storage: { bytes: '00b2e19a9e74440d86c59f13dab8a18ff873e889ea' },
        consumed_milligas: '15794000',
        storage_size: '232',
      },
      internal_operation_results: [
        {
          kind: 'delegation',
          source: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
          nonce: 1,
          delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
          result: { status: 'applied', consumed_milligas: '10000000' },
        },
      ],
    },
  },
  {
    kind: 'transaction',
    source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
    fee: '2897',
    counter: '121639',
    gas_limit: '25822',
    storage_limit: '257',
    amount: '0',
    destination: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
    parameters: {
      entrypoint: 'do',
      value: [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        { prim: 'NONE', args: [{ prim: 'key_hash' }] },
        { prim: 'SET_DELEGATE' },
        { prim: 'CONS' },
      ],
    },
    metadata: {
      balance_updates: [
        { kind: 'contract', contract: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg', change: '-2897' },
        {
          kind: 'freezer',
          category: 'fees',
          delegate: 'mv1CSUcVn1mpn8GKw9uWwAD44YeknDWTBhPQ',
          cycle: 55,
          change: '2897',
        },
      ],
      operation_result: {
        status: 'applied',
        storage: { bytes: '00b2e19a9e74440d86c59f13dab8a18ff873e889ea' },
        consumed_milligas: '15722000',
        storage_size: '232',
      },
      internal_operation_results: [
        {
          kind: 'delegation',
          source: 'KT1UMZuZRzgS9iZGC2LTQad6PHPaF3fmSo4p',
          nonce: 2,
          result: { status: 'applied', consumed_milligas: '10000000' },
        },
      ],
    },
  },
] as unknown as OperationContentsAndResult[];

export const resultWithoutOrigination = [
  {
    kind: 'origination',
    source: 'mv2iDQevDLRrRkCLYMEbg8M7E4ofso8eS442',
    fee: '723',
    counter: '587775',
    gas_limit: '1570',
    storage_limit: '571',
    balance: '1000000',
    script: {
      code: {},
    },
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        consumed_milligas: '1469767',
        storage_size: '314',
        paid_storage_size_diff: '314',
      },
    },
  },
  {
    kind: 'origination',
    source: 'mv2iDQevDLRrRkCLYMEbg8M7E4ofso8eS442',
    fee: '723',
    counter: '587776',
    gas_limit: '1570',
    storage_limit: '571',
    balance: '1000000',
    script: {
      code: {},
    },
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        consumed_milligas: '1469767',
        storage_size: '314',
        paid_storage_size_diff: '314',
      },
    },
  },
] as unknown as OperationContentsAndResult[];

export const resultSingleOrigination = [
  {
    kind: 'transaction',
    source: 'mv2ZKdCtU99F2eQf4J9xkNRmiseqEgc8uLxD',
    fee: '495',
    counter: '504878',
    gas_limit: '1551',
    storage_limit: '0',
    amount: '20000',
    destination: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        consumed_milligas: '1450040',
      },
    },
  },
  {
    kind: 'transaction',
    source: 'mv2ZKdCtU99F2eQf4J9xkNRmiseqEgc8uLxD',
    fee: '495',
    counter: '504879',
    gas_limit: '1551',
    storage_limit: '0',
    amount: '20000',
    destination: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        consumed_milligas: '1450040',
      },
    },
  },
  {
    kind: 'transaction',
    source: 'mv2ZKdCtU99F2eQf4J9xkNRmiseqEgc8uLxD',
    fee: '495',
    counter: '504880',
    gas_limit: '1551',
    storage_limit: '0',
    amount: '20000',
    destination: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        consumed_milligas: '1450040',
      },
    },
  },
  {
    kind: 'origination',
    source: 'mv2ZKdCtU99F2eQf4J9xkNRmiseqEgc8uLxD',
    fee: '496',
    counter: '504881',
    gas_limit: '1570',
    storage_limit: '571',
    balance: '1000000',
    script: {
      code: [],
      storage: {
        int: '0',
      },
    },
    metadata: {
      balance_updates: [],
      operation_result: {
        status: 'applied',
        balance_updates: [],
        originated_contracts: ['KT1Em8ALyerHtZd1s5s6quJDZrTRxnmdKcKd'],
        consumed_milligas: '1469767',
        storage_size: '314',
        paid_storage_size_diff: '314',
      },
    },
  },
] as unknown as OperationContentsAndResult[];
