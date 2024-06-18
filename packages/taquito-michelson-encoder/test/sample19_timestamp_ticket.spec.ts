import BigNumber from 'bignumber.js';
import { bigMapValue, rpcContractResponse, storage } from '../data/sample19_timestamp_ticket';
import { Schema } from '../src/schema/storage';
import { expectMichelsonMap } from './utils';

describe('Schema with a ticket of type timestamp inside a big map %tickets in storage', () => {
  // key of the big map is address and value is ticket of type timestamp
  it('Should decode storage properly', () => {
    const schema = new Schema(storage);
    expect(schema.Execute(rpcContractResponse.script.storage)).toEqual({
      data: {
        winners: '24059',
        bets: expectMichelsonMap(),
        current_pot: new BigNumber('0'),
        opened_at: '2019-09-09T12:09:37.000Z',
        settings: {
          pool_type: 'MVRK-USD',
          entrance_fee: new BigNumber('2'),
          minimum_bet: new BigNumber('2'),
          open_period: new BigNumber('86400'),
          validation_delay: new BigNumber('86400'),
          ticket_validity: new BigNumber('2592000'),
          max_capacity: new BigNumber(9),
        },
        validator: null,
        pending_validation: false,
        oracle: 'mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv',
        admin: 'mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv',
      },
      tickets: '24060',
    });
  });

  it('Should extract schema properly', () => {
    const schema = new Schema(storage);
    expect(schema.ExtractSchema()).toEqual({
      data: {
        winners: {
          big_map: {
            key: 'address',
            value: 'mumav',
          },
        },
        bets: {
          map: {
            key: 'address',
            value: 'nat',
          },
        },
        current_pot: 'mumav',
        opened_at: 'timestamp',
        settings: {
          pool_type: 'string',
          entrance_fee: 'mumav',
          minimum_bet: 'mumav',
          open_period: 'int',
          validation_delay: 'int',
          ticket_validity: 'int',
          max_capacity: 'nat',
        },
        validator: { Some: 'address' },
        pending_validation: 'bool',
        oracle: 'address',
        admin: 'address',
      },
      tickets: {
        big_map: {
          key: 'address',
          value: {
            amount: 'int',
            ticketer: 'contract',
            value: 'timestamp',
          },
        },
      },
    });

    expect(schema.generateSchema()).toEqual({
      __michelsonType: 'pair',
      schema: {
        data: {
          __michelsonType: 'pair',
          schema: {
            winners: {
              __michelsonType: 'big_map',
              schema: {
                key: {
                  __michelsonType: 'address',
                  schema: 'address',
                },
                value: {
                  __michelsonType: 'mumav',
                  schema: 'mumav',
                },
              },
            },
            bets: {
              __michelsonType: 'map',
              schema: {
                key: {
                  __michelsonType: 'address',
                  schema: 'address',
                },
                value: {
                  __michelsonType: 'nat',
                  schema: 'nat',
                },
              },
            },
            current_pot: {
              __michelsonType: 'mumav',
              schema: 'mumav',
            },
            opened_at: {
              __michelsonType: 'timestamp',
              schema: 'timestamp',
            },
            settings: {
              __michelsonType: 'pair',
              schema: {
                pool_type: {
                  __michelsonType: 'string',
                  schema: 'string',
                },
                entrance_fee: {
                  __michelsonType: 'mumav',
                  schema: 'mumav',
                },
                minimum_bet: {
                  __michelsonType: 'mumav',
                  schema: 'mumav',
                },
                open_period: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                validation_delay: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                ticket_validity: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                max_capacity: {
                  __michelsonType: 'nat',
                  schema: 'nat',
                },
              },
            },
            validator: {
              __michelsonType: 'option',
              schema: {
                __michelsonType: 'address',
                schema: 'address',
              },
            },
            pending_validation: {
              __michelsonType: 'bool',
              schema: 'bool',
            },
            oracle: {
              __michelsonType: 'address',
              schema: 'address',
            },
            admin: {
              __michelsonType: 'address',
              schema: 'address',
            },
          },
        },
        tickets: {
          __michelsonType: 'big_map',
          schema: {
            key: {
              __michelsonType: 'address',
              schema: 'address',
            },
            value: {
              __michelsonType: 'ticket',
              schema: {
                amount: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                ticketer: {
                  __michelsonType: 'contract',
                  schema: 'contract',
                },
                value: {
                  __michelsonType: 'timestamp',
                  schema: 'timestamp',
                },
              },
            },
          },
        },
      },
    });
  });

  it('Should parse big map value properly', () => {
    const schema = new Schema({
      prim: 'big_map',
      args: [{ prim: 'address' }, { prim: 'ticket', args: [{ prim: 'timestamp' }] }],
      annots: ['%tickets'],
    });
    const value = schema.ExecuteOnBigMapValue(bigMapValue);
    expect(value).toEqual({
      ticketer: 'KT1PVuv7af4VkPsZVZ8oZz9GSSdGnGBCbFWw',
      value: '2021-03-09T16:32:15.000Z',
      amount: new BigNumber('2'),
    });
  });
});
