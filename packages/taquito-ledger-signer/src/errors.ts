import { ParameterValidationError, TaquitoError } from '@mavrykdynamics/taquito-core';

/**
 *  @category Error
 *  @description Error that indicates an invalid or unparseable ledger response
 */
export class InvalidLedgerResponseError extends TaquitoError {
  constructor(public readonly message: string) {
    super();
    this.name = 'InvalidLedgerResponseError';
  }
}

/**
 *  @category Error
 *  @description Error that indicates a failure when trying to retrieve a Public Key from Ledger signer
 */
export class PublicKeyRetrievalError extends TaquitoError {
  constructor(public readonly cause: any) {
    super();
    this.name = 'PublicKeyRetrievalError';
    this.message = `Unable to retrieve Public Key from Ledger`;
  }
}

/**
 *  @category Error
 *  @description Error that indicates a failure when trying to retrieve a Public Key Hash from Ledger signer
 */
export class PublicKeyHashRetrievalError extends TaquitoError {
  constructor() {
    super();
    this.name = 'PublicKeyHashRetrievalError';
    this.message = 'Unable to retrieve Public Key Hash from Ledger';
  }
}

/**
 *  @category Error
 *  @description Error that indicates an invalid derivation type being passed or used
 */
export class InvalidDerivationTypeError extends ParameterValidationError {
  constructor(public readonly derivationType: string) {
    super();
    this.name = 'InvalidDerivationTypeError';
    this.message = `Invalid derivation type ${derivationType} expecting one of the following: DerivationType.ED25519, DerivationType.SECP256K1, DerivationType.P256 or DerivationType.BIP32_ED25519`;
  }
}
