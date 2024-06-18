import { CompositeForger, RpcForger, MavrykToolkit, Protocols, TaquitoLocalForger, PollingSubscribeProvider } from '@mavrykdynamics/taquito';
import { RemoteSigner } from '@mavrykdynamics/taquito-remote-signer';
import { HttpBackend } from '@mavrykdynamics/taquito-http-utils';
import { b58cencode, Prefix, prefix } from '@mavrykdynamics/taquito-utils';
import { importKey, InMemorySigner } from '@mavrykdynamics/taquito-signer';
import { RpcClient, RpcClientCache } from '@mavrykdynamics/taquito-rpc';
import { KnownContracts } from './known-contracts';
import { knownContractsProtoALph } from './known-contracts-ProtoALph';
import { knownContractsPtBasenet } from './known-contracts-PtBasenet';
import { knownContractsPtBoreas } from './known-contracts-PtBoreas';
import { knownContractsPtAtLas } from './known-contracts-PtAtLas';

const nodeCrypto = require('crypto');

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if (typeof jest !== 'undefined') {
  jest.setTimeout(60000 * 10);
}

enum ForgerType {
  LOCAL = 'local',
  RPC = 'rpc',
  COMPOSITE = 'composite',
}

export const isSandbox = (config: { rpc: string }) => {
  return config.rpc.includes('localhost') || config.rpc.includes('0.0.0.0') || config.rpc.includes('127.0.0.1');
}

const forgers: ForgerType[] = [ForgerType.COMPOSITE];

// user running integration test can pass environment variable MAVRYK_NETWORK_TYPE=sandbox to specify which network to run against
export enum NetworkType {
  TESTNET,  // corresponds basenet, boreasnet and weeklynet etc.
  SANDBOX,  // corresponds to flexmasa local chain
}

interface Config {
  rpc: string;
  pollingIntervalMilliseconds?: string;
  rpcCacheMilliseconds: string;
  knownBaker: string;
  knownContract: string;
  knownBigMapContract: string;
  knownTzip1216Contract: string;
  knownSaplingContract: string;
  knownViewContract: string;
  protocol: Protocols;
  signerConfig: EphemeralConfig | SecretKeyConfig;
  networkType: NetworkType;
}
/**
 * SignerType specifies the different signer options used in the integration test suite. EPHEMERAL_KEY relies on a the [tezos-key-get-api](https://github.com/ecadlabs/tezos-key-gen-api)
 */
export enum SignerType {
  EPHEMERAL_KEY,
  SECRET_KEY
}

interface ConfigWithSetup extends Config {
  lib: MavrykToolkit;
  setup: (preferFreshKey?: boolean) => Promise<void>;
  createAddress: () => Promise<MavrykToolkit>;
}
/**
 * EphemeralConfig contains configuration for interacting with the [tezos-key-gen-api](https://github.com/ecadlabs/tezos-key-gen-api)
 */
interface EphemeralConfig {
  type: SignerType.EPHEMERAL_KEY;
  keyUrl: string;
  requestHeaders: { [key: string]: string };
}

interface SecretKeyConfig {
  type: SignerType.SECRET_KEY,
  secret_key: string,
  password?: string
}

export const defaultSecretKey: SecretKeyConfig = {
  // pkh is mv2dZ3AF2dGSRJBSABT7bE8J2H6fAqhAZYD2
  type: SignerType.SECRET_KEY,
  secret_key: process.env['SECRET_KEY'] || 'spsk21y52Cp943kGnqPBSjXMC2xf1hz8QDGGih7AJdFqhxPcm1ihRN',
  password: process.env['PASSWORD_SECRET_KEY'] || undefined,
}

const defaultEphemeralConfig = (keyUrl: string): EphemeralConfig => ({
  type: SignerType.EPHEMERAL_KEY as SignerType.EPHEMERAL_KEY,
  keyUrl: keyUrl,
  requestHeaders: { Authorization: 'Bearer taquito-example' },
});

// Named parameters for defaultConfig below
interface DefaultConfiguration {
  networkName: string;
  protocol: Protocols;
  defaultRpc: string;
  knownContracts: KnownContracts;
  signerConfig: EphemeralConfig | SecretKeyConfig;
}

// Creates a default Config for the given networkName, running
// protocol, available on defaultRpc, a set of knownContracts and
// signerConfig.
const defaultConfig = ({
  networkName,
  protocol,
  defaultRpc,
  knownContracts,
  signerConfig
}: DefaultConfiguration): Config => {
  const networkType = (process.env['MAVRYK_NETWORK_TYPE'] === 'sandbox')
    ? NetworkType.SANDBOX
    : NetworkType.TESTNET;
  return {
    rpc: process.env[`MAVRYK_RPC_${networkName}`] || defaultRpc,
    pollingIntervalMilliseconds: process.env[`POLLING_INTERVAL_MILLISECONDS`] || undefined,
    rpcCacheMilliseconds: process.env[`RPC_CACHE_MILLISECONDS`] || '1000',
    knownBaker: process.env[`MAVRYK_BAKER`] || (networkName === 'WEEKLYNET' ? 'mv1TenQi9u6VPEwjb1kyXCdq5UoLKzH34ozP' : 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc'),
    knownContract: process.env[`MAVRYK_${networkName}_CONTRACT_ADDRESS`] || knownContracts.contract,
    knownBigMapContract: process.env[`MAVRYK_${networkName}_BIGMAPCONTRACT_ADDRESS`] || knownContracts.bigMapContract,
    knownTzip1216Contract: process.env[`MAVRYK_${networkName}_TZIP1216CONTRACT_ADDRESS`] || knownContracts.tzip12BigMapOffChainContract,
    knownSaplingContract: process.env[`MAVRYK_${networkName}_SAPLINGCONTRACT_ADDRESS`] || knownContracts.saplingContract,
    knownViewContract: process.env[`MAVRYK_${networkName}_ON_CHAIN_VIEW_CONTRACT`] || knownContracts.onChainViewContractAddress,
    protocol: protocol,
    signerConfig: signerConfig,
    networkType: networkType
  }
}

const boreasnetEphemeral: Config =
  defaultConfig({
    networkName: 'BOREASNET',
    protocol: Protocols.PtBoreas,
    defaultRpc: 'http://boreasnet.i.ecadinfra.com:8732/',
    knownContracts: knownContractsPtBoreas,
    signerConfig: defaultEphemeralConfig('https://keygen.ecadinfra.com/boreasnet')
  });

const boreasnetSecretKey: Config =
  { ...boreasnetEphemeral, ...{ signerConfig: defaultSecretKey }, ...{ defaultRpc: 'http://boreasnet.i.ecadinfra.com:8732/' } };

const atlasnetSecretKey: Config =
  defaultConfig({
    networkName: 'ATLASNET',
    protocol: Protocols.PtAtLas,
    defaultRpc: 'https://atlasnet.rpc.mavryk.network',
    knownContracts: knownContractsPtAtLas,
    signerConfig: defaultSecretKey
  });

const basenetEphemeral: Config =
  defaultConfig({
    networkName: 'BASENET',
    protocol: Protocols.PtAtLas,
    defaultRpc: 'https://basenet.rpc.mavryk.network',
    knownContracts: knownContractsPtBasenet,
    signerConfig: defaultEphemeralConfig('https://keygen.ecadinfra.com/ghostnet')
  });

const basenetSecretKey: Config =
  { ...basenetEphemeral, ...{ signerConfig: defaultSecretKey }, ...{ defaultRpc: 'https://basenet.rpc.mavryk.network' } };

const weeklynetEphemeral: Config =
  defaultConfig({
    networkName: 'WEEKLYNET',
    protocol: Protocols.ProtoALpha,
    defaultRpc: 'https://rpc.mavryk.network/mondaynet',
    knownContracts: knownContractsProtoALph,
    signerConfig: defaultEphemeralConfig('http://key-gen-1.i.mav.ie:3010/mondaynet')
  });

const weeklynetSecretKey: Config =
  { ...weeklynetEphemeral, ...{ signerConfig: defaultSecretKey } };

const providers: Config[] = [];

if (process.env['RUN_WITH_SECRET_KEY']) {
  providers.push(boreasnetSecretKey);
} else if (process.env['RUN_BOREASNET_WITH_SECRET_KEY']) {
  providers.push(boreasnetSecretKey);
} else if (process.env['RUN_BASENET_WITH_SECRET_KEY']) {
  providers.push(basenetSecretKey);
} else if (process.env['RUN_ATLASNET_WITH_SECRET_KEY']) {
  providers.push(atlasnetSecretKey);
} else if (process.env['RUN_WEEKLYNET_WITH_SECRET_KEY']) {
  providers.push(weeklynetSecretKey);
} else if (process.env['BOREASNET']) {
  providers.push(boreasnetEphemeral);
} else if (process.env['BASENET']) {
  providers.push(basenetEphemeral);
} else if (process.env['WEEKLYNET']) {
  providers.push(weeklynetEphemeral);
} else {
  providers.push(boreasnetEphemeral);
}

const setupForger = (Mavryk: MavrykToolkit, forger: ForgerType): void => {
  if (forger === ForgerType.LOCAL) {
    Mavryk.setProvider({ forger: Mavryk.getFactory(TaquitoLocalForger)() });
  } else if (forger === ForgerType.COMPOSITE) {
    const rpcForger = Mavryk.getFactory(RpcForger)();
    const localForger = Mavryk.getFactory(TaquitoLocalForger)()
    const composite = new CompositeForger([rpcForger, localForger]);
    Mavryk.setProvider({ forger: composite });
  } else if (forger === ForgerType.RPC) {
    Mavryk.setProvider({ forger: Mavryk.getFactory(RpcForger)() });
  }
};

const setupSignerWithFreshKey = async (
  Mavryk: MavrykToolkit,
  { keyUrl, requestHeaders }: EphemeralConfig
) => {
  const httpClient = new HttpBackend();

  try {
    const key = await httpClient.createRequest<string>({
      url: keyUrl,
      method: 'POST',
      headers: requestHeaders,
      json: false,
    });

    const signer = new InMemorySigner(key!);
    Mavryk.setSignerProvider(signer);
  } catch (e) {
    console.log('An error occurs when trying to fetch a fresh key:', e);
  }
};

const setupSignerWithEphemeralKey = async (
  Mavryk: MavrykToolkit,
  { keyUrl, requestHeaders }: EphemeralConfig
) => {
  const ephemeralUrl = `${keyUrl}/ephemeral`;
  const httpClient = new HttpBackend();

  try {
    const { id, pkh } = await httpClient.createRequest<{ id: string; pkh: string }>({
      url: ephemeralUrl,
      method: 'POST',
      headers: requestHeaders,
    });

    const signer = new RemoteSigner(pkh, `${ephemeralUrl}/${id}/`, { headers: requestHeaders });
    Mavryk.setSignerProvider(signer);
  } catch (e) {
    console.log('An error occurs when trying to fetch an ephemeral key:', e);
  }
};

const setupWithSecretKey = async (Mavryk: MavrykToolkit, signerConfig: SecretKeyConfig) => {
  Mavryk.setSignerProvider(new InMemorySigner(signerConfig.secret_key, signerConfig.password));
};

const configurePollingInterval = (Mavryk: MavrykToolkit, pollingIntervalMilliseconds: string | undefined) => {
  if (pollingIntervalMilliseconds) {
    Mavryk.setStreamProvider(Mavryk.getFactory(PollingSubscribeProvider)({ pollingIntervalMilliseconds: Number(pollingIntervalMilliseconds) }));
  }
}

const configureRpcCache = (rpc: string, rpcCacheMilliseconds: string) => {
  if (rpcCacheMilliseconds === '0') {
    return new MavrykToolkit(rpc);
  } else {
    return new MavrykToolkit(new RpcClientCache(new RpcClient(rpc), Number(rpcCacheMilliseconds)));
  }
}

export const CONFIGS = () => {
  return forgers.reduce((prev, forger: ForgerType) => {
    const configs = providers.map(
      ({
        rpc,
        pollingIntervalMilliseconds,
        rpcCacheMilliseconds,
        knownBaker,
        knownContract,
        protocol,
        knownBigMapContract,
        knownTzip1216Contract,
        knownSaplingContract,
        knownViewContract,
        signerConfig,
        networkType
      }) => {
        const Mavryk = configureRpcCache(rpc, rpcCacheMilliseconds);

        Mavryk.setProvider({ config: { confirmationPollingTimeoutSecond: 320 } });

        setupForger(Mavryk, forger);

        configurePollingInterval(Mavryk, pollingIntervalMilliseconds);

        return {
          rpc,
          rpcCacheMilliseconds,
          knownBaker,
          knownContract,
          protocol,
          lib: Mavryk,
          knownBigMapContract,
          knownTzip1216Contract,
          knownSaplingContract,
          knownViewContract,
          signerConfig,
          networkType,
          setup: async (preferFreshKey: boolean = false) => {
            if (signerConfig.type === SignerType.SECRET_KEY) {
              setupWithSecretKey(Mavryk, signerConfig);
            } else if (signerConfig.type === SignerType.EPHEMERAL_KEY) {
              if (preferFreshKey) {
                await setupSignerWithFreshKey(Mavryk, signerConfig);
              } else {
                await setupSignerWithEphemeralKey(Mavryk, signerConfig);
              }
            }
          },
          createAddress: async () => {
            const mavryk = configureRpcCache(rpc, rpcCacheMilliseconds);
            setupForger(mavryk, forger);
            configurePollingInterval(mavryk, pollingIntervalMilliseconds);

            const keyBytes = Buffer.alloc(32);
            nodeCrypto.randomFillSync(keyBytes);

            const key = b58cencode(new Uint8Array(keyBytes), prefix[Prefix.P2SK]);
            await importKey(mavryk, key);

            return mavryk;
          },
        };
      }
    );
    return [...prev, ...configs];
  }, [] as ConfigWithSetup[]);
};
