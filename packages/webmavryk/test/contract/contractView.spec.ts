/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { RpcContractProvider } from '../../src/contract/rpc-contract-provider';
import { tokenInit, tokenCode } from './data';
import { Context } from '../../src/context';
import { ContractView } from '../../src/contract/contract';
import { InvalidParameterError } from '../../src/contract/errors';
import { ChainIds } from '../../src/constants';
import { UnitValue } from '@mavrykdynamics/webmavryk-michelson-encoder';

describe('ContractView test', () => {
  let rpcContractProvider: RpcContractProvider;
  let mockRpcClient: {
    getContract: jest.Mock<any, any>;
    getStorage: jest.Mock<any, any>;
    getEntrypoints: jest.Mock<any, any>;
    getBlockHeader: jest.Mock<any, any>;
    runView: jest.Mock<any, any>;
    getChainId: jest.Mock<any, any>;
  };

  let mockSigner: {
    publicKeyHash: jest.Mock<any, any>;
    publicKey: jest.Mock<any, any>;
    sign: jest.Mock<any, any>;
  };

  let mockEstimate: {
    originate: jest.Mock<any, any>;
    transfer: jest.Mock<any, any>;
    setDelegate: jest.Mock<any, any>;
    registerDelegate: jest.Mock<any, any>;
  };

  beforeEach(() => {
    mockRpcClient = {
      getEntrypoints: jest.fn(),
      getContract: jest.fn(),
      getStorage: jest.fn(),
      getBlockHeader: jest.fn(),
      runView: jest.fn(),
      getChainId: jest.fn(),
    };

    mockSigner = {
      publicKeyHash: jest.fn(),
      publicKey: jest.fn(),
      sign: jest.fn(),
    };

    mockEstimate = {
      originate: jest.fn(),
      transfer: jest.fn(),
      registerDelegate: jest.fn(),
      setDelegate: jest.fn(),
    };

    rpcContractProvider = new RpcContractProvider(
      new Context(mockRpcClient as any, mockSigner as any),
      mockEstimate as any
    );

    mockRpcClient.getChainId.mockResolvedValue('NetXjD3HPJJjmcd');
    mockRpcClient.getContract.mockResolvedValue({
      script: {
        code: tokenCode,
        storage: tokenInit,
      },
    });
    mockSigner.sign.mockResolvedValue({ sbytes: 'test', prefixSig: 'test_sig' });
    mockSigner.publicKey.mockResolvedValue('test_pub_key');
    mockSigner.publicKeyHash.mockResolvedValue('mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q');

    mockRpcClient.getEntrypoints.mockResolvedValue({
      entrypoints: {
        transfer: {
          prim: 'pair',
          args: [
            { prim: 'pair', args: [{ prim: 'address', annots: ['test'] }, { prim: 'address' }] },
            { prim: 'nat' },
          ],
        },
        getTotalSupply: {
          prim: 'pair',
          args: [{ prim: 'unit' }, { prim: 'contract', args: [{ prim: 'nat' }] }],
        },
        getBalance: {
          prim: 'pair',
          args: [{ prim: 'address' }, { prim: 'contract', args: [{ prim: 'nat' }] }],
        },
        getAllowance: {
          prim: 'pair',
          args: [
            { prim: 'pair', args: [{ prim: 'address' }, { prim: 'address' }] },
            { prim: 'contract', args: [{ prim: 'nat' }] },
          ],
        },
      },
    });

    mockRpcClient.runView.mockResolvedValue({
      data: { int: '100' },
    });
  });

  it('should create instances of ContractView for the entry points that match the tzip4 view signature', async () => {
    // The tzip4 view signature is a pair where its second arguments is a contract.
    const result = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');

    expect(() => result.views.transfer()).toThrow(); // Entry point transfer is not a view
    expect(result.views.getTotalSupply(UnitValue)).toBeInstanceOf(ContractView);
    expect(result.views.getBalance('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3')).toBeInstanceOf(
      ContractView
    );
    expect(
      result.views.getAllowance(
        'mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3',
        'mv1W9WUWpdHfgSYwV9hksndfxJYGAQqhLZra'
      )
    ).toBeInstanceOf(ContractView);

    try {
      result.views.getAllowance(
        'mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3',
        'mv1W9WUWpdHfgSYwV9hksndfxJYGAQqhLZra',
        'test'
      );
    } catch (e: any) {
      expect(e.message).toContain(
        `getAllowance Received 3 arguments while expecting one of the following signatures`
      );
      expect(e).toBeInstanceOf(Error);
      expect(e).toBeInstanceOf(InvalidParameterError);
    }
  });

  it('Should be able to execute tzip4 views by calling the read method (without passing chainId)', async () => {
    mockRpcClient.getChainId.mockResolvedValue('NetXmtMsNf69w1w');

    const contractView = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
    const result = await contractView.views
      .getBalance('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3')
      .read();

    expect(result.toString()).toEqual('100');
  });

  it('Should be able to execute tzip4 views by calling the read method (with passing chainId)', async () => {
    const contractView = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
    const result = await contractView.views
      .getBalance('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3')
      .read(ChainIds.ATLASNET);

    expect(result.toString()).toEqual('100');
  });

  it('Should throw InvalidChainIdError', async () => {
    const contractView = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
    try {
      await contractView.views
        .getBalance('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3')
        .read('invalid' as any);
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain(`Invalid chain id "invalid"`);
    }
  });

  it('Should throw if a contract address is passed as a parameter of the read method (breaking change version 12)', async () => {
    const contractView = await rpcContractProvider.at('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D');
    try {
      await contractView.views
        .getBalance('mv1EqiZXQdpKYZzDQCaGXPz3BNmGjFiPrqp3')
        .read('KT1H2a5vGkMLFGBPMs6oRRJshCvYeXSBSadn' as any);
    } catch (e: any) {
      expect(e.message).toEqual(
        `Since version 12, the lambda view no longer depends on a lambda contract. The read method no longer accepts a contract address as a parameter.`
      );
    }
  });
});
