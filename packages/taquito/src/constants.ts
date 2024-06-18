/**
 * @deprecated default reveal gasLimit please use getRevealGasLimit(address) instead, removing hardcoded gasLimit of delegation, origination and transfer
 */
export const DEFAULT_GAS_LIMIT = {
  DELEGATION: 10600,
  ORIGINATION: 10600,
  TRANSFER: 10600,
  REVEAL_TZ1: 1000,
  REVEAL_TZ2: 1000,
  REVEAL_TZ3: 2000,
  REVEAL_TZ4: 2000,
};
/**
 * @deprecated default reveal fee please use getRevealFee(address) instead, removing hardcoded fee of delegation, origination and transfer
 */
export const DEFAULT_FEE = {
  DELEGATION: 1257,
  ORIGINATION: 10000,
  TRANSFER: 10000,
  REVEAL: 374,
};
/**
 * @deprecated default reveal storageLimit please use REVEAL_STORAGE_LIMIT instead, removing hardcoded storageLimit of delegation, origination and transfer
 */
export const DEFAULT_STORAGE_LIMIT = {
  DELEGATION: 0,
  ORIGINATION: 257,
  TRANSFER: 257,
  REVEAL: 0,
};
// value is based on mavkit-client reveal operation gasLimit of each address type
const REVEAL_GAS_LIMIT = {
  TZ1: 169,
  TZ2: 155,
  TZ3: 445,
  TZ4: 1674,
};
// value is based on mavkit-client reveal operation fee of each address type
const REVEAL_FEE = {
  TZ1: 276,
  TZ2: 276,
  TZ3: 305,
  TZ4: 477,
};
// value is based on mavkit-client reveal operation storageLimit of all address type
export const REVEAL_STORAGE_LIMIT = 0;
// protocol constants
export const ORIGINATION_SIZE = 257;
// protocol constants
export const COST_PER_BYTE = 250;

export enum Protocols {
  PtAtLas = 'PtAtLasomUEW99aVhVTrqjCHjJSpFUa8uHNEAEamx9v2SNeTaNp',
  PtBoreas = 'PtParisBQscdCm6Cfow6ndeU6wKJyA3aV1j4D3gQBQMsTQyJCrz',
  ProtoALpha = 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
}

export const protocols = {
  '019': [Protocols.PtAtLas],
  '020': [Protocols.ProtoALpha],
};

export enum ChainIds {
  MAINNET = 'NetXdQprcVkpaWU',
  ATLASNET = 'NetXvyTAafh8goH',
  BOREASNET = 'NetXo8SqH1c38SS',
}

// A fixed fee reveal operation gasLimit accepted by both simulate and injection endpoint is between 1.2-5 times of actual gas consumption (3.5 fails occasionally with gas exhausted; 4 fails occasionally with fee too low)
export const getRevealGasLimit = (address: string) =>
  Math.round((getRevealGasLimitInternal(address) * 37) / 10);

const getRevealGasLimitInternal = (address: string) => {
  switch (address.substring(0, 3)) {
    case 'mv1':
      return REVEAL_GAS_LIMIT.TZ1;
    case 'mv2':
      return REVEAL_GAS_LIMIT.TZ2;
    case 'mv3':
      return REVEAL_GAS_LIMIT.TZ3;
    case 'mv4':
      return REVEAL_GAS_LIMIT.TZ4;
    default:
      throw new Error(`Cannot estimate reveal gas limit for ${address}`);
  }
};

export const getRevealFee = (address: string) =>
  Math.round((getRevealFeeInternal(address) * 12) / 10);

export const getRevealFeeInternal = (address: string) => {
  switch (address.substring(0, 3)) {
    case 'mv1':
      return REVEAL_FEE.TZ1;
    case 'mv2':
      return REVEAL_FEE.TZ2;
    case 'mv3':
      return REVEAL_FEE.TZ3;
    case 'mv4':
      return REVEAL_FEE.TZ4;
    default:
      throw new Error(`Cannot estimate reveal fee for ${address}`);
  }
};
