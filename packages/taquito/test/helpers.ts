import {
  OperationContentsAndResultTransaction,
  OpKind,
  OperationResultStatusEnum,
  OperationContentsAndResultReveal,
  OperationContentsAndResultOrigination,
  OperationContentsAndResultDelegation,
  OperationContentsAndResultRegisterGlobalConstant,
  OperationContentsAndResultTransferTicket,
  OperationContentsAndResultIncreasePaidStorage,
  OperationContentsAndResultUpdateConsensusKey,
} from '@mavrykdynamics/taquito-rpc';
import { PreparedOperation } from '../src/prepare';

const defaultTransferData = {
  kind: OpKind.TRANSACTION as OpKind.TRANSACTION,
  source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
  fee: '2991',
  counter: '121619',
  gas_limit: '26260',
  storage_limit: '257',
  amount: '0',
  destination: 'KT1AiWmfuCGSttuMBKbDUqZG6SzKQNrySFei',
};

const defaultDelegationData = {
  kind: OpKind.DELEGATION as OpKind.DELEGATION,
  source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
  fee: '2991',
  counter: '121619',
  gas_limit: '26260',
  storage_limit: '257',
  delegate: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
};

const defaultRevealData = {
  kind: OpKind.REVEAL as OpKind.REVEAL,
  source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
  fee: '2991',
  counter: '121619',
  gas_limit: '26260',
  storage_limit: '257',
  public_key: 'p2pk',
};

const defaultOrigininateData = {
  kind: OpKind.ORIGINATION as OpKind.ORIGINATION,
  source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
  fee: '30000',
  counter: '1121110',
  gas_limit: '90000',
  storage_limit: '2000',
  balance: '1000000',
  script: {
    code: [],
    storage: {},
  },
};

const defaultRegisterGlobalConstantData = {
  kind: OpKind.REGISTER_GLOBAL_CONSTANT as OpKind.REGISTER_GLOBAL_CONSTANT,
  source: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
  fee: '2991',
  counter: '121619',
  gas_limit: '26260',
  storage_limit: '257',
  value: { int: '0' },
};

const defaultTransferTicketData = {
  kind: OpKind.TRANSFER_TICKET as OpKind.TRANSFER_TICKET,
  source: 'mv1KEw8vxBCtfdHfnc1BbGkCNArmRuF1oHjw',
  fee: '804',
  gas_limit: '5009',
  storage_limit: '130',
  counter: '145',
  ticket_contents: { string: 'foobar' },
  ticket_ty: { prim: 'string' },
  ticket_ticketer: 'KT1AL8we1Bfajn2M7i3gQM5PJEuyD36sXaYb',
  ticket_amount: '2',
  destination: 'KT1SUT2TBFPCknkBxLqM5eJZKoYVY6mB26Fg',
  entrypoint: 'default',
};

const defaultIncreasePaidStorageData = {
  kind: OpKind.INCREASE_PAID_STORAGE as OpKind.INCREASE_PAID_STORAGE,
  source: 'mv2Sg8RFaNDiaHG6G3nsQevPxnheyNLBeLG2',
  fee: '349',
  counter: '108123',
  gas_limit: '1000',
  storage_limit: '0',
  amount: '2',
  destination: 'KT1Vjr5PFC2Qm5XbSQZ8MdFZLgYMzwG5WZNh',
};

const defaultUpdateConsensusKeyData = {
  kind: OpKind.UPDATE_CONSENSUS_KEY as OpKind.UPDATE_CONSENSUS_KEY,
  source: 'mv19ubyfoCo7zAbPxSQiFSAxPpWyq82Aeimr',
  fee: '369',
  counter: '19043',
  gas_limit: '1100',
  storage_limit: '0',
  pk: 'edpkti5K5JbdLpp2dCqiTLoLQqs5wqzeVhfHVnNhsSCuoU8zdHYoY7',
};

const defaultResult = {
  status: 'applied' as OperationResultStatusEnum,
  consumed_milligas: '15952999',
};

export class TransferOperationBuilder {
  private result: OperationContentsAndResultTransaction['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultTransaction, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultTransaction, 'metadata'>> = {}
  ) {
    this.data = { ...defaultTransferData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultTransaction['metadata']['operation_result']>
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultTransaction {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class DelegationOperationBuilder {
  private result: OperationContentsAndResultDelegation['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultDelegation, 'metadata'>;

  constructor(private _data: Partial<Omit<OperationContentsAndResultDelegation, 'metadata'>> = {}) {
    this.data = { ...defaultDelegationData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultDelegation['metadata']['operation_result']>
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultDelegation {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}
export class OriginationOperationBuilder {
  private result: OperationContentsAndResultOrigination['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultOrigination, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultOrigination, 'metadata'>> = {}
  ) {
    this.data = { ...defaultOrigininateData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultOrigination['metadata']['operation_result']>
  ) {
    this.result = {
      ...defaultResult,
      ...result,
      originated_contracts: ['KT1UvU4PamD38HYWwG4UjgTKU2nHJ42DqVhX'],
      storage_size: '62',
    };
    return this;
  }

  build(): OperationContentsAndResultOrigination {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class RevealOperationBuilder {
  private result: OperationContentsAndResultReveal['metadata']['operation_result'] = defaultResult;
  private data: Omit<OperationContentsAndResultReveal, 'metadata'>;

  constructor(private _data: Partial<Omit<OperationContentsAndResultReveal, 'metadata'>> = {}) {
    this.data = { ...defaultRevealData, ...this._data };
  }

  withResult(result: Partial<OperationContentsAndResultReveal['metadata']['operation_result']>) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultReveal {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class RegisterGlobalConstantOperationBuilder {
  private result: OperationContentsAndResultRegisterGlobalConstant['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultRegisterGlobalConstant, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultRegisterGlobalConstant, 'metadata'>> = {}
  ) {
    this.data = { ...defaultRegisterGlobalConstantData, ...this._data };
  }

  withResult(
    result: Partial<
      OperationContentsAndResultRegisterGlobalConstant['metadata']['operation_result']
    >
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultRegisterGlobalConstant {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class IncreasePaidStorageOperationBuilder {
  private result: OperationContentsAndResultIncreasePaidStorage['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultIncreasePaidStorage, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultIncreasePaidStorage, 'metadata'>> = {}
  ) {
    this.data = { ...defaultIncreasePaidStorageData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultIncreasePaidStorage['metadata']['operation_result']>
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultIncreasePaidStorage {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class UpdateConsensusKeyOperationBuilder {
  private result: OperationContentsAndResultUpdateConsensusKey['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultUpdateConsensusKey, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultUpdateConsensusKey, 'metadata'>> = {}
  ) {
    this.data = { ...defaultUpdateConsensusKeyData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultUpdateConsensusKey['metadata']['operation_result']>
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultUpdateConsensusKey {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export class TransferTicketOperationBuilder {
  private result: OperationContentsAndResultTransferTicket['metadata']['operation_result'] =
    defaultResult;
  private data: Omit<OperationContentsAndResultTransferTicket, 'metadata'>;

  constructor(
    private _data: Partial<Omit<OperationContentsAndResultTransferTicket, 'metadata'>> = {}
  ) {
    this.data = { ...defaultTransferTicketData, ...this._data };
  }

  withResult(
    result: Partial<OperationContentsAndResultTransferTicket['metadata']['operation_result']>
  ) {
    this.result = { ...defaultResult, ...result };
    return this;
  }

  build(): OperationContentsAndResultTransferTicket {
    return {
      ...this.data,
      metadata: {
        balance_updates: [],
        operation_result: this.result,
      },
    };
  }
}

export const ticketTokenTestMock = {
  balance: '0',
  script: {
    code: [
      {
        prim: 'parameter',
        args: [
          {
            prim: 'pair',
            args: [
              {
                prim: 'ticket',
                args: [
                  {
                    prim: 'bytes',
                  },
                ],
              },
              {
                prim: 'address',
              },
            ],
          },
        ],
      },
      {
        prim: 'storage',
        args: [
          {
            prim: 'map',
            args: [
              {
                prim: 'address',
              },
              {
                prim: 'ticket',
                args: [
                  {
                    prim: 'bytes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        prim: 'code',
        args: [
          [
            {
              prim: 'UNPAIR',
            },
            {
              prim: 'UNPAIR',
            },
            {
              prim: 'READ_TICKET',
            },
            {
              prim: 'DROP',
            },
            {
              prim: 'DIG',
              args: [
                {
                  int: '2',
                },
              ],
            },
            {
              prim: 'SWAP',
            },
            {
              prim: 'SOME',
            },
            {
              prim: 'DIG',
              args: [
                {
                  int: '2',
                },
              ],
            },
            {
              prim: 'UPDATE',
            },
            {
              prim: 'NIL',
              args: [
                {
                  prim: 'operation',
                },
              ],
            },
            {
              prim: 'PAIR',
            },
          ],
        ],
      },
    ],
    storage: [
      {
        prim: 'Elt',
        args: [
          {
            string: 'mv1Ga4Zsxmmc3eP2PeJQMiZhgWQj43eeJBsE',
          },
          {
            prim: 'Pair',
            args: [
              {
                string: 'KT19mzgsjrR2Er4rm4vuDqAcMfBF5DBMs2uq',
              },
              {
                bytes: '0505080a0000001601f37d4eddfff4e08fb1f19895ac9c83bc12d2b36800',
              },
              {
                int: '2',
              },
            ],
          },
        ],
      },
      {
        prim: 'Elt',
        args: [
          {
            string: 'mv1BpELbJnJoGdbs8Yb9PDmJC9HpVNnSUmY2',
          },
          {
            prim: 'Pair',
            args: [
              {
                string: 'KT19mzgsjrR2Er4rm4vuDqAcMfBF5DBMs2uq',
              },
              {
                bytes: '0505080a0000001601f37d4eddfff4e08fb1f19895ac9c83bc12d2b36800',
              },
              {
                int: '10000',
              },
            ],
          },
        ],
      },
      {
        prim: 'Elt',
        args: [
          {
            string: 'mv1VfEYVXSTwXgB5EQXE5q4EwB4R89GBqT4N',
          },
          {
            prim: 'Pair',
            args: [
              {
                string: 'KT19mzgsjrR2Er4rm4vuDqAcMfBF5DBMs2uq',
              },
              {
                bytes: '050505030b',
              },
              {
                int: '1000000',
              },
            ],
          },
        ],
      },
    ],
  },
};

export const smallNestedMapTypecheck = {
  address: '',
  script: {
    code: [
      {
        prim: 'parameter',
        args: [
          {
            prim: 'unit',
          },
        ],
      },
      {
        prim: 'storage',
        args: [
          {
            prim: 'map',
            args: [
              {
                prim: 'string',
              },
              {
                prim: 'map',
                args: [
                  {
                    prim: 'string',
                  },
                  {
                    prim: 'big_map',
                    args: [
                      {
                        prim: 'nat',
                      },
                      {
                        prim: 'nat',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        prim: 'code',
        args: [
          [
            [
              {
                prim: 'UNIT',
              },
              {
                prim: 'FAILWITH',
              },
            ],
          ],
        ],
      },
    ],
    storage: [
      {
        prim: 'Elt',
        args: [
          {
            string: 'test',
          },
          [
            {
              prim: 'Elt',
              args: [
                {
                  string: 'test 2',
                },
                {
                  int: '143106',
                },
              ],
            },
          ],
        ],
      },
    ],
  },
};

export const preparedTransactionMock = {
  opOb: {
    branch: 'BKvS9KTjoC5NNbu1P9Z7rUud4cF2Pr2cnKox1RduhCzGy8J53a3',
    contents: [
      {
        kind: 'transaction',
        fee: '465',
        gas_limit: '1101',
        storage_limit: '257',
        amount: '1000000',
        destination: 'mv3FkAzvLSQDQ22m5GzPHQZ1P4o13Q1uS91W',
        source: 'mv2MsKsSRvxRRzZupQJUujoRUFVZxRAJP7Fp',
        counter: '31552',
      },
    ],
    protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
  },
} as PreparedOperation;
