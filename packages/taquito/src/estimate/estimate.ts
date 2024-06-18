const MINIMAL_FEE_MUMAV = 100;
const MINIMAL_FEE_PER_BYTE_MUMAV = 1;
const MINIMAL_FEE_PER_GAS_MUMAV = 0.1;

export interface EstimateProperties {
  milligasLimit: number;
  storageLimit: number;
  opSize: number;
  minimalFeePerStorageByteMumav: number;
  baseFeeMumav?: number;
}

/**
 * Examples of use :
 *
 *  Estimate a transfer operation :
 * ```
 * // Assuming that provider and signer are already configured...
 *
 * const amount = 2;
 * const address = 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc';
 *
 * // Estimate gasLimit, storageLimit and fees for a transfer operation
 * const est = await Mavryk.estimate.transfer({ to: address, amount: amount })
 * console.log(est.burnFeeMumav, est.gasLimit, est.minimalFeeMumav, est.storageLimit,
 *  est.suggestedFeeMumav, est.totalCost, est.usingBaseFeeMumav)
 *
 * ```
 *
 * Estimate a contract origination :
 * ```
 * // generic.json is referring to a Michelson Smart Contract
 *
 * const genericMultisigJSON = require('./generic.json')
 * const est = await Mavryk.estimate.originate({
 *   code: genericMultisigJSON,
 *   storage: {
 *     stored_counter: 0,
 *     threshold: 1,
 *     keys: ['edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t']
 *   }
 * })
 * console.log(est.burnFeeMumav, est.gasLimit, est.minimalFeeMumav, est.storageLimit,
 *   est.suggestedFeeMumav, est.totalCost, est.usingBaseFeeMumav)
 *
 * ```
 */

export class Estimate {
  constructor(
    private readonly _milligasLimit: number | string,
    private readonly _storageLimit: number | string,
    public readonly opSize: number | string,
    private readonly minimalFeePerStorageByteMumav: number | string,
    /**
     * @description Base fee in mumav (1 mumav = 1e10−6 mav)
     */
    private readonly baseFeeMumav: number | string = MINIMAL_FEE_MUMAV
  ) {}

  /**
   * @description The number of Mumav that will be burned for the storage of the [operation](https://protocol.mavryk.org/user/glossary.html#operations). (Storage + Allocation fees)
   */
  get burnFeeMumav() {
    return this.roundUp(Number(this.storageLimit) * Number(this.minimalFeePerStorageByteMumav));
  }

  /**
   * @description  The limit on the amount of storage an [operation](https://protocol.mavryk.org/user/glossary.html#operations) can use with 20 buffer.
   */
  get storageLimit() {
    return Math.max(Number(this._storageLimit), 0);
  }

  /**
   * @description The limit on the amount of [gas](https://protocol.mavryk.org/user/glossary.html#gas) a given operation can consume with 100 buffer depends on the operation.
   */
  get gasLimit() {
    return this.roundUp(Number(this._milligasLimit) / 1000);
  }

  private get operationFeeMumav() {
    return (
      this.gasLimit * MINIMAL_FEE_PER_GAS_MUMAV + Number(this.opSize) * MINIMAL_FEE_PER_BYTE_MUMAV
    );
  }

  private roundUp(nanomav: number) {
    return Math.ceil(Number(nanomav));
  }

  /**
   * @description Minimum fees for the [operation](https://protocol.mavryk.org/user/glossary.html#operations) according to [baker](https://protocol.mavryk.org/user/glossary.html#baker) defaults.
   */
  get minimalFeeMumav() {
    return this.roundUp(this.operationFeeMumav + MINIMAL_FEE_MUMAV);
  }

  /**
   * @description The suggested fee for the operation which includes minimal fees and a small buffer.
   */
  get suggestedFeeMumav() {
    return this.roundUp(this.operationFeeMumav + MINIMAL_FEE_MUMAV * 1.2);
  }

  /**
   * @description Fees according to your specified base fee will ensure that at least minimum fees are used.
   */
  get usingBaseFeeMumav() {
    return (
      Math.max(Number(this.baseFeeMumav), MINIMAL_FEE_MUMAV) + this.roundUp(this.operationFeeMumav)
    );
  }

  /**
   * @description The sum of `minimalFeeMumav` + `burnFeeMumav`.
   */
  get totalCost() {
    return this.minimalFeeMumav + this.burnFeeMumav;
  }

  /**
   * @description Since Delphinet, consumed gas is provided in milligas for more precision.
   * This function returns an estimation of the gas that operation will consume in milligas.
   */
  get consumedMilligas() {
    return Number(this._milligasLimit);
  }

  static createEstimateInstanceFromProperties(estimateProperties: EstimateProperties[]) {
    let milligasLimit = 0;
    let storageLimit = 0;
    let opSize = 0;
    let minimalFeePerStorageByteMumav = 0;
    let baseFeeMumav: number | undefined;

    estimateProperties.forEach((estimate) => {
      milligasLimit += estimate.milligasLimit;
      storageLimit += estimate.storageLimit;
      opSize += estimate.opSize;
      minimalFeePerStorageByteMumav = Math.max(
        estimate.minimalFeePerStorageByteMumav,
        minimalFeePerStorageByteMumav
      );
      if (estimate.baseFeeMumav) {
        baseFeeMumav = baseFeeMumav ? baseFeeMumav + estimate.baseFeeMumav : estimate.baseFeeMumav;
      }
    });
    return new Estimate(
      milligasLimit,
      storageLimit,
      opSize,
      minimalFeePerStorageByteMumav,
      baseFeeMumav
    );
  }

  static createArrayEstimateInstancesFromProperties(estimateProperties: EstimateProperties[]) {
    return estimateProperties.map(
      (x) =>
        new Estimate(
          x.milligasLimit,
          x.storageLimit,
          x.opSize,
          x.minimalFeePerStorageByteMumav,
          x.baseFeeMumav
        )
    );
  }
}
