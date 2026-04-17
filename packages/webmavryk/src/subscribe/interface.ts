/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BlockResponse, InternalOperationResult, OperationEntry } from '@mavrykdynamics/webmavryk-rpc';

export type FilterExpression = {
  or?: ExpressionOrOpFilter[];
  and?: ExpressionOrOpFilter[];
};

export interface OpHashFilter {
  opHash: string;
}

export interface SourceFilter {
  source: string;
}

export interface KindFilter {
  kind: string;
}

export interface DestinationFilter {
  destination: string;
}

export interface EventFilter {
  address?: string;
  tag?: string;
  excludeFailedOperations?: boolean;
}

export interface EventSubscription extends InternalOperationResult {
  opHash: string;
  blockHash: string;
  level: number;
}

export type OpFilter = OpHashFilter | SourceFilter | KindFilter | DestinationFilter | EventFilter;

export type ExpressionOrOpFilter = OpFilter | FilterExpression;

export type Filter = ExpressionOrOpFilter | ExpressionOrOpFilter[];

export type OperationContent = OperationEntry['contents'][0] & { hash: string };

export interface SubscribeProvider {
  subscribe(filter: 'head'): Subscription<string>;
  subscribeBlock(filter: 'head'): Subscription<BlockResponse>;
  subscribeOperation(filter: Filter): Subscription<OperationContent>;
  subscribeEvent(filter?: EventFilter): Subscription<InternalOperationResult>;
}
export interface Subscription<T> {
  on(type: 'error', cb: (error: Error) => void): void;
  on(type: 'data', cb: (data: T) => void): void;
  on(type: 'close', cb: () => void): void;

  off(type: 'error', cb: (error: Error) => void): void;
  off(type: 'data', cb: (data: T) => void): void;
  off(type: 'close', cb: () => void): void;
  close(): void;
}
