import { ParameterValidationError, RpcError, TaquitoError } from '@mavrykdynamics/taquito-core';
import {
  MichelsonV1ExpressionBase,
  OperationContentsAndResult,
  OperationResult,
  OperationResultDelegation,
  OperationResultOrigination,
  OperationResultRegisterGlobalConstant,
  OperationResultReveal,
  OperationResultSmartRollupOriginate,
  OperationResultTransaction,
  OperationResultTransferTicket,
  PreapplyResponse,
  MavrykGenericOperationError,
} from '@mavrykdynamics/taquito-rpc';
import {
  hasMetadata,
  hasMetadataWithInternalOperationResult,
  hasMetadataWithResult,
} from './types';

export interface MavrykOperationErrorWithMessage extends MavrykGenericOperationError {
  with: MichelsonV1ExpressionBase;
}

const isErrorWithMessage = (error: any): error is MavrykOperationErrorWithMessage => {
  return 'with' in error;
};

/**
 *  @category Error
 *  @description Generic mavryk error that will be thrown when a mistake occurs when doing an operation; more details here https://protocol.mavryk.org/api/errors.html
 */
export class MavrykOperationError extends RpcError {
  public readonly lastError: MavrykGenericOperationError;

  constructor(
    public readonly errors: MavrykGenericOperationError[],
    public readonly errorDetails: string,
    public readonly operationsWithResults: OperationContentsAndResult[]
  ) {
    super();
    this.name = 'MavrykOperationError';
    // Last error is 'often' the one with more detail
    this.lastError = errors[errors.length - 1];

    this.message = `(${this.kind}) ${this.id}`;

    if (isErrorWithMessage(this.lastError)) {
      if (this.lastError.with.string) {
        this.message = this.lastError.with.string;
      } else if (this.lastError.with.int) {
        this.message = this.lastError.with.int;
      } else {
        this.message = JSON.stringify(this.lastError.with);
      }
    }
  }

  get id(): string {
    return this.lastError.id;
  }
  get kind(): string {
    return this.lastError.kind;
  }
}

/**
 *  @category Error
 *  @description Mavryk error that will be thrown when a mistake happens during the preapply stage
 */
export class MavrykPreapplyFailureError extends Error {
  constructor(public readonly result: any) {
    super();
    this.name = 'MavrykPreapplyFailureError';
    this.message = 'Preapply returned an unexpected result';
  }
}

export type MergedOperationResult = OperationResultTransaction &
  OperationResultOrigination &
  OperationResultDelegation &
  OperationResultRegisterGlobalConstant &
  OperationResultTransferTicket &
  Partial<OperationResultSmartRollupOriginate> &
  OperationResultReveal & {
    fee?: string;
  };

// Flatten all operation content results and internal operation results into a single array
// Some cases where we can have multiple operation results or internal operation results are:
// - When an operation includes a reveal operation
// - When an operation is made using the batch API
// - Smart contract call can contains internal operation results when they call other smart contract internally or originate contracts
export const flattenOperationResult = (response: PreapplyResponse | PreapplyResponse[]) => {
  const results = Array.isArray(response) ? response : [response];

  const returnedResults: MergedOperationResult[] = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].contents.length; j++) {
      const content = results[i].contents[j];
      if (hasMetadataWithResult(content) && 'fee' in content) {
        returnedResults.push({
          fee: content.fee,
          ...content.metadata.operation_result,
        });

        if (Array.isArray(content.metadata.internal_operation_results)) {
          content.metadata.internal_operation_results.forEach((x) =>
            returnedResults.push(x.result)
          );
        }
      }
    }
  }

  return returnedResults;
};

/***
 * @description Flatten all error from preapply response (including internal error)
 */
export const flattenErrors = (
  response: PreapplyResponse | PreapplyResponse[],
  status = 'failed'
) => {
  const results = Array.isArray(response) ? response : [response];

  let errors: MavrykGenericOperationError[] = [];
  // Transaction that do not fail will be backtracked in case one failure occur
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].contents.length; j++) {
      const content = results[i].contents[j];
      if (hasMetadata(content)) {
        if (
          hasMetadataWithResult(content) &&
          (content.metadata.operation_result as OperationResult).status === status
        ) {
          errors = errors.concat(
            (content.metadata.operation_result as OperationResult).errors || []
          );
        }
        if (
          hasMetadataWithInternalOperationResult(content) &&
          Array.isArray(content.metadata.internal_operation_results)
        ) {
          for (const internalResult of content.metadata.internal_operation_results) {
            if ('result' in internalResult && internalResult.result.status === status) {
              errors = errors.concat(internalResult.result.errors || []);
            }
          }
        }
      }
    }
  }

  return errors;
};

/**
 *  @category Error
 *  @description Error that indicates a general failure happening during an origination operation.
 */
export class OriginationOperationError extends TaquitoError {
  constructor(public readonly message: string) {
    super();
    this.name = 'OriginationOperationError';
  }
}

/**
 *  @category Error
 *  @description Error that indicates an invalid estimate value being passed
 */
export class InvalidEstimateValueError extends ParameterValidationError {
  constructor(public readonly message: string) {
    super();
    this.name = 'InvalidEstimateValueError';
  }
}
