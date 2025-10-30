/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BallotOperation, ForgedBytes } from '@mavrykdynamics/taquito';
import { OperationContentsAndResult } from '@mavrykdynamics/taquito-rpc';
import { defaultConfigConfirmation } from '../../src/context';

describe('Ballot operation', () => {
  let fakeContext: any;

  const fakeForgedBytes = {} as ForgedBytes;

  const successfulResult = [
    {
      kind: 'ballot',
      source: 'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      period: 3,
      proposal: 'PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg',
      ballot: 'yay',
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
      operations: [[{ hash: 'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE' }], [], [], []],
      header: {
        level: 1,
      },
    });
  });

  it('should return source of Ballot operation', () => {
    const op = new BallotOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      {} as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.source).toEqual('mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm');
  });

  it('should return period of Ballot operation', () => {
    const op = new BallotOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      {} as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.period).toEqual(3);
  });

  it('should return proposal hash of Ballot operation', () => {
    const op = new BallotOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      { proposal: 'PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg' } as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.proposal).toEqual('PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg');
  });

  it('should return ballot of Ballot operation', () => {
    const op = new BallotOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      { ballot: 'yay' } as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.ballot).toEqual('yay');
  });
});
