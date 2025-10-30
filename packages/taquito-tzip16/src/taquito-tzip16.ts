/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/**
 * @packageDocumentation
 * @module @mavrykdynamics/taquito-tzip16
 */
export * from './handlers/http-handler';
export * from './handlers/mavryk-storage-handler';
export * from './handlers/ipfs-handler';
export * from './composer';
export * from './metadata-interface';
export * from './metadata-provider';
export * from './tzip16-contract-abstraction';
export * from './errors';
export * from './tzip16-extension';
export * from './tzip16-utils';
export * from './viewKind/interface';
export * from './viewKind/michelson-storage-view';
export * from './viewKind/viewFactory';
export { VERSION } from './version';

/**
 * @deprecated `import { bytesToString, stringToBytes } from "@mavrykdynamics/taquito-tzip16"` is deprecated in favor of
 * `import { bytesToString, stringToBytes } from "@mavrykdynamics/taquito-utils"`
 *
 */
export { bytesToString, stringToBytes } from '@mavrykdynamics/taquito-utils';
