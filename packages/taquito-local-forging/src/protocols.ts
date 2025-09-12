export enum ProtocolsHash {
  PtAtLas = 'PtAtLasdzXg4XxeVNtWheo13nG4wHXP22qYMqFcT3fyBpWkFero',
  PtBoreas = 'PtBoreasK2KPuKbeYtXeEdudEHS7YcMFHE9amwheUc4kejTxgRi',
  ProtoALpha = 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
}

const protoLevel: Record<ProtocolsHash, number> = {
  PtAtLasdzXg4XxeVNtWheo13nG4wHXP22qYMqFcT3fyBpWkFero: 19,
  PtBoreasK2KPuKbeYtXeEdudEHS7YcMFHE9amwheUc4kejTxgRi: 20,
  ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK: 21,
};

export function ProtoInferiorTo(a: ProtocolsHash, b: ProtocolsHash): boolean {
  return protoLevel[a] < protoLevel[b];
}
