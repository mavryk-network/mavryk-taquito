/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import {
  OperationContentsAndResult,
  OperationContentsAndResultProposals,
  OperationContentsProposals,
} from '@mavrykdynamics/webmavryk-rpc';
import { Context } from '../context';
import { Operation } from './operations';
import { ForgedBytes } from './types';

/**
 *
 * @description ProposalsOperation provides utility functions to fetch a new operation of kind proposals
 *
 */
export class ProposalsOperation extends Operation {
  constructor(
    hash: string,
    private readonly params: OperationContentsProposals,
    public readonly source: string,
    raw: ForgedBytes,
    results: OperationContentsAndResult[],
    context: Context
  ) {
    super(hash, raw, results, context);
  }

  get operationResults() {
    const proposalsOp =
      Array.isArray(this.results) &&
      (this.results.find((op) => op.kind === 'proposals') as OperationContentsAndResultProposals);
    const result = proposalsOp;

    return result ? result : undefined;
  }

  get proposals() {
    return this.params.proposals;
  }

  get period() {
    return this.operationResults?.period;
  }
}
