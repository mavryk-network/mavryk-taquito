import { NetworkType } from "@mavrykdynamics/beacon-types";

export type SupportedNetworks = NetworkType.BOREASNET | NetworkType.ATLASNET | NetworkType.BASENET | NetworkType.MAINNET | NetworkType.CUSTOM;

const rpcUrls: Record<SupportedNetworks, string> = {
  [NetworkType.MAINNET]: "https://mainnet.rpc.mavryk.network",
  [NetworkType.BASENET]: "https://basenet.rpc.mavryk.network",
  [NetworkType.ATLASNET]: "https://atlasnet.rpc.mavryk.network",
  [NetworkType.BOREASNET]: "https://rpc.boreasnet.teztnets.com/",
  [NetworkType.CUSTOM]: "https://basenet.rpc.mavryk.network",
};

export const getRpcUrl = (networkType: SupportedNetworks): string => {
  return rpcUrls[networkType];
}

export const getMvKtUrl = (networkType: SupportedNetworks): string | undefined => {
  switch (networkType) {
    case NetworkType.MAINNET:
      return "https://api.mavryk.network";
    case NetworkType.BASENET:
      return "https://basenet.api.mavryk.network";
    case NetworkType.ATLASNET:
      return "https://atlasnet.api.mavryk.network";
      case NetworkType.BOREASNET:
        return "https://boreasnet.tzkt.io";
    case NetworkType.CUSTOM:
      return undefined;
  }
}

export const defaultMatrixNode = "beacon-node-1.sky.papers.tech";

export const defaultNetworkType = NetworkType.BASENET;

// new protocol updated rpc url in example/data/test-dapp-contract.ts and npm -w example run example:deploy-dapp
export const contractAddress = {
  mainnet: "KT1ShtH2zCrKMuWGRejEd6RAcnePwxBQeMAN",
  basenet: "KT1QKmcNBcfzVTXG2kBcE6XqXtEuYYUzMcT5",
  atlasnet: "KT1GYx1KDhMQt2GJEztRh8EyYxJUPM6fnAMM",
  boreasnet: "KT1LBQmSDGsRj4LFa2bsCsZLkGCtmRFVVcPh",
};
