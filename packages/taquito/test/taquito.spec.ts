import { MavrykToolkit, SetProviderOptions, Wallet, RpcPacker } from '../src/taquito';
import { RpcMvProvider } from '../src/mv/rpc-mv-provider';
import { RpcContractProvider } from '../src/contract/rpc-contract-provider';
import { PrepareProvider } from '../src/prepare/prepare-provider';
import { PollingSubscribeProvider } from '../src/subscribe/polling-subcribe-provider';
import { NoopSigner } from '../src/signer/noop';
import { RpcClient } from '@mavrykdynamics/taquito-rpc';
import { RPCEstimateProvider } from '../src/estimate/rpc-estimate-provider';
import { OperationFactory } from '../src/wallet/operation-factory';
import { NoopGlobalConstantsProvider } from '../src/global-constants/noop-global-constants-provider';
import { TaquitoLocalForger } from '../src/forger/taquito-local-forger';
import { RpcInjector } from '../src/taquito';

describe('MavrykToolkit test', () => {
  let mockRpcClient: any;
  let toolkit: MavrykToolkit;

  beforeEach(() => {
    mockRpcClient = {
      getBlock: jest.fn(),
      getScript: jest.fn(),
      getManagerKey: jest.fn(),
      getStorage: jest.fn(),
      getBlockHeader: jest.fn(),
      getBlockMetadata: jest.fn(),
      getContract: jest.fn(),
      forgeOperations: jest.fn(),
      injectOperation: jest.fn(),
      preapplyOperations: jest.fn(),
    };

    mockRpcClient.getContract.mockResolvedValue({ counter: 0 });
    mockRpcClient.getBlockHeader.mockResolvedValue({ hash: 'test' });
    mockRpcClient.preapplyOperations.mockResolvedValue([]);
    mockRpcClient.getBlockMetadata.mockResolvedValue({ next_protocol: 'test_proto' });

    // Required for operations confirmation polling
    mockRpcClient.getBlock.mockResolvedValue({
      operations: [[{ hash: 'test' }], [], [], []],
      header: {
        level: 0,
      },
    });

    mockRpcClient.getManagerKey.mockResolvedValue('test');
    toolkit = new MavrykToolkit(mockRpcClient);
  });

  it('the default providers are set on the MavrykToolkit at instantiation', () => {
    const mavryk = new MavrykToolkit('rpc');
    expect(mavryk.globalConstants).toBeInstanceOf(NoopGlobalConstantsProvider);
    expect(mavryk.contract).toBeInstanceOf(RpcContractProvider);
    expect(mavryk.estimate).toBeInstanceOf(RPCEstimateProvider);
    expect(mavryk.operation).toBeInstanceOf(OperationFactory);
    expect(mavryk.signer).toBeInstanceOf(NoopSigner);
    expect(mavryk.stream).toBeInstanceOf(PollingSubscribeProvider);
    expect(mavryk.mv).toBeInstanceOf(RpcMvProvider);
    expect(mavryk.wallet).toBeInstanceOf(Wallet);
    expect(mavryk.prepare).toBeInstanceOf(PrepareProvider);
  });

  it('setProvider with string should create rpc provider', () => {
    toolkit.setProvider({ rpc: 'test' });
    expect(toolkit.mv).toBeInstanceOf(RpcMvProvider);
    expect(toolkit.contract).toBeInstanceOf(RpcContractProvider);
  });

  const providerKey: (keyof SetProviderOptions)[] = [
    'signer',
    'rpc',
    'stream',
    'protocol',
    'config',
    'forger',
    'wallet',
    'packer',
    'globalConstantsProvider',
    'readProvider',
    'injectorProvider',
  ];
  providerKey
    .filter((x) => x !== 'rpc')
    .forEach((key) => {
      it(`setting ${key} provider should not override the rpc provider`, () => {
        toolkit = new MavrykToolkit('rpc');
        expect(toolkit.rpc).toBeInstanceOf(RpcClient);
        toolkit.setProvider({ rpc: 'test' });
        expect(toolkit.rpc.getRpcUrl()).toEqual('test');
        toolkit.setProvider({ [key]: 'test' as any });
        expect(toolkit.rpc.getRpcUrl()).toEqual('test');
      });
    });

  providerKey
    .filter((x) => x !== 'signer')
    .forEach((key) => {
      it(`setting ${key} provider should not override the signer provider`, () => {
        expect(toolkit.signer).toBeInstanceOf(NoopSigner);
        toolkit.setProvider({ signer: 'test' as any });
        const instance = toolkit.signer;
        expect(instance).toEqual('test');
        toolkit.setProvider({ [key]: 'test' as any });
        expect(toolkit.signer).toEqual(instance);
      });
    });

  providerKey
    .filter((x) => x !== 'stream')
    .forEach((key) => {
      it(`setting ${key} provider should not override the stream provider`, () => {
        expect(toolkit.stream).toBeInstanceOf(PollingSubscribeProvider);
        toolkit.setProvider({ stream: 'test' as any });
        const instance = toolkit.stream;
        expect(instance).toBeInstanceOf(PollingSubscribeProvider);
        toolkit.setProvider({ [key]: 'test' as any });
        expect(toolkit.stream).toEqual(instance);
      });
    });

  providerKey
    .filter((x) => x !== 'packer')
    .forEach((key) => {
      it(`setting ${key} provider should not override the packer provider`, () => {
        expect(toolkit['_context'].packer).toBeInstanceOf(RpcPacker);
        toolkit.setProvider({ packer: 'test' as any });
        const instance = toolkit['_context'].packer;
        expect(instance).toEqual('test');
        toolkit.setProvider({ [key]: 'test' as any });
        expect(toolkit['_context'].packer).toEqual(instance);
      });
    });

  providerKey
    .filter((x) => x !== 'globalConstantsProvider')
    .forEach((key) => {
      it(`setting ${key} provider should not override the globalConstantsProvider`, () => {
        expect(toolkit.globalConstants).toBeInstanceOf(NoopGlobalConstantsProvider);
        toolkit.setProvider({ globalConstantsProvider: 'test' as any });
        const instance = toolkit.globalConstants;
        expect(instance).toEqual('test');
        toolkit.setProvider({ [key]: 'test' as any });
        expect(toolkit.globalConstants).toEqual(instance);
      });
    });

  providerKey.forEach((key) => {
    it(`setting ${key} provider should not override the forger provider`, () => {
      expect(toolkit['_context'].forger).toBeInstanceOf(TaquitoLocalForger);
      toolkit.setProvider({ forger: 'test' as any });
      const instance = toolkit['_context'].forger;
      expect(instance).toEqual('test');
      toolkit.setProvider({ [key]: 'test' as any });
      expect(toolkit['_context'].forger).toEqual(instance);
    });
  });

  providerKey.forEach((key) => {
    it(`setting ${key} provider should not override the injector provider`, () => {
      expect(toolkit['_context'].injector).toBeInstanceOf(RpcInjector);
      toolkit.setProvider({ injectorProvider: 'test' as any });
      const instance = toolkit['_context'].injector;
      expect(instance).toEqual('test');
      toolkit.setProvider({ [key]: 'test' as any });
      expect(toolkit['_context'].injector).toEqual(instance);
    });
  });

  it('getVersionInfo returns well formed response', () => {
    const versionInfo = toolkit.getVersionInfo();
    expect(versionInfo.commitHash).toBeTruthy();
    expect(versionInfo.version).toBeTruthy();
  });

  it('setProvider allows to change configurations for the confirmation methods', () => {
    // There is default config set on the context class:
    expect(toolkit['_context'].config.confirmationPollingTimeoutSecond).toEqual(180);
    expect(toolkit['_context'].config.defaultConfirmationCount).toEqual(1);

    // can customize one of the config: confirmationPollingTimeoutSecond
    toolkit.setProvider({ config: { confirmationPollingTimeoutSecond: 2 } });
    expect(toolkit['_context'].config.confirmationPollingTimeoutSecond).toEqual(2);
    expect(toolkit['_context'].config.defaultConfirmationCount).toEqual(1);

    // can customize another config: confirmationPollingIntervalSecond
    // confirmationPollingTimeoutSecond should remain to 2 as set precedently
    toolkit.setProvider({ config: { defaultConfirmationCount: 40 } });
    expect(toolkit['_context'].config.confirmationPollingTimeoutSecond).toEqual(2);
    expect(toolkit['_context'].config.defaultConfirmationCount).toEqual(40);
  });
});
