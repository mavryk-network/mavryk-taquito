/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/**
 * @packageDocumentation
 * @module @mavrykdynamics/taquito-michelson-encoder
 */

export * from './schema/storage';
export * from './schema/parameter';
export * from './schema/view-schema';
export * from './schema/event-schema';
export * from './schema/errors';
export * from './schema/types';
export { Semantic, SemanticEncoding, BigMapKeyType } from './tokens/token';
export * from './errors';

export const UnitValue = Symbol();
export const SaplingStateValue = {};
export * from './michelson-map';
export { VERSION } from './version';
export { FieldNumberingStrategy, Token } from './tokens/token';
