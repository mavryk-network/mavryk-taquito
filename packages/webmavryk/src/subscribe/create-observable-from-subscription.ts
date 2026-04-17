/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BlockResponse } from '@mavrykdynamics/webmavryk-rpc';
import { Observable } from 'rxjs';
import { OperationContent, Subscription } from './interface';

export function createObservableFromSubscription<
  T extends BlockResponse | string | OperationContent
>(sub: Subscription<T>) {
  return new Observable<T>((subscriber) => {
    sub.on('data', (data: T) => {
      subscriber.next(data);
    });

    sub.on('error', (error: Error) => {
      subscriber.error(error);
    });

    sub.on('close', () => {
      subscriber.complete();
    });

    return () => {
      sub.close();
    };
  });
}
