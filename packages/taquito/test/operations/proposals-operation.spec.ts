/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { ProposalsOperation, ForgedBytes } from '@mavrykdynamics/taquito';
import { OperationContentsAndResult } from '@mavrykdynamics/taquito-rpc';
import { defaultConfigConfirmation } from '../../src/context';

describe('Proposals operation', () => {
  let fakeContext: any;

  const fakeForgedBytes = {} as ForgedBytes;

  const successfulResult = [
    {
      kind: 'proposals',
      source: 'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      period: 2,
      proposals: ['PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg'],
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

  it('should return source of Proposals operation', () => {
    const op = new ProposalsOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      {} as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.source).toEqual('mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm');
  });

  it('should return period of Proposals operation', () => {
    const op = new ProposalsOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      {} as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.period).toEqual(2);
  });

  it('should return proposal hash of Proposals operation', () => {
    const op = new ProposalsOperation(
      'ooBghN2ok5EpgEuMqYWqvfwNLBiK9eNFoPai91iwqk2nRCyUKgE',
      { proposals: ['PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg'] } as any,
      'mv1J9yX7MXY2E4rLTTtSfJo9Y8dmHghy7zDm',
      fakeForgedBytes,
      successfulResult,
      fakeContext
    );

    expect(op.proposals).toEqual(['PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg']);
  });
});
