/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { DrainDelegateOperation, ForgedBytes } from '@mavrykdynamics/taquito';
import {
  OperationContentsAndResult,
  OpKind,
  OperationContentsAndResultDrainDelegate,
} from '@mavrykdynamics/taquito-rpc';
import { defaultConfigConfirmation } from '../../src/context';

describe('DrainDelegate operation', () => {
  let fakeContext: any;

  const fakeForgedBytes = {} as ForgedBytes;

  const successfulResult = [
    {
      kind: 'drain_delegate',
      consensus_key: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      delegate: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
      destination: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      metadata: {
        balance_updates: [
          {
            kind: 'contract',
            contract: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
            change: '-15525772494',
            origin: 'block',
          },
          {
            kind: 'contract',
            contract: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
            change: '15525772494',
            origin: 'block',
          },
          {
            kind: 'contract',
            contract: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
            change: '-156825984',
            origin: 'block',
          },
          {
            kind: 'contract',
            contract: 'mv1S3xzu9KfHfebbXDsT9ynfLrCM6QrMaEeL',
            change: '156825984',
            origin: 'block',
          },
        ],
      },
    },
  ] as OperationContentsAndResult[];

  beforeEach(() => {
    fakeContext = {
      rpc: {
        getBlock: jest.fn(),
      },
      config: { ...defaultConfigConfirmation },
    };

    fakeContext.rpc.getBlock.mockResolvedValue({
      operations: [[{ hash: 'oo7gLAnWgTe7XtoYjgnkNBXDDvUy2e1DVcVwtvALxajx6KRzkXb' }], [], [], []],
      header: {
        level: 1,
      },
    });
  });

  it('should return OperationMetadataBalanceUpdates of DrainDelegate operation', () => {
    const op = new DrainDelegateOperation(
      'oo7gLAnWgTe7XtoYjgnkNBXDDvUy2e1DVcVwtvALxajx6KRzkXb',
      {
        kind: OpKind.DRAIN_DELEGATE,
        consensus_key: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
        delegate: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
        destination: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      },
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.operationResults).toEqual(
      (successfulResult[0] as OperationContentsAndResultDrainDelegate).metadata.balance_updates
    );
  });

  it('should return consensusKey of DrainDelegate operation', () => {
    const op = new DrainDelegateOperation(
      'oo7gLAnWgTe7XtoYjgnkNBXDDvUy2e1DVcVwtvALxajx6KRzkXb',
      {
        kind: OpKind.DRAIN_DELEGATE,
        consensus_key: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
        delegate: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
        destination: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      },
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.consensusKey).toEqual('mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq');
  });

  it('should return delegate of DrainDelegate operation', () => {
    const op = new DrainDelegateOperation(
      'oo7gLAnWgTe7XtoYjgnkNBXDDvUy2e1DVcVwtvALxajx6KRzkXb',
      {
        kind: OpKind.DRAIN_DELEGATE,
        consensus_key: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
        delegate: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
        destination: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      },
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.delegate).toEqual('mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr');
  });

  it('should return destination of DrainDelegate operation', () => {
    const op = new DrainDelegateOperation(
      'oo7gLAnWgTe7XtoYjgnkNBXDDvUy2e1DVcVwtvALxajx6KRzkXb',
      {
        kind: OpKind.DRAIN_DELEGATE,
        consensus_key: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
        delegate: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
        destination: 'mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq',
      },
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.destination).toEqual('mv194tkdxpwcxPy541ePRJdECnzqbvwZWJZq');
  });
});
