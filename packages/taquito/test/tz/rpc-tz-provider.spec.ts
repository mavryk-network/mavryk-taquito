import { RpcMvProvider } from '../../src/mv/rpc-mv-provider';
import BigNumber from 'bignumber.js';
import { Context } from '../../src/context';

describe('RpcMvProvider test', () => {
  it('is instantiable', () => {
    expect(new RpcMvProvider(new Context('url'))).toBeInstanceOf(RpcMvProvider);
  });

  describe('getBalance', () => {
    it('calls get balance from the rpc client', async () => {
      const mockRpcClient = {
        getBalance: jest.fn(),
      };

      mockRpcClient.getBalance.mockResolvedValue(new BigNumber('10000'));

      const provider = new RpcMvProvider(new Context(mockRpcClient as any));
      const result = await provider.getBalance('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW');
      expect(result).toBeInstanceOf(BigNumber);
      expect(result.toString()).toStrictEqual('10000');
      expect(mockRpcClient.getBalance.mock.calls[0][0]).toEqual(
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW'
      );
    });
  });

  describe('getDelegate', () => {
    it('calls get delegate from the rpc client', async () => {
      const mockRpcClient = {
        getDelegate: jest.fn(),
      };

      mockRpcClient.getDelegate.mockResolvedValue('KT1G393LjojNshvMdf68XQD24Hwjn7xarzNe');

      const provider = new RpcMvProvider(new Context(mockRpcClient as any));
      const result = await provider.getDelegate('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW');
      expect(result).toStrictEqual('KT1G393LjojNshvMdf68XQD24Hwjn7xarzNe');
      expect(mockRpcClient.getDelegate.mock.calls[0][0]).toEqual(
        'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW'
      );
    });
  });

  describe('activate', () => {
    let mockSigner: {
      publicKeyHash: jest.Mock<any, any>;
      publicKey: jest.Mock<any, any>;
      sign: jest.Mock<any, any>;
    };
    it('should produce a activate_account operation', async () => {
      const mockRpcClient = {
        getBlock: jest.fn(),
        getScript: jest.fn(),
        getManagerKey: jest.fn(),
        getStorage: jest.fn(),
        getBlockHeader: jest.fn(),
        getProtocols: jest.fn(),
        getContract: jest.fn(),
        injectOperation: jest.fn(),
        preapplyOperations: jest.fn(),
      };
      const mockForger = {
        forge: jest.fn(),
      };
      // Required for operations confirmation polling
      mockRpcClient.getBlock.mockResolvedValue({
        operations: [[], [], [], []],
        header: {
          level: 0,
        },
      });

      mockSigner = {
        publicKeyHash: jest.fn(),
        publicKey: jest.fn(),
        sign: jest.fn(),
      };

      mockRpcClient.getManagerKey.mockResolvedValue('test');
      mockRpcClient.getContract.mockResolvedValue({ counter: 0 });
      mockRpcClient.getBlockHeader.mockResolvedValue({
        hash: 'BLJjnzaPtSsxykZ9pLTFLSfsKuiN3z7SjSPDPWwbE4Q68u5EpBw',
      });
      mockRpcClient.preapplyOperations.mockResolvedValue([]);
      mockRpcClient.getProtocols.mockResolvedValue({ next_protocol: 'test_proto' });
      mockForger.forge.mockResolvedValue('test');
      mockRpcClient.injectOperation.mockResolvedValue(
        'ood2Y1FLHH9izvYghVcDGGAkvJFo1CgSEjPfWvGsaz3qypCmeUj'
      );

      const context = new Context(mockRpcClient as any, mockSigner as any);
      context.forger = mockForger;
      const provider = new RpcMvProvider(context);
      const result = await provider.activate('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC', '123');
      expect(result.raw).toEqual({
        counter: 0,
        opOb: {
          branch: 'BLJjnzaPtSsxykZ9pLTFLSfsKuiN3z7SjSPDPWwbE4Q68u5EpBw',
          contents: [
            {
              kind: 'activate_account',
              pkh: 'mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC',
              secret: '123',
            },
          ],
          protocol: 'test_proto',
        },
        opbytes:
          'test00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      });
    });
  });
});
