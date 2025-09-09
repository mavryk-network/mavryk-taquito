export enum ProtocolsHash {
  PtAtLas = 'PtAtLasdzXg4XxeVNtWheo13nG4wHXP22qYMqFcT3fyBpWkFero',
  PtBoreas = 'PtBzwViMCC1gfm98y5TDKqz2e3vjBXPAUoWu7jfEcN6yj2ZhCyT',
  ProtoALpha = 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
}

const protoLevel: Record<ProtocolsHash, number> = {
  PtAtLasdzXg4XxeVNtWheo13nG4wHXP22qYMqFcT3fyBpWkFero: 19,
  PtBzwViMCC1gfm98y5TDKqz2e3vjBXPAUoWu7jfEcN6yj2ZhCyT: 20,
  ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK: 21,
};

export function ProtoInferiorTo(a: ProtocolsHash, b: ProtocolsHash): boolean {
  return protoLevel[a] < protoLevel[b];
}
