export enum ProtocolsHash {
  PtAtLas = 'PtAtLasomUEW99aVhVTrqjCHjJSpFUa8uHNEAEamx9v2SNeTaNp',
  PtBoreas = 'PtParisBQscdCm6Cfow6ndeU6wKJyA3aV1j4D3gQBQMsTQyJCrz',
  ProtoALpha = 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
}

const protoLevel: Record<ProtocolsHash, number> = {
  PtAtLasomUEW99aVhVTrqjCHjJSpFUa8uHNEAEamx9v2SNeTaNp: 19,
  PtParisBQscdCm6Cfow6ndeU6wKJyA3aV1j4D3gQBQMsTQyJCrz: 20,
  ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK: 21,
};

export function ProtoInferiorTo(a: ProtocolsHash, b: ProtocolsHash): boolean {
  return protoLevel[a] < protoLevel[b];
}
