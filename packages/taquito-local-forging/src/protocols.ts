/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

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
