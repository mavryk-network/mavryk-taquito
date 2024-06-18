import BigNumber from 'bignumber.js';

export const rpcUrl = 'rpcTest';
export const blockResponse = {
  protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
  chain_id: 'NetXz969SFaFn8k',
  hash: 'BMUMMDZRvvTfLrpmtYMUtYgk498WssaSfNnpkWwEiL7GNTwUYus',
  header: {
    level: 536085,
    proto: 2,
    predecessor: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
    timestamp: '2021-10-04T18:11:32Z',
    validation_pass: 4,
    operations_hash: 'LLoZRH5DQMZiuE5eZ588fFC9JkL7qN8QjMdTUWQAHcAut2BmoUGZM',
    fitness: ['01', '0000000000082e14'],
    context: 'CoWCv7EjSWa6naU4fonnAcSSDDRjq9ddgdC13nuBdfR5x9xnR1sR',
    priority: 0,
    proof_of_work_nonce: 'bc2cc86f726c0000',
    liquidity_baking_escape_vote: false,
    signature:
      'sigPoYZryqKDksRqXpfby9eDfx6SbaLAq2vwLVnWJNrv73JrfAwAgiM1mCZrR7UaqEwvuR48QRJfj2FW6dCFAPynmJbgjysg',
  },
  metadata: {
    protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
    next_protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
    test_chain_status: { status: 'not_running' },
    max_operations_ttl: 120,
    max_operation_data_length: 32768,
    max_block_header_length: 239,
    max_operation_list_length: [
      { max_size: 4194304, max_op: 2048 },
      { max_size: 32768 },
      { max_size: 135168, max_op: 132 },
      { max_size: 524288 },
    ],
    baker: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
    level_info: {
      level: 536085,
      level_position: 536084,
      cycle: 131,
      cycle_position: 3604,
      expected_commitment: false,
    },
    voting_period_info: {
      voting_period: { index: 26, kind: 'proposal', start_position: 532481 },
      position: 3603,
      remaining: 16876,
    },
    nonce_hash: null,
    consumed_gas: '108015000',
    deactivated: [],
    balance_updates: [
      {
        kind: 'contract',
        contract: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
        change: '-640000000',
        origin: 'block',
      },
      {
        kind: 'freezer',
        category: 'deposits',
        delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
        cycle: 131,
        change: '640000000',
        origin: 'block',
      },
      {
        kind: 'freezer',
        category: 'rewards',
        delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
        cycle: 131,
        change: '16093750',
        origin: 'block',
      },
    ],
    liquidity_baking_escape_ema: 281925,
    implicit_operations_results: [
      {
        kind: 'transaction',
        storage: [
          { int: '81141010' },
          { int: '1004154556389' },
          { int: '87443' },
          { bytes: '01e927f00ef734dfc85919635e9afc9166c83ef9fc00' },
          { bytes: '0115eb0104481a6d7921160bc982c5e0a561cd8a3a00' },
        ],
        balance_updates: [
          {
            kind: 'contract',
            contract: 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
            change: '2500000',
            origin: 'subsidy',
          },
        ],
        consumed_gas: '2118',
        consumed_milligas: '2117300',
        storage_size: '4636',
      },
    ],
  },
  operations: [
    [
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooK6Fj6pPV8LMfuuo9CTTyDzd28CRiRzC1UFzwxrvuWCtfiuBHA',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigQigTJyznbECHxo3sokWyvsMX3GdUWhfND76bhpdQgrmj8MLcVpTQTudg8T7dswKAm4wVq9dXx3sdGiwnz1tWwatJJ2JGP',
            },
            slot: 7,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1GMPR1GXak5XEQdEXnh3P5odyZ1kvXzU5S',
                  change: '-62500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1GMPR1GXak5XEQdEXnh3P5odyZ1kvXzU5S',
                  cycle: 131,
                  change: '62500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1GMPR1GXak5XEQdEXnh3P5odyZ1kvXzU5S',
                  cycle: 131,
                  change: '1953125',
                  origin: 'block',
                },
              ],
              delegate: 'mv1GMPR1GXak5XEQdEXnh3P5odyZ1kvXzU5S',
              slots: [
                7, 26, 28, 31, 52, 55, 56, 57, 73, 81, 90, 100, 116, 137, 139, 141, 150, 155, 194,
                204, 209, 219, 226, 240, 255,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'opVPpVtkcwWYW3AaKCLYgLXDLVteewJxv1mqvRKJxiBVx4hR3Ld',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigucwWZSCHugH3w3g8Mm9k8C2vLQfCU2CixgRTLSQF2xDg5Xf6VqEDB2snUJQjZHFD4EFejrAuQhcGFJ2j729ABYAxgQdZV',
            },
            slot: 25,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1FFxMc9Ck1ocuy6hmSkpaTCoFYS4nAukwn',
                  change: '-12500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1FFxMc9Ck1ocuy6hmSkpaTCoFYS4nAukwn',
                  cycle: 131,
                  change: '12500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1FFxMc9Ck1ocuy6hmSkpaTCoFYS4nAukwn',
                  cycle: 131,
                  change: '390625',
                  origin: 'block',
                },
              ],
              delegate: 'mv1FFxMc9Ck1ocuy6hmSkpaTCoFYS4nAukwn',
              slots: [25, 49, 59, 143, 241],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooV7jeBXUjeAXb7sB6UbiPrFeadyUWAQjyVbiezYV4dQ2jh7nXZ',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigjgqeWJXQGxt7nuUJy9ZfJQrUyoMVgi34YKsCmvuKczKc198x6izoCgMGRVb7iTqDgqzEKcPFeLJpW6jxzFJ5AGXgCDPAK',
            },
            slot: 1,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV',
                  change: '-37500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV',
                  cycle: 131,
                  change: '37500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV',
                  cycle: 131,
                  change: '1171875',
                  origin: 'block',
                },
              ],
              delegate: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV',
              slots: [1, 12, 19, 20, 32, 46, 66, 93, 129, 146, 174, 176, 185, 187, 236],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooAcSPWvGdxWHs9axWkkUv8auevgo5S65y6BGuqKUyzxmQtAkkw',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigshnJHvMozfhProNP2iBV1baiUoUGoZC9yc7XyKk3TKBHZ6pJyLb8vWUcGpvqPPv732HzB5px7QsBm9KVm2n9TgERgCDmB',
            },
            slot: 62,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1RbzM6maEwvGeNh7qZiizfjKZX68Fov4x3',
                  change: '-5000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1RbzM6maEwvGeNh7qZiizfjKZX68Fov4x3',
                  cycle: 131,
                  change: '5000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1RbzM6maEwvGeNh7qZiizfjKZX68Fov4x3',
                  cycle: 131,
                  change: '156250',
                  origin: 'block',
                },
              ],
              delegate: 'mv1RbzM6maEwvGeNh7qZiizfjKZX68Fov4x3',
              slots: [62, 102],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'onrL2x7aon3qi1p3wsroWnRfx8KigzYNQg5S2EYyB3k7N72Nqcy',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigWwT3mRjCzfvxy65Nd76yHDH6MBwDw1RhhMf4miDp6MvtBjCvcgXhL7z4WM1vZrGEB74UiAbnJzNCSJ3KDwNFwBbU2kpU4',
            },
            slot: 3,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc',
                  change: '-62500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc',
                  cycle: 131,
                  change: '62500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc',
                  cycle: 131,
                  change: '1953125',
                  origin: 'block',
                },
              ],
              delegate: 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc',
              slots: [
                3, 6, 13, 21, 37, 63, 68, 86, 94, 110, 123, 133, 134, 152, 169, 170, 208, 212, 213,
                215, 218, 221, 223, 232, 254,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'onseUqV43jrnEQDWV6S7pNEWAQ1W1jVwDrtjXLXUMMYqLJUaCKo',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigeeqviP7cPW2SdBNx53trnr9zCDTJKZd2ixZGTg5qz17CcEJaHZgQZjcEcFcy2EnEDusA4m9yeT9JK24fipu9XyiprZ6pH',
            },
            slot: 184,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1Qzh9QYHuUniL9sFAbCwDR5uHRWBjR8aPm',
                  change: '-2500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1Qzh9QYHuUniL9sFAbCwDR5uHRWBjR8aPm',
                  cycle: 131,
                  change: '2500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1Qzh9QYHuUniL9sFAbCwDR5uHRWBjR8aPm',
                  cycle: 131,
                  change: '78125',
                  origin: 'block',
                },
              ],
              delegate: 'mv1Qzh9QYHuUniL9sFAbCwDR5uHRWBjR8aPm',
              slots: [184],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooFD5AWihGns7RaZHKqyiJPFDAYuCpXJGT72p6CCig4EQsYm9tT',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigiDTLARKGSKx1KnhxMdhxV7h4NnChw3gzYy8fJv9C58vPD9mCuKsvCrRGUk79mCqaxudyUu5T3qxWkuJqugJysSeg45KBT',
            },
            slot: 5,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
                  change: '-80000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
                  cycle: 131,
                  change: '80000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
                  cycle: 131,
                  change: '2500000',
                  origin: 'block',
                },
              ],
              delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
              slots: [
                5, 18, 22, 24, 51, 77, 79, 95, 98, 115, 140, 145, 151, 157, 162, 163, 167, 171, 181,
                188, 189, 195, 196, 198, 202, 205, 207, 227, 231, 238, 242, 252,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooqKhCA49xFX9wwyU3LmgwJZu8qwfgRQNHHjaoA45QkmAR8rxmW',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigkD1y57jWwdGyzwgHXZoEFsNuJCcWsC4SRpMeMiAzFbgf5G3ATQoZF2pCtCdfxvXYu1nDixosqJvqttiX7hNNWWw7H5H3o',
            },
            slot: 16,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
                  change: '-45000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
                  cycle: 131,
                  change: '45000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
                  cycle: 131,
                  change: '1406250',
                  origin: 'block',
                },
              ],
              delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
              slots: [
                16, 35, 42, 53, 76, 80, 85, 87, 91, 125, 126, 127, 179, 186, 214, 225, 239, 245,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooiBEZGpe15vBVEJBD7f42NhtXUVyMgZFJ6Kq6Rz9x59acRjfqC',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigo63PyYEcmFmGoWiLoY7aChpqq4AzE3u6EyeMbX5dfmSyFPqrbKJgTrH4Pg9ELZJfFWW9DmurYw77nqmH529wLYxVq43ec',
            },
            slot: 201,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1S7y4o7hfXDnGUNi14APkTAtCWuok5MZEf',
                  change: '-2500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1S7y4o7hfXDnGUNi14APkTAtCWuok5MZEf',
                  cycle: 131,
                  change: '2500000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1S7y4o7hfXDnGUNi14APkTAtCWuok5MZEf',
                  cycle: 131,
                  change: '78125',
                  origin: 'block',
                },
              ],
              delegate: 'mv1S7y4o7hfXDnGUNi14APkTAtCWuok5MZEf',
              slots: [201],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'oogyZfDdZPWFxuyRAQs1J53CxmxUbnd6Q1WixifHKpnicphrEbb',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigpznVMjV53auoAPqxYxkYANxbrYaMmuq242ueQqo1NijaQvZRUEZP5sFwMLVpLGRUzHEkrYkX6NGFm1RfKKb4yBmBjrHr5',
            },
            slot: 15,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1Pw7yZyb8TJj3kbecFBvZHGYb2i9DSPgSY',
                  change: '-75000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1Pw7yZyb8TJj3kbecFBvZHGYb2i9DSPgSY',
                  cycle: 131,
                  change: '75000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1Pw7yZyb8TJj3kbecFBvZHGYb2i9DSPgSY',
                  cycle: 131,
                  change: '2343750',
                  origin: 'block',
                },
              ],
              delegate: 'mv1Pw7yZyb8TJj3kbecFBvZHGYb2i9DSPgSY',
              slots: [
                15, 23, 30, 34, 38, 45, 60, 61, 64, 67, 70, 75, 78, 89, 92, 104, 112, 114, 122, 124,
                138, 149, 160, 175, 191, 197, 199, 230, 233, 234,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'oozpKKz7XcaihZhSsEMiLcUPvGxjZe74yz1hrNzvYg9W1NNCjTx',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigqhueAmzzAArEiHLnwQUpLEVcz8wWcn2qxfMKmRrGRg2cn6k4q17eBaU9bHDepsf1jnGN3cDHrTfbas58BW7pbUoCJgHUh',
            },
            slot: 120,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1CuhBgc8xczwgH9Mc9iuHtbEbsoHCB85zb',
                  change: '-5000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1CuhBgc8xczwgH9Mc9iuHtbEbsoHCB85zb',
                  cycle: 131,
                  change: '5000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1CuhBgc8xczwgH9Mc9iuHtbEbsoHCB85zb',
                  cycle: 131,
                  change: '156250',
                  origin: 'block',
                },
              ],
              delegate: 'mv1CuhBgc8xczwgH9Mc9iuHtbEbsoHCB85zb',
              slots: [120, 131],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'onwE9jGH8LXetQmPTHekChAnecpcmV92md8WMSgTcjok6DUDtJ9',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigfTpvZPXMb2ur3PhQ2w6N93auNHft7swUHdf4QsizPMgbKHxNFV4TU8MmHXQ5ZivMkeCAbwBEdDApAw25uf9vzzPuAFoAK',
            },
            slot: 8,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1XAsUdbF1PgG3iierMq88yzqKNUwhQYsJr',
                  change: '-65000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1XAsUdbF1PgG3iierMq88yzqKNUwhQYsJr',
                  cycle: 131,
                  change: '65000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1XAsUdbF1PgG3iierMq88yzqKNUwhQYsJr',
                  cycle: 131,
                  change: '2031250',
                  origin: 'block',
                },
              ],
              delegate: 'mv1XAsUdbF1PgG3iierMq88yzqKNUwhQYsJr',
              slots: [
                8, 10, 11, 33, 41, 58, 99, 107, 108, 111, 118, 128, 147, 148, 154, 156, 158, 168,
                172, 183, 192, 228, 237, 244, 250, 253,
              ],
            },
          },
        ],
      },
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'oo7qUvuxaxUthTzfbTYk56TPBQ1V59iycoTmbTpPYGPENyuR7Fi',
        branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
        contents: [
          {
            kind: 'endorsement_with_slot',
            endorsement: {
              branch: 'BM44sPfEofA59iibf5v5AC1wB1BH2kYi9YsKXHmQeDqZFkMSDD7',
              operations: { kind: 'endorsement', level: 536084 },
              signature:
                'sigeiWyjufSMaWBEHqotERDGUSFtTLimnFhTH4gm1Pi8qB7hrz41czWXquqHGcVAdt8a3Z96o6Ktg5SkMJ9cyr6qFq8ccmTM',
            },
            slot: 9,
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1F1GyfWcFqdNmr2zWyvcuR6YdP7kChQvPQ',
                  change: '-60000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'deposits',
                  delegate: 'mv1F1GyfWcFqdNmr2zWyvcuR6YdP7kChQvPQ',
                  cycle: 131,
                  change: '60000000',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'rewards',
                  delegate: 'mv1F1GyfWcFqdNmr2zWyvcuR6YdP7kChQvPQ',
                  cycle: 131,
                  change: '1875000',
                  origin: 'block',
                },
              ],
              delegate: 'mv1F1GyfWcFqdNmr2zWyvcuR6YdP7kChQvPQ',
              slots: [
                9, 14, 27, 43, 54, 83, 84, 96, 101, 105, 113, 136, 144, 153, 159, 164, 180, 182,
                203, 211, 224, 247, 249, 251,
              ],
            },
          },
        ],
      },
    ],
    [],
    [],
    [
      {
        protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
        chain_id: 'NetXz969SFaFn8k',
        hash: 'ooybqGUDKq3QUbZVe4qZ1oLx2GhTqZ6VdVTuA7SZDfE5B2jbHRd',
        branch: 'BLEzWSy1Aze5Enuv3KimDvqZbAXbzSHxQeRDztN6tvXknfTCAus',
        contents: [
          {
            kind: 'transaction',
            source: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
            fee: '0',
            counter: '703827',
            gas_limit: '3422',
            storage_limit: '67',
            amount: '0',
            destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
            parameters: {
              entrypoint: 'update_operators',
              value: [
                {
                  prim: 'Left',
                  args: [
                    {
                      prim: 'Pair',
                      args: [
                        { string: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS' },
                        {
                          prim: 'Pair',
                          args: [{ string: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm' }, { int: '1' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            metadata: {
              balance_updates: [],
              operation_result: {
                status: 'applied',
                storage: {
                  prim: 'Pair',
                  args: [
                    { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                    { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                  ],
                },
                big_map_diff: [
                  {
                    action: 'update',
                    big_map: '20442',
                    key_hash: 'exprtpmtn8bL4jrTW2AfMZJ9p2yx1k9xMkN5f7EWhxtUVPtvutxqNL',
                    key: {
                      prim: 'Pair',
                      args: [
                        { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                        {
                          prim: 'Pair',
                          args: [
                            { bytes: '01a783b18821ce1f502c8a1c2fd9761ad21c1391d600' },
                            { int: '1' },
                          ],
                        },
                      ],
                    },
                    value: { prim: 'Unit' },
                  },
                ],
                balance_updates: [
                  {
                    kind: 'contract',
                    contract: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
                    change: '-16750',
                    origin: 'block',
                  },
                ],
                consumed_gas: '3322',
                consumed_milligas: '3321239',
                storage_size: '48520',
                paid_storage_size_diff: '67',
                lazy_storage_diff: [
                  { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                  {
                    kind: 'big_map',
                    id: '20442',
                    diff: {
                      action: 'update',
                      updates: [
                        {
                          key_hash: 'exprtpmtn8bL4jrTW2AfMZJ9p2yx1k9xMkN5f7EWhxtUVPtvutxqNL',
                          key: {
                            prim: 'Pair',
                            args: [
                              { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01a783b18821ce1f502c8a1c2fd9761ad21c1391d600' },
                                  { int: '1' },
                                ],
                              },
                            ],
                          },
                          value: { prim: 'Unit' },
                        },
                      ],
                    },
                  },
                  { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                  { kind: 'big_map', id: '20440', diff: { action: 'update', updates: [] } },
                ],
              },
            },
          },
          {
            kind: 'transaction',
            source: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
            fee: '0',
            counter: '703828',
            gas_limit: '101201',
            storage_limit: '70',
            amount: '0',
            destination: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
            parameters: {
              entrypoint: 'swap_exact_for_tokens',
              value: {
                prim: 'Pair',
                args: [
                  {
                    prim: 'Pair',
                    args: [
                      {
                        prim: 'Pair',
                        args: [
                          { string: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS' },
                          { int: '5000000000' },
                        ],
                      },
                      {
                        prim: 'Pair',
                        args: [{ int: '14146908' }, { string: '2022-01-28T11:57:44.601Z' }],
                      },
                    ],
                  },
                  {
                    prim: 'Pair',
                    args: [
                      {
                        prim: 'Pair',
                        args: [
                          { string: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL' },
                          { prim: 'Some', args: [{ int: '1' }] },
                        ],
                      },
                      {
                        prim: 'Pair',
                        args: [
                          { string: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL' },
                          { prim: 'Some', args: [{ int: '0' }] },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            metadata: {
              balance_updates: [],
              operation_result: {
                status: 'applied',
                storage: {
                  prim: 'Pair',
                  args: [
                    {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'Some',
                          args: [
                            {
                              prim: 'Pair',
                              args: [
                                {
                                  prim: 'Pair',
                                  args: [
                                    {
                                      prim: 'Pair',
                                      args: [
                                        { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                        { prim: 'None' },
                                      ],
                                    },
                                    {
                                      prim: 'Pair',
                                      args: [
                                        { prim: 'None' },
                                        { prim: 'Right', args: [{ prim: 'Unit' }] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  prim: 'Pair',
                                  args: [
                                    {
                                      prim: 'Pair',
                                      args: [
                                        {
                                          prim: 'Pair',
                                          args: [
                                            {
                                              bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600',
                                            },
                                            { prim: 'Some', args: [{ int: '1' }] },
                                          ],
                                        },
                                        {
                                          prim: 'Pair',
                                          args: [
                                            {
                                              bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600',
                                            },
                                            { prim: 'Some', args: [{ int: '0' }] },
                                          ],
                                        },
                                      ],
                                    },
                                    { prim: 'None' },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                      ],
                    },
                    { prim: 'Pair', args: [{ int: '20669' }, { int: '20670' }] },
                  ],
                },
                big_map_diff: [],
                consumed_gas: '12665',
                consumed_milligas: '12664013',
                storage_size: '32990',
                lazy_storage_diff: [
                  { kind: 'big_map', id: '20670', diff: { action: 'update', updates: [] } },
                  { kind: 'big_map', id: '20669', diff: { action: 'update', updates: [] } },
                ],
              },
              internal_operation_results: [
                {
                  kind: 'transaction',
                  source: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  nonce: 0,
                  amount: '0',
                  destination: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  parameters: {
                    entrypoint: 'get_reserves',
                    value: {
                      bytes:
                        '01a783b18821ce1f502c8a1c2fd9761ad21c1391d60072657365727665735f63616c6c6261636b',
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Pair',
                                    args: [
                                      { prim: 'Pair', args: [{ int: '20832' }, { int: '20833' }] },
                                      { prim: 'Pair', args: [{ int: '20834' }, { int: '20835' }] },
                                    ],
                                  },
                                  { int: '20836' },
                                ],
                              },
                              { prim: 'Pair', args: [{ prim: 'None' }, { int: '20837' }] },
                            ],
                          },
                          { prim: 'Pair', args: [{ int: '2369921' }, { int: '976068754' }] },
                          { int: '1633368712' },
                          { int: '3520039054386878' },
                        ],
                        {
                          prim: 'Pair',
                          args: [
                            [
                              {
                                prim: 'Pair',
                                args: [
                                  { int: '9999515636866' },
                                  { int: '35198685566720594775323444348' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                  { prim: 'Some', args: [{ int: '1' }] },
                                ],
                              },
                              { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                              { prim: 'Some', args: [{ int: '0' }] },
                            ],
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '9288',
                    consumed_milligas: '9287559',
                    storage_size: '19227',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20837', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20836', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20835', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20834', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20833', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20832', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 2,
                  amount: '0',
                  destination: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  parameters: {
                    entrypoint: 'reserves_callback',
                    value: {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'Pair',
                          args: [{ int: '3520039054386878' }, { int: '9999515636866' }],
                        },
                        { int: '188166353164099' },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'Pair',
                          args: [
                            {
                              prim: 'Some',
                              args: [
                                {
                                  prim: 'Pair',
                                  args: [
                                    {
                                      prim: 'Pair',
                                      args: [
                                        {
                                          prim: 'Pair',
                                          args: [
                                            {
                                              bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f',
                                            },
                                            { prim: 'Some', args: [{ int: '3520039054386878' }] },
                                          ],
                                        },
                                        {
                                          prim: 'Pair',
                                          args: [
                                            { prim: 'Some', args: [{ int: '9999515636866' }] },
                                            { prim: 'Left', args: [{ prim: 'Unit' }] },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      prim: 'Pair',
                                      args: [
                                        {
                                          prim: 'Pair',
                                          args: [
                                            {
                                              prim: 'Pair',
                                              args: [
                                                {
                                                  bytes:
                                                    '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600',
                                                },
                                                { prim: 'Some', args: [{ int: '1' }] },
                                              ],
                                            },
                                            {
                                              prim: 'Pair',
                                              args: [
                                                {
                                                  bytes:
                                                    '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600',
                                                },
                                                { prim: 'Some', args: [{ int: '0' }] },
                                              ],
                                            },
                                          ],
                                        },
                                        { prim: 'Some', args: [{ int: '188166353164099' }] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                        { prim: 'Pair', args: [{ int: '20669' }, { int: '20670' }] },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '9479',
                    consumed_milligas: '9478157',
                    storage_size: '33015',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20670', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20669', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  nonce: 1,
                  amount: '0',
                  destination: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  parameters: {
                    entrypoint: 'main_entry',
                    value: {
                      prim: 'Left',
                      args: [
                        {
                          prim: 'Left',
                          args: [
                            {
                              prim: 'Left',
                              args: [
                                {
                                  prim: 'Right',
                                  args: [
                                    [
                                      {
                                        prim: 'Pair',
                                        args: [
                                          {
                                            prim: 'Pair',
                                            args: [
                                              {
                                                bytes:
                                                  '0000bc82eedf570c81349226f937bed3d3485a2b080f',
                                              },
                                              { int: '5000000000' },
                                            ],
                                          },
                                          {
                                            prim: 'Pair',
                                            args: [{ int: '14146908' }, { int: '1643371064' }],
                                          },
                                        ],
                                      },
                                      {
                                        prim: 'Pair',
                                        args: [
                                          { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                          { prim: 'Some', args: [{ int: '1' }] },
                                        ],
                                      },
                                      { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                      { prim: 'Some', args: [{ int: '0' }] },
                                    ],
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'Pair',
                          args: [
                            { prim: 'None' },
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                        { prim: 'Pair', args: [{ int: '20669' }, { int: '20670' }] },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '11667',
                    consumed_milligas: '11666798',
                    storage_size: '32875',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20670', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20669', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  nonce: 3,
                  amount: '0',
                  destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  parameters: {
                    entrypoint: 'transfer',
                    value: [
                      {
                        prim: 'Pair',
                        args: [
                          { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                          [
                            {
                              prim: 'Pair',
                              args: [
                                { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                                { prim: 'Pair', args: [{ int: '1' }, { int: '5000000000' }] },
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                        { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                      ],
                    },
                    big_map_diff: [
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'exprtqGiP8vxvoGE35foNVciCmRtuofNsZVinQfSE2SKdQdAvSTcBS',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                            { int: '1' },
                          ],
                        },
                        value: { int: '5000000000' },
                      },
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'exprv6HH2WDmykE9AQ5kmXbsZAbEHzr2Wy6Bkt5CCS9U9CEgiNdRJr',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                            { int: '1' },
                          ],
                        },
                        value: { int: '3520044054386878' },
                      },
                    ],
                    consumed_gas: '5018',
                    consumed_milligas: '5017728',
                    storage_size: '48520',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20442', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                      {
                        kind: 'big_map',
                        id: '20440',
                        diff: {
                          action: 'update',
                          updates: [
                            {
                              key_hash: 'exprv6HH2WDmykE9AQ5kmXbsZAbEHzr2Wy6Bkt5CCS9U9CEgiNdRJr',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                                  { int: '1' },
                                ],
                              },
                              value: { int: '3520044054386878' },
                            },
                            {
                              key_hash: 'exprtqGiP8vxvoGE35foNVciCmRtuofNsZVinQfSE2SKdQdAvSTcBS',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                  { int: '1' },
                                ],
                              },
                              value: { int: '5000000000' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm',
                  nonce: 4,
                  amount: '0',
                  destination: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  parameters: {
                    entrypoint: 'start_swap',
                    value: {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'Pair',
                          args: [
                            { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                            { int: '0' },
                          ],
                        },
                        { prim: 'Pair', args: [{ int: '14161068' }, { prim: 'None' }] },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Pair',
                                    args: [
                                      { prim: 'Pair', args: [{ int: '20832' }, { int: '20833' }] },
                                      { prim: 'Pair', args: [{ int: '20834' }, { int: '20835' }] },
                                    ],
                                  },
                                  { int: '20836' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Some',
                                    args: [
                                      {
                                        prim: 'Pair',
                                        args: [
                                          {
                                            prim: 'Pair',
                                            args: [
                                              {
                                                prim: 'Pair',
                                                args: [
                                                  {
                                                    bytes:
                                                      '0000bc82eedf570c81349226f937bed3d3485a2b080f',
                                                  },
                                                  { int: '0' },
                                                ],
                                              },
                                              {
                                                prim: 'Pair',
                                                args: [{ int: '14161068' }, { prim: 'None' }],
                                              },
                                            ],
                                          },
                                          {
                                            prim: 'Pair',
                                            args: [
                                              { prim: 'None' },
                                              { prim: 'Right', args: [{ prim: 'Unit' }] },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  { int: '20837' },
                                ],
                              },
                            ],
                          },
                          { prim: 'Pair', args: [{ int: '2369921' }, { int: '976068754' }] },
                          { int: '1633368712' },
                          { int: '3520039054386878' },
                        ],
                        {
                          prim: 'Pair',
                          args: [
                            [
                              {
                                prim: 'Pair',
                                args: [
                                  { int: '9999515636866' },
                                  { int: '35198685566720594775323444348' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                  { prim: 'Some', args: [{ int: '1' }] },
                                ],
                              },
                              { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                              { prim: 'Some', args: [{ int: '0' }] },
                            ],
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '12571',
                    consumed_milligas: '12570775',
                    storage_size: '19279',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20837', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20836', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20835', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20834', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20833', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20832', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 5,
                  amount: '0',
                  destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  parameters: {
                    entrypoint: 'transfer',
                    value: [
                      {
                        prim: 'Pair',
                        args: [
                          { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                          [
                            {
                              prim: 'Pair',
                              args: [
                                { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                { prim: 'Pair', args: [{ int: '1' }, { int: '0' }] },
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                        { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                      ],
                    },
                    big_map_diff: [
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'exprtqGiP8vxvoGE35foNVciCmRtuofNsZVinQfSE2SKdQdAvSTcBS',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                            { int: '1' },
                          ],
                        },
                        value: { int: '5000000000' },
                      },
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'exprv6HH2WDmykE9AQ5kmXbsZAbEHzr2Wy6Bkt5CCS9U9CEgiNdRJr',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                            { int: '1' },
                          ],
                        },
                        value: { int: '3520044054386878' },
                      },
                    ],
                    consumed_gas: '4759',
                    consumed_milligas: '4758619',
                    storage_size: '48520',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20442', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                      {
                        kind: 'big_map',
                        id: '20440',
                        diff: {
                          action: 'update',
                          updates: [
                            {
                              key_hash: 'exprv6HH2WDmykE9AQ5kmXbsZAbEHzr2Wy6Bkt5CCS9U9CEgiNdRJr',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                                  { int: '1' },
                                ],
                              },
                              value: { int: '3520044054386878' },
                            },
                            {
                              key_hash: 'exprtqGiP8vxvoGE35foNVciCmRtuofNsZVinQfSE2SKdQdAvSTcBS',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                  { int: '1' },
                                ],
                              },
                              value: { int: '5000000000' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 6,
                  amount: '0',
                  destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  parameters: {
                    entrypoint: 'transfer',
                    value: [
                      {
                        prim: 'Pair',
                        args: [
                          { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                          [
                            {
                              prim: 'Pair',
                              args: [
                                { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                { prim: 'Pair', args: [{ int: '0' }, { int: '14161068' }] },
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                        { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                      ],
                    },
                    big_map_diff: [
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'exprtsTQSSJpAVrr1qEA9LRMaNz7zpBH4bpmGGBM8N6JztetYSREov',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                            { int: '0' },
                          ],
                        },
                        value: { int: '9999501475798' },
                      },
                      {
                        action: 'update',
                        big_map: '20440',
                        key_hash: 'expruhP7hUgjQpeNgzkjxgBt8Bz3bncenkYmC383MS2UYEsTMYXYaU',
                        key: {
                          prim: 'Pair',
                          args: [
                            { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                            { int: '0' },
                          ],
                        },
                        value: { int: '14161068' },
                      },
                    ],
                    balance_updates: [
                      {
                        kind: 'contract',
                        contract: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
                        change: '-17500',
                        origin: 'block',
                      },
                    ],
                    consumed_gas: '4522',
                    consumed_milligas: '4521387',
                    storage_size: '48590',
                    paid_storage_size_diff: '70',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20442', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                      {
                        kind: 'big_map',
                        id: '20440',
                        diff: {
                          action: 'update',
                          updates: [
                            {
                              key_hash: 'expruhP7hUgjQpeNgzkjxgBt8Bz3bncenkYmC383MS2UYEsTMYXYaU',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                                  { int: '0' },
                                ],
                              },
                              value: { int: '14161068' },
                            },
                            {
                              key_hash: 'exprtsTQSSJpAVrr1qEA9LRMaNz7zpBH4bpmGGBM8N6JztetYSREov',
                              key: {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                                  { int: '0' },
                                ],
                              },
                              value: { int: '9999501475798' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 7,
                  amount: '0',
                  destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  parameters: {
                    entrypoint: 'balance_of',
                    value: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                              { int: '1' },
                            ],
                          },
                        ],
                        {
                          bytes:
                            '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc40062616c616e63655f63616c6c6261636b',
                        },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                        { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '5064',
                    consumed_milligas: '5063541',
                    storage_size: '48590',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20442', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20440', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  nonce: 10,
                  amount: '0',
                  destination: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  parameters: {
                    entrypoint: 'balance_callback',
                    value: [
                      {
                        prim: 'Pair',
                        args: [
                          {
                            prim: 'Pair',
                            args: [
                              { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                              { int: '1' },
                            ],
                          },
                          { int: '3520044054386878' },
                        ],
                      },
                    ],
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Pair',
                                    args: [
                                      { prim: 'Pair', args: [{ int: '20832' }, { int: '20833' }] },
                                      { prim: 'Pair', args: [{ int: '20834' }, { int: '20835' }] },
                                    ],
                                  },
                                  { int: '20836' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Some',
                                    args: [
                                      {
                                        prim: 'Pair',
                                        args: [
                                          {
                                            prim: 'Pair',
                                            args: [
                                              {
                                                prim: 'Pair',
                                                args: [
                                                  {
                                                    bytes:
                                                      '0000bc82eedf570c81349226f937bed3d3485a2b080f',
                                                  },
                                                  { int: '0' },
                                                ],
                                              },
                                              {
                                                prim: 'Pair',
                                                args: [
                                                  { int: '14161068' },
                                                  {
                                                    prim: 'Some',
                                                    args: [{ int: '3520044054386878' }],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            prim: 'Pair',
                                            args: [
                                              { prim: 'None' },
                                              {
                                                prim: 'Left',
                                                args: [{ prim: 'Left', args: [{ prim: 'Unit' }] }],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  { int: '20837' },
                                ],
                              },
                            ],
                          },
                          { prim: 'Pair', args: [{ int: '2369921' }, { int: '976068754' }] },
                          { int: '1633368712' },
                          { int: '3520039054386878' },
                        ],
                        {
                          prim: 'Pair',
                          args: [
                            [
                              {
                                prim: 'Pair',
                                args: [
                                  { int: '9999515636866' },
                                  { int: '35198685566720594775323444348' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                  { prim: 'Some', args: [{ int: '1' }] },
                                ],
                              },
                              { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                              { prim: 'Some', args: [{ int: '0' }] },
                            ],
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '7023',
                    consumed_milligas: '7022609',
                    storage_size: '19290',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20837', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20836', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20835', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20834', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20833', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20832', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 8,
                  amount: '0',
                  destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  parameters: {
                    entrypoint: 'balance_of',
                    value: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                              { int: '0' },
                            ],
                          },
                        ],
                        {
                          bytes:
                            '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc40062616c616e63655f63616c6c6261636b',
                        },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                        { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '5064',
                    consumed_milligas: '5063529',
                    storage_size: '48590',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20442', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20440', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
                  nonce: 11,
                  amount: '0',
                  destination: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  parameters: {
                    entrypoint: 'balance_callback',
                    value: [
                      {
                        prim: 'Pair',
                        args: [
                          {
                            prim: 'Pair',
                            args: [
                              { bytes: '01728d89975f2119d0bcc6dee11eb7d627b0fe5dc400' },
                              { int: '0' },
                            ],
                          },
                          { int: '9999501475798' },
                        ],
                      },
                    ],
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Pair',
                                    args: [
                                      { prim: 'Pair', args: [{ int: '20832' }, { int: '20833' }] },
                                      { prim: 'Pair', args: [{ int: '20834' }, { int: '20835' }] },
                                    ],
                                  },
                                  { int: '20836' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Some',
                                    args: [
                                      {
                                        prim: 'Pair',
                                        args: [
                                          {
                                            prim: 'Pair',
                                            args: [
                                              {
                                                prim: 'Pair',
                                                args: [
                                                  {
                                                    bytes:
                                                      '0000bc82eedf570c81349226f937bed3d3485a2b080f',
                                                  },
                                                  { int: '0' },
                                                ],
                                              },
                                              {
                                                prim: 'Pair',
                                                args: [
                                                  { int: '14161068' },
                                                  {
                                                    prim: 'Some',
                                                    args: [{ int: '3520044054386878' }],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            prim: 'Pair',
                                            args: [
                                              { prim: 'Some', args: [{ int: '9999501475798' }] },
                                              {
                                                prim: 'Left',
                                                args: [{ prim: 'Right', args: [{ prim: 'Unit' }] }],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  { int: '20837' },
                                ],
                              },
                            ],
                          },
                          { prim: 'Pair', args: [{ int: '2369921' }, { int: '976068754' }] },
                          { int: '1633368712' },
                          { int: '3520039054386878' },
                        ],
                        {
                          prim: 'Pair',
                          args: [
                            [
                              {
                                prim: 'Pair',
                                args: [
                                  { int: '9999515636866' },
                                  { int: '35198685566720594775323444348' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                  { prim: 'Some', args: [{ int: '1' }] },
                                ],
                              },
                              { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                              { prim: 'Some', args: [{ int: '0' }] },
                            ],
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '7025',
                    consumed_milligas: '7024325',
                    storage_size: '19298',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20837', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20836', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20835', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20834', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20833', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20832', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
                {
                  kind: 'transaction',
                  source: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  nonce: 9,
                  amount: '0',
                  destination: 'KT1K2U9q55iPwGJEFyEqfbL3AKhHX4f6UThT',
                  parameters: {
                    entrypoint: 'finalize_action',
                    value: { prim: 'Right', args: [{ prim: 'Unit' }] },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Pair',
                      args: [
                        [
                          {
                            prim: 'Pair',
                            args: [
                              {
                                prim: 'Pair',
                                args: [
                                  {
                                    prim: 'Pair',
                                    args: [
                                      { prim: 'Pair', args: [{ int: '20832' }, { int: '20833' }] },
                                      { prim: 'Pair', args: [{ int: '20834' }, { int: '20835' }] },
                                    ],
                                  },
                                  { int: '20836' },
                                ],
                              },
                              { prim: 'Pair', args: [{ prim: 'None' }, { int: '20837' }] },
                            ],
                          },
                          { prim: 'Pair', args: [{ int: '2369927' }, { int: '976906563' }] },
                          { int: '1633371092' },
                          { int: '3520044054386878' },
                        ],
                        {
                          prim: 'Pair',
                          args: [
                            [
                              {
                                prim: 'Pair',
                                args: [
                                  { int: '9999501475798' },
                                  { int: '35198685566720594775323444348' },
                                ],
                              },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                                  { prim: 'Some', args: [{ int: '1' }] },
                                ],
                              },
                              { bytes: '01be8be8d6aa8aa77b26fcdfb58b2d3abc097ba74600' },
                              { prim: 'Some', args: [{ int: '0' }] },
                            ],
                            { bytes: '012582f9db72407f07e78f065db7965ff42c46248700' },
                          ],
                        },
                      ],
                    },
                    big_map_diff: [],
                    consumed_gas: '6962',
                    consumed_milligas: '6961817',
                    storage_size: '19227',
                    lazy_storage_diff: [
                      { kind: 'big_map', id: '20837', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20836', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20835', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20834', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20833', diff: { action: 'update', updates: [] } },
                      { kind: 'big_map', id: '20832', diff: { action: 'update', updates: [] } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'transaction',
            source: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
            fee: '12049',
            counter: '703829',
            gas_limit: '3392',
            storage_limit: '0',
            amount: '0',
            destination: 'KT1RxHZJCrFVuPQJWqhVLBZeZxm7SawHdHGL',
            parameters: {
              entrypoint: 'update_operators',
              value: [
                {
                  prim: 'Right',
                  args: [
                    {
                      prim: 'Pair',
                      args: [
                        { string: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS' },
                        {
                          prim: 'Pair',
                          args: [{ string: 'KT1PrWB2PSwWNzbfpA9SJbUaHXxCzbLSJspm' }, { int: '1' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1VxfyfRCTnc6byQYmQepSpKqVLA7PywtRS',
                  change: '-12049',
                  origin: 'block',
                },
                {
                  kind: 'freezer',
                  category: 'fees',
                  delegate: 'mv1NKCD6xADyhfhZ5LEoAnfmrt257uZmL9AP',
                  cycle: 131,
                  change: '12049',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                storage: {
                  prim: 'Pair',
                  args: [
                    { prim: 'Pair', args: [{ int: '20440' }, { int: '20441' }] },
                    { prim: 'Pair', args: [{ int: '20442' }, { int: '20443' }] },
                  ],
                },
                big_map_diff: [
                  {
                    action: 'update',
                    big_map: '20442',
                    key_hash: 'exprtpmtn8bL4jrTW2AfMZJ9p2yx1k9xMkN5f7EWhxtUVPtvutxqNL',
                    key: {
                      prim: 'Pair',
                      args: [
                        { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                        {
                          prim: 'Pair',
                          args: [
                            { bytes: '01a783b18821ce1f502c8a1c2fd9761ad21c1391d600' },
                            { int: '1' },
                          ],
                        },
                      ],
                    },
                  },
                ],
                consumed_gas: '3292',
                consumed_milligas: '3291138',
                storage_size: '48523',
                lazy_storage_diff: [
                  { kind: 'big_map', id: '20443', diff: { action: 'update', updates: [] } },
                  {
                    kind: 'big_map',
                    id: '20442',
                    diff: {
                      action: 'update',
                      updates: [
                        {
                          key_hash: 'exprtpmtn8bL4jrTW2AfMZJ9p2yx1k9xMkN5f7EWhxtUVPtvutxqNL',
                          key: {
                            prim: 'Pair',
                            args: [
                              { bytes: '0000bc82eedf570c81349226f937bed3d3485a2b080f' },
                              {
                                prim: 'Pair',
                                args: [
                                  { bytes: '01a783b18821ce1f502c8a1c2fd9761ad21c1391d600' },
                                  { int: '1' },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  { kind: 'big_map', id: '20441', diff: { action: 'update', updates: [] } },
                  { kind: 'big_map', id: '20440', diff: { action: 'update', updates: [] } },
                ],
              },
            },
          },
        ],
        signature:
          'siggVH9Kh81y4UraZqdPvH2zdP3RgjUSt2XvM2VDD9N5mGptMrF31GRhaKAxtk6xErHsxLqohMvudwvLkjsMg7TkfGrbwMdC',
      },
    ],
  ],
};
export const blockHash = 'BlockHash';
export const liveBlocks = [
  'BKiHeQzuKM5quBsgVL25UDFXKcZyaTt26AQUtUkbA4Vh3dAQY21',
  'BKiboc2xTLtbCXt6AWX2BpR4km41onVrLmhFSTjYUA2iWKBwSTH',
];
export const balance = new BigNumber(4138876344398);
export const storage = { prim: 'Pair', args: [{ int: '0' }, { int: '1' }] };
export const script = {
  code: [
    { prim: 'parameter', args: [] },
    { prim: 'storage', args: [] },
    { prim: 'code', args: [] },
  ],
  storage: { prim: 'Pair', args: [] },
};
export const contract = {
  balance: new BigNumber(765),
  script: {
    code: [],
    storage: { prim: 'Pair', args: [] },
  },
};
export const unstakeRequestsResponse = {
  finalizable: [
    {
      delegate: 'mv1X83v8gdttgFt4U8kDExzcXV68Ndh141U5',
      cycle: 10,
      amount: new BigNumber('500000000'),
    },
  ],
  unfinalizable: {
    delegate: 'mv1X83v8gdttgFt4U8kDExzcXV68Ndh141U5',
    requests: [
      {
        cycle: 11,
        amount: new BigNumber('200000000'),
      },
    ],
  },
};
export const managerKey = 'edpkvP1NXoo8vhYbPSvXdy466EHoYWBpf6zmjghB2p3DwJPjbB5nsf';
export const delegate = 'mv1A1LYBjHEe6JUT8dg4nLdkftGE7nYPNwfc';
export const bigmapValue = { prim: 'Pair', args: [[], { int: '100' }] };
export const delegates = {
  full_balance: new BigNumber('10289576365'),
  current_frozen_deposits: new BigNumber('2028957741'),
  frozen_deposits: new BigNumber('1028957741'),
  staking_balance: new BigNumber('10289576365'),
  delegated_contracts: ['mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv'],
  delegated_balance: new BigNumber('0'),
  min_delegated_in_current_cycle: {
    amount: '8260618624',
    level: {
      level: 81924,
      level_position: 81923,
      cycle: 7,
      cycle_position: 3,
      expected_commitment: false,
    },
  },
  deactivated: false,
  grace_period: 7,
  pending_denunciations: false,
  total_delegated_stake: new BigNumber('0'),
  staking_denominator: new BigNumber('0'),
  voting_power: new BigNumber('10289577405'),
  remaining_proposals: 20,
  active_consensus_key: 'mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv',
};
export const votingInfo = {
  voting_power: '1005169895965',
  remaining_proposals: 20,
};
export const constants = {
  proof_of_work_nonce_size: 8,
  nonce_length: 32,
  max_anon_ops_per_block: 132,
  max_operation_data_length: 32768,
  max_proposals_per_delegate: 20,
  preserved_cycles: 3,
  blocks_per_cycle: 4096,
  blocks_per_commitment: 32,
  blocks_per_roll_snapshot: 256,
  blocks_per_voting_period: 20480,
  time_between_blocks: [new BigNumber(30), new BigNumber(20)],
  endorsers_per_block: 256,
  hard_gas_limit_per_operation: new BigNumber(1040000),
  hard_gas_limit_per_block: new BigNumber(5200000),
  proof_of_work_threshold: new BigNumber(70368744177663),
  minimal_stake: new BigNumber(8000000000),
  michelson_maximum_type_size: 1000,
  seed_nonce_revelation_tip: new BigNumber(125000),
  origination_size: 257,
  block_security_deposit: new BigNumber(640000000),
  endorsement_security_deposit: new BigNumber(2500000),
  baking_reward_per_endorsement: [new BigNumber(78125), new BigNumber(11719)],
  endorsement_reward: [new BigNumber(78125), new BigNumber(52083)],
  cost_per_byte: new BigNumber(250),
  hard_storage_limit_per_operation: new BigNumber(60000),
  quorum_min: 2000,
  quorum_max: 7000,
  min_proposal_quorum: 500,
  initial_endorsers: 192,
  delay_per_missing_endorsement: new BigNumber(4),
  minimal_block_delay: new BigNumber(15),
  liquidity_baking_subsidy: new BigNumber(2500000),
  liquidity_baking_sunset_level: 2032928,
  liquidity_baking_escape_ema_threshold: 1000000,
};
export const blockHeader = {
  protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
  chain_id: 'NetXz969SFaFn8k',
  hash: 'BMZXDPn8kKMCSXX1ZfpkCHBuSeXkwqbEp3MJtEwNB21TNVC3Gsp',
  level: 516500,
  proto: 2,
  predecessor: 'BM4FhgGT16ikghoVoz1WoG5z2pmo24GC9sTrfMk5UB4KEnzjNTu',
  timestamp: '2021-09-27T20:41:55Z',
  validation_pass: 4,
  operations_hash: 'LLoZRW4irfmyGwY5ufakDd52aA1P6bVhn3zpjBbQxdjPvwjeEaDkK',
  fitness: ['01', '000000000007e193'],
  context: 'CoWX5BdtfTGKmmwpwhF9cpU6SqBmP5MqostAPP6b3oZp94PG9V2S',
  priority: 0,
  proof_of_work_nonce: '36055190bec80200',
  liquidity_baking_escape_vote: false,
  signature:
    'sigXwcYckn43nA9uqFKKTqFbkiyhBdKfRd8mbCWHnk4kFqis7unT4VJozBrT7f1pVZNUnTPwHYBqarCdVTRajj5bhWg4qGSF',
};

export const bakingRights = [
  {
    level: 516501,
    delegate: 'mv1XAsUdbF1PgG3iierMq88yzqKNUwhQYsJr',
    priority: 0,
    estimated_time: '2021-09-27T20:42:10Z',
  },
];

export const blockMetadata = {
  protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
  next_protocol: 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV',
  test_chain_status: { status: 'not_running' },
  max_operations_ttl: 120,
  max_operation_data_length: 32768,
  max_block_header_length: 239,
  max_operation_list_length: [
    { max_size: 4194304, max_op: 2048 },
    { max_size: 32768 },
    { max_size: 135168, max_op: 132 },
    { max_size: 524288 },
  ],
  baker: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
  level_info: {
    level: 516500,
    level_position: 516499,
    cycle: 127,
    cycle_position: 403,
    expected_commitment: false,
  },
  voting_period_info: {
    voting_period: { index: 25, kind: 'proposal', start_position: 512001 },
    position: 4498,
    remaining: 15981,
  },
  nonce_hash: null,
  consumed_gas: '0',
  deactivated: [],
  balance_updates: [
    {
      kind: 'contract',
      contract: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
      change: '-640000000',
      origin: 'block',
    },
    {
      kind: 'freezer',
      category: 'deposits',
      delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
      cycle: 127,
      change: '640000000',
      origin: 'block',
    },
    {
      kind: 'freezer',
      category: 'rewards',
      delegate: 'mv1Lz9L2svVx3p9kEaHseLVvkcM3jTJHfFWq',
      cycle: 127,
      change: '16484375',
      origin: 'block',
    },
  ],
  liquidity_baking_escape_ema: 243180,
  implicit_operations_results: [
    {
      kind: 'transaction',
      storage: [Array],
      balance_updates: [Array],
      consumed_gas: '2118',
      consumed_milligas: '2117300',
      storage_size: '4636',
    },
  ],
};
export const attestationRights = [
  {
    level: 151187,
    delegates: [
      {
        delegate: 'mv3Wtqz9MLBqMYPidDPbrpg2trdbJtarXMpT',
        first_slot: 79,
        attestation_power: 326,
        consensus_key: 'mv3Wtqz9MLBqMYPidDPbrpg2trdbJtarXMpT',
      },
    ],
  },
];
export const ballotList = [];
export const ballots = { yay: 0, nay: 0, pass: 0 };
export const currentPeriodKind = {
  voting_period: { index: 25, kind: 'proposal', start_position: 512001 },
  position: 4498,
  remaining: 15981,
};
export const currentProposal = null;
export const currentQuorum = 5500;
export const votesListing = [{ pkh: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV', rolls: 399 }];
export const porposals = [];
export const entryPoints = {
  entrypoints: { main: { prim: 'pair', args: [] }, default: { prim: 'unit' } },
};
export const chainId = 'NetXz969SFaFn8k';
export const packData = {
  gas: 'unaccounted',
  packed: '050a000000160000b24ac1e1759565d5c9b69af8450ce7ea3d1ee64c',
};
export const currentPeriod = {
  voting_period: { index: 25, kind: 'proposal', start_position: 512001 },
  position: 4498,
  remaining: 15981,
};
export const successorPeriod = {
  voting_period: { index: 25, kind: 'proposal', start_position: 512001 },
  position: 4539,
  remaining: 15940,
};

export const protocols = {
  protocol: 'PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx',
  next_protocol: 'PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx',
};

export const blockWeeklynetResponse = {
  protocol: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
  chain_id: 'NetXrxsLyu6hTHx',
  hash: 'BLxSQZzbnjL8yWqo8fJDE6cy2ATPmqQSaLKtheFBzAz4QVTcm5h',
  header: {
    level: 8215,
    proto: 2,
    predecessor: 'BL9zTL6ejYpVwLLDNvZayft5PADYZMit3GPV3u3huQtYLgfnHFb',
    timestamp: '2022-09-14T21:08:52Z',
    validation_pass: 4,
    operations_hash: 'LLob52r9i4cfn4uarsAfQhMAQrHrTgho8snr4kAaiP3tjMptaQ5Vg',
    fitness: ['02', '00002017', '', 'ffffffff', '00000000'],
    context: 'CoWA7xHEpEUv7eLhNHQ7eq6kYQU2J87e9CiMDxHimZ7g9J8aTNCh',
    payload_hash: 'vh2abve8bjZpFr1FEEH4ySWtXV4svNb7vZ7spty8RGEAQuAPzowv',
    payload_round: 0,
    proof_of_work_nonce: 'd84ec51000000000',
    liquidity_baking_toggle_vote: 'pass',
    signature:
      'sigYFwK4Y6br6JKypqywernuthHE8oJmVBno7c9n2aM4VN5buviZFu7ABU84C3Lo2bBtrhh563k9Licq2WGoGLgqnpR7vYku',
  },
  metadata: {
    protocol: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
    next_protocol: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
    test_chain_status: {
      status: 'not_running',
    },
    max_operations_ttl: 120,
    max_operation_data_length: 32768,
    max_block_header_length: 289,
    max_operation_list_length: [
      {
        max_size: 4194304,
        max_op: 2048,
      },
      {
        max_size: 32768,
      },
      {
        max_size: 135168,
        max_op: 132,
      },
      {
        max_size: 524288,
      },
    ],
    proposer: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
    baker: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
    level_info: {
      level: 8215,
      level_position: 8214,
      cycle: 64,
      cycle_position: 22,
      expected_commitment: false,
    },
    voting_period_info: {
      voting_period: {
        index: 64,
        kind: 'proposal',
        start_position: 8192,
      },
      position: 22,
      remaining: 105,
    },
    nonce_hash: null,
    deactivated: [],
    balance_updates: [
      {
        kind: 'accumulator',
        category: 'block fees',
        change: '-1066',
        origin: 'block',
      },
      {
        kind: 'minted',
        category: 'baking rewards',
        change: '-10000000',
        origin: 'block',
      },
      {
        kind: 'contract',
        contract: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
        change: '10001066',
        origin: 'block',
      },
      {
        kind: 'minted',
        category: 'baking bonuses',
        change: '-9999238',
        origin: 'block',
      },
      {
        kind: 'contract',
        contract: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
        change: '9999238',
        origin: 'block',
      },
    ],
    liquidity_baking_toggle_ema: 0,
    implicit_operations_results: [
      {
        kind: 'transaction',
        storage: [
          {
            int: '1',
          },
          {
            int: '20535000100',
          },
          {
            int: '100',
          },
          {
            bytes: '01e927f00ef734dfc85919635e9afc9166c83ef9fc00',
          },
          {
            bytes: '0115eb0104481a6d7921160bc982c5e0a561cd8a3a00',
          },
        ],
        balance_updates: [
          {
            kind: 'minted',
            category: 'subsidy',
            change: '-2500000',
            origin: 'subsidy',
          },
          {
            kind: 'contract',
            contract: 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
            change: '2500000',
            origin: 'subsidy',
          },
        ],
        consumed_milligas: '204995',
        storage_size: '4632',
      },
    ],
    proposer_consensus_key: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
    baker_consensus_key: 'mv1WiQugSyz2CQoES3gBxbDhdJLymsF7Mk1n',
    consumed_milligas: '6009000',
  },
  operations: [
    [],
    [],
    [],
    [
      {
        protocol: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
        chain_id: 'NetXrxsLyu6hTHx',
        hash: 'oohBkdej63Xf68KKAi9KfBUKzzX9NDQ6uqUa99bgWUCjL5JBAF1',
        branch: 'BMHnqNtChbedSiBp9XPMmsMHKDmFVkHN64CP1ohyeA2imwLc3W9',
        contents: [
          {
            kind: 'reveal',
            source: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
            fee: '358',
            counter: '1825',
            gas_limit: '1000',
            storage_limit: '0',
            public_key: 'edpkuyMNjhh4w8S7iwuKh6bJgE4cjfSEvRRAXC9qHQUE1u9avfZykW',
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
                  change: '-358',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '358',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '1000000',
              },
            },
          },
          {
            kind: 'transfer_ticket',
            source: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
            fee: '708',
            counter: '1826',
            gas_limit: '5009',
            storage_limit: '130',
            ticket_contents: {
              string: 'foobar',
            },
            ticket_ty: {
              prim: 'string',
            },
            ticket_ticketer: 'KT1P57aaa5RgxqMdgoUoerWg8HVwXjbP2vxS',
            ticket_amount: '2',
            destination: 'KT1BnDCAv62hqTQ3kDnMxWGKVpEgdQgX3TPm',
            entrypoint: 'default',
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
                  change: '-708',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '708',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                balance_updates: [
                  {
                    kind: 'contract',
                    contract: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
                    change: '-16500',
                    origin: 'block',
                  },
                  {
                    kind: 'burned',
                    category: 'storage fees',
                    change: '16500',
                    origin: 'block',
                  },
                ],
                consumed_milligas: '2122881',
                paid_storage_size_diff: '66',
              },
              internal_operation_results: [
                {
                  kind: 'transaction',
                  source: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
                  nonce: 0,
                  amount: '0',
                  destination: 'KT1BnDCAv62hqTQ3kDnMxWGKVpEgdQgX3TPm',
                  parameters: {
                    entrypoint: 'default',
                    value: {
                      prim: 'Pair',
                      args: [
                        {
                          bytes: '019eee1d62435cc1a5248d89bade87b9760bd7644300',
                        },
                        {
                          prim: 'Pair',
                          args: [
                            {
                              string: 'foobar',
                            },
                            {
                              int: '2',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      prim: 'Some',
                      args: [
                        {
                          prim: 'Pair',
                          args: [
                            {
                              bytes: '019eee1d62435cc1a5248d89bade87b9760bd7644300',
                            },
                            {
                              prim: 'Pair',
                              args: [
                                {
                                  string: 'foobar',
                                },
                                {
                                  int: '2',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    balance_updates: [
                      {
                        kind: 'contract',
                        contract: 'mv1MrAxeLrJ7VTe7fBkzaNFJhHvZMMmMA2CJ',
                        change: '-11000',
                        origin: 'block',
                      },
                      {
                        kind: 'burned',
                        category: 'storage fees',
                        change: '11000',
                        origin: 'block',
                      },
                    ],
                    consumed_milligas: '2785855',
                    storage_size: '90',
                    paid_storage_size_diff: '44',
                  },
                },
              ],
            },
          },
        ],
        signature:
          'sigcwwEnrdbzVXzm2hiiU8KoDK8rxgDzU5GaDj4YGounA53n2kNKQYunVeV5jfqo5hVdzcjskKW8P5WzQLPpDeAJNKB2wHmh',
      },
    ],
  ],
};

export const ticketBalancesResponse = [
  {
    ticketer: 'KT1X6mCNdfQZSpyU9zZw9sWckPVJyz2X8vwD',
    content_type: {
      prim: 'string',
    },
    content: {
      string: 'ticket1',
    },
    amount: '1',
  },
];

export const aiLaunchCycle = 6;

export const pendingOperationsResponse = {
  applied: [
    {
      hash: 'onjTGvtnaudo1o5sfTe51XEumhsENAhM7oMzhvsSXzZFXNcj1LE',
      branch: 'BLvb5tzmepwJkxhRYCnnQeYXqRWhUvdmx4NbpVK9w4nkM6tdXEr',
      contents: [
        {
          kind: 'preendorsement',
          slot: 14,
          level: 128135,
          round: 0,
          block_payload_hash: 'vh3Tk5KEy88s4scEbJM1n6vzYdYSn3PNmsH5uSP4zoLccNVyXAZd',
        },
      ],
      signature:
        'sigNWXUeYUraaGi1GrxjrqKTfk7KF8xRG4pABA1qeZi8bQWRmcSmDWD6BehCNC1qNDMgQkf3JdEFHKuomToBza2iGucg9SuC',
    },
  ],
  refused: [
    {
      hash: 'ongFJ3rNnTwratXX2mTHN8MLww2rG11BeJwiPGxr2z2KdESZKKG',
      protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
      branch: 'BLf8hVJk9kK539kTKQ9PHFjtet3nJuAKYGqCqvFuHTZQWavrP7u',
      contents: [
        {
          kind: 'reveal',
          source: 'mv2Ze2uskjTE45Xb5gzBQoygbxR77Z3vzi77',
          fee: '374',
          counter: '54971',
          gas_limit: '1100',
          storage_limit: '0',
          public_key: 'sppk7c9pb7WyLmaw2JwHyH2PYeXcmALCnGwHzVCTfzx33XMV8bW3aT7',
        },
        {
          kind: 'origination',
          source: 'mv2Ze2uskjTE45Xb5gzBQoygbxR77Z3vzi77',
          fee: '544',
          counter: '54972',
          gas_limit: '600000',
          storage_limit: '319',
          balance: '0',
          script: {
            code: [
              { prim: 'parameter', args: [{ prim: 'string' }] },
              { prim: 'storage', args: [{ prim: 'string' }] },
              {
                prim: 'code',
                args: [
                  [
                    { prim: 'CAR' },
                    { prim: 'PUSH', args: [{ prim: 'string' }, { string: 'Hello ' }] },
                    { prim: 'CONCAT' },
                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                    { prim: 'PAIR' },
                  ],
                ],
              },
            ],
            storage: { string: 'test' },
          },
        },
      ],
      signature:
        'sigaD9KjwZXtfhUEpxGirsvNWyScLKQVFQM9kkFB4sTgixfwnJD2D9wt2Km1CM5o2ExGGRTZGLxAr1dZDESurwJusiuHKQvZ',
      error: [
        {
          kind: 'permanent',
          id: 'proto.016-PtMumbai.prefilter.fees_too_low',
        },
      ],
    },
  ],
  outdated: [
    {
      hash: 'oneJE697j4ZNCnhoEsbyPyj4Y5MmyQh4xX6FU3HEGzKnaJkdL5B',
      protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
      branch: 'BLf4UgJixDsXcRnirtBzfst8uzzkcpbBjXQuMmzwwJwD75gh3GU',
      contents: [
        {
          kind: 'preendorsement',
          slot: 15,
          level: 128095,
          round: 0,
          block_payload_hash: 'vh3Xu8Y1EQDMGFYaLXiau3sLukEWGjs3zHW7jynH1m7RaLTqXJpw',
        },
      ],
      signature:
        'sigsVPdVAmQZrCeucDX5QNjz3H4jNWGfVEZRhjXBGg8ZSxWRK2cGdgUCdyDF47DctaJXqAbMwMHB24En9qWj4mEaTwWMC4SN',
      error: [
        {
          kind: 'Preendorsement',
          id: 'proto.016-PtMumbai.validate.consensus_operation_for_old_level',
          expected: 128096,
          provided: 128095,
        },
      ],
    },
  ],
  branch_refused: [],
  branch_delayed: [],
  unprocessed: [],
};

export const ticketUpdatesResponse = {
  protocol: 'PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW',
  chain_id: 'NetXizpkH94bocH',
  hash: 'BLAoXLidLrRnUQaUNPanuiaGTS3Ce2azZQysz2mMTCUnFg2799j',
  header: {},
  metadata: {},
  operations: [
    [
      {
        protocol: 'PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW',
        chain_id: 'NetXizpkH94bocH',
        hash: 'onrYwrpBkF54XTGkxQBUhEcVhgqoava49oWMo5DmGgrh3yqodYN',
        branch: 'BKmKts5CAQ2oLv3UvB3jWTMNHKsbxSofMeaNGLWA8WAavY9jqWb',
        contents: [
          {
            kind: 'transaction',
            source: 'mv1DK8x7eHCgRB2zdFQ6wHkMuyBPnBpKW3Ps',
            fee: '2122',
            counter: '76',
            gas_limit: '18472',
            storage_limit: '929',
            amount: '0',
            destination: 'KT1JoRgUcR6NApwMLnBZ2pehCzp8tR4HtkHj',
            parameters: {
              entrypoint: 'exchange_tickets',
              value: {
                int: '2',
              },
            },
            metadata: {
              operation_result: {
                status: 'applied',
                storage: {
                  prim: 'Pair',
                  args: [
                    {
                      prim: 'Pair',
                      args: [
                        {
                          prim: 'None',
                        },
                        [],
                      ],
                    },
                    {
                      prim: 'Pair',
                      args: [
                        {
                          bytes: '00002a3c4ef8b90e40d0a0f3d793e78da4d40ff7ab05',
                        },
                        {
                          bytes: '016a41f23d91041e57a4cf22d0ebf27bba7bc67b2c00',
                        },
                      ],
                    },
                  ],
                },
                ticket_updates: [
                  {
                    ticket_token: {
                      ticketer: 'KT1JGcC8DuWHcShu6XvtfgKVnV2zcYsZ4TVH',
                      content_type: {
                        prim: 'unit',
                      },
                      content: {
                        prim: 'Unit',
                      },
                    },
                    updates: [
                      {
                        account: 'KT1JoRgUcR6NApwMLnBZ2pehCzp8tR4HtkHj',
                        amount: '-2',
                      },
                    ],
                  },
                ],
                consumed_milligas: '4077693',
                storage_size: '5600',
              },
              internal_operation_results: [
                {
                  kind: 'transaction',
                  source: 'KT1JGcC8DuWHcShu6XvtfgKVnV2zcYsZ4TVH',
                  nonce: 1,
                  amount: '0',
                  destination: 'KT1JoRgUcR6NApwMLnBZ2pehCzp8tR4HtkHj',
                  parameters: {
                    entrypoint: 'receive_cards',
                    value: [],
                  },
                  result: {
                    status: 'applied',
                    ticket_receipt: [
                      {
                        ticket_token: {
                          ticketer: 'KT1JGcC8DuWHcShu6XvtfgKVnV2zcYsZ4TVH',
                          content_type: {
                            prim: 'string',
                          },
                          content: {
                            string: 'Ferosinge',
                          },
                        },
                        updates: [
                          {
                            account: 'KT1JoRgUcR6NApwMLnBZ2pehCzp8tR4HtkHj',
                            amount: '1',
                          },
                        ],
                      },
                    ],
                    consumed_milligas: '7372756',
                    storage_size: '6015',
                    paid_storage_size_diff: '380',
                  },
                },
              ],
            },
          },
        ],
        signature:
          'sigXx1HE97LT5dFaBDGyRZJQvGes8zgTwrcbHidn93VjCAoULiGiqFA2ArzMW89Pt81TuEP5SZoqKpSGfg6qhjhEgQ5Tza9H',
      },
    ],
  ],
};

export const smartRollupOriginateResponse = {
  protocol: 'PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc',
  chain_id: 'NetXQw6nWSnrJ5t',
  hash: 'BLFkxJtgGauWp3PXUiX2PuFfEj96WdP94Mtv2nyHcGkEFtvKr6Q',
  header: {},
  metadata: {},
  operations: [
    [],
    [
      {
        protocol: 'PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc',
        chain_id: 'NetXQw6nWSnrJ5t',
        hash: 'ooMhfCwjiBzaCcYSxo1kyk4tQMgeDwu22NwPdjU8Yvaybyn26z5',
        branch: 'BLsmwYwwt1GsoQ2ZSzqYncwbpyhVS52UzsQpEMgbpgzuKCYYw9s',
        contents: [
          {
            kind: 'smart_rollup_originate',
            source: 'mv1UnqCHsfF7YyiQy586noUkvJnmSk5YQoEs',
            fee: '1497',
            counter: '19783',
            gas_limit: '2849',
            storage_limit: '6572',
            pvm_kind: 'wasm_2_0_0',
            kernel:
              '23212f7573722f62696e2f656e762073680a6578706f7274204b45524e454c3d22303036313733366430313030303030303031323830373630303337663766376630313766363030323766376630313766363030353766376637663766376630313766363030313766303036303031376630313766363030323766376630303630303030303032363130333131373336643631373237343566373236663663366337353730356636333666373236353061373236353631363435663639366537303735373430303030313137333664363137323734356637323666366336633735373035663633366637323635306337373732363937343635356636663735373437303735373430303031313137333664363137323734356637323666366336633735373035663633366637323635306237333734366637323635356637373732363937343635303030323033303530343033303430353036303530333031303030313037313430323033366436353664303230303061366236353732366536353663356637323735366530303036306161343031303432613031303237663431666130303266303130303231303132303030326630313030323130323230303132303032343730343430343165343030343131323431303034316534303034313030313030323161306230623038303032303030343163343030366230623530303130353766343166653030326430303030323130333431666330303266303130303231303232303030326430303030323130343230303032663031303032313035323030313130303432313036323030343230303334363034343032303030343130313661323030313431303136623130303131613035323030353230303234363034343032303030343130373661323030363130303131613062306230623164303130313766343164633031343138343032343139303163313030303231303034313834303232303030313030353431383430323130303330623062333830353030343165343030306231323266366236353732366536353663326636353665373632663732363536323666366637343030343166383030306230323030303130303431666130303062303230303032303034316663303030623032303030303030343166653030306230313031220a',
            parameters_ty: {
              prim: 'bytes',
            },
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1UnqCHsfF7YyiQy586noUkvJnmSk5YQoEs',
                  change: '-1497',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '1497',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                balance_updates: [
                  {
                    kind: 'contract',
                    contract: 'mv1UnqCHsfF7YyiQy586noUkvJnmSk5YQoEs',
                    change: '-1638000',
                    origin: 'block',
                  },
                  {
                    kind: 'burned',
                    category: 'storage fees',
                    change: '1638000',
                    origin: 'block',
                  },
                ],
                address: 'sr1K3AUoYanTUup53MCb8DkbvLsiAmFuXfFm',
                genesis_commitment_hash: 'src14Khe1dnFbwrtTSEi4XWxxM7ej7L29YmduJhQY7U24Y523dmMtw',
                consumed_milligas: '2748269',
                size: '6552',
              },
            },
          },
        ],
        signature:
          'sigiKU2RGwT94sQBn4EFFy4SSVgYSGbULKzUneRyi8rURMg94uAJyYPgCpEfcjR8mkaSAoYnRCxqmit8XzVoHdbxGKoNfXRB',
      },
    ],
  ],
};

export const smartRollupAddMessagesResponse = {
  protocol: 'PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc',
  chain_id: 'NetXQw6nWSnrJ5t',
  hash: 'BLFkxJtgGauWp3PXUiX2PuFfEj96WdP94Mtv2nyHcGkEFtvKr6Q',
  header: {},
  metadata: {},
  operations: [
    [],
    [
      {
        protocol: 'PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc',
        chain_id: 'NetXQw6nWSnrJ5t',
        hash: 'op3GFxBQArsgC3eHjEiw4Qp31jHrprKfftcgwibKAwnANpzWncG',
        branch: 'BL7USLDrUeuMzDUX6PdxuCbhngMYCcnmy9WFuotiVRmdBftZeDv',
        contents: [
          {
            kind: 'smart_rollup_add_messages',
            source: 'mv2VyMfL7y978FiLR5S33M7U5XbGtM21qveH',
            fee: '398',
            counter: '12191',
            gas_limit: '1103',
            storage_limit: '0',
            message: [
              '0000000031010000000b48656c6c6f20776f726c6401cc9e352a850d7475bf9b6cf103aa17ca404bc9dd000000000764656661756c74',
            ],
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv2VyMfL7y978FiLR5S33M7U5XbGtM21qveH',
                  change: '-398',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '398',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '1002777',
              },
            },
          },
        ],
        signature:
          'sigSUjvKxjAZ4dBWbo4idKKwFDVfLtYscMMqHoQY8KgyghtyaswECPaBhjK921vj2uEsdKD7WJTeVVT1ZDcvwp8rkRuEW9kv',
      },
    ],
  ],
};

export const smartRollupExecuteOutboxMessageResponse = {
  protocol: 'PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc',
  chain_id: 'NetXQw6nWSnrJ5t',
  hash: 'BLFkxJtgGauWp3PXUiX2PuFfEj96WdP94Mtv2nyHcGkEFtvKr6Q',
  header: {},
  metadata: {},
  operations: [
    [],
    [
      {
        protocol: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
        chain_id: 'NetXxkAx4woPLyu',
        hash: 'opKmyxpe2XWDbynt3YPSouVpf55ChKZxwCradz6AYJ6rMFFEsRZ',
        branch: 'BKqyTFKbU7bMrnN393YCBJ28quXG9zMwuPq61Z5ce4gVjsAgZmk',
        contents: [
          {
            kind: 'smart_rollup_execute_outbox_message',
            source: 'mv1KPkmkC2vMBf5DE9fARbRuAPhqdovWqRQ4',
            fee: '1618',
            counter: '13',
            gas_limit: '6485',
            storage_limit: '36',
            rollup: 'sr1J4MBaQqTGNwUqfcUusy3xUmH6HbMK7kYy',
            cemented_commitment: 'src13aUmJ5fEVJJM1qH1n9spuppXVAWc8wmHpTaC81pz5rrZN5e628',
            output_proof:
              '030002268259c7843df9a14e2cd5b4d187d3d603a535c64f0cc3ce3c9a3bdd5ecb3d95268259c7843df9a14e2cd5b4d187d3d603a535c64f0cc3ce3c9a3bdd5ecb3d950005820764757261626c65d07eb5216be3fcfd8317136e559c80d1a5eeb8f7b684c2101e92efb2b1b9c5324603746167c00800000004536f6d650003c004a99c0224241978be1e088cf42eaca4bc53a6266842bcbf0ecad4400abeb2e5820576616c7565810370766d8107627566666572738205696e707574820468656164c00100066c656e677468c00100066f75747075740004820132810a6c6173745f6c6576656cc0040000087a0133810f76616c69646974795f706572696f64c00400013b0082013181086f7574626f7865730028001700090006820432313337820468656164c00100066c656e677468c0010004323133380003810468656164c001008208636f6e74656e7473810130c03a000000360000000031010000000b48656c6c6f20776f726c6401bdb6f61e4f12c952f807ae7d3341af5367887dac000000000764656661756c74066c656e677468c00101c0c619e3af574a846a44f61eb98ae7a0007d1e76039f6729e3e113c2f993dad600c0b7b6d5ebea80e0e4b148815c768de7570b7a5ad617a2bf3a3f989df81be9a224c055b19953c4aa26132da57ef8205c8ab61b518fb6e4c87c5853298042d17c98bbc08bac9f033f9d823c04b4de152892edc0767d0634c51c5d311f46a127f730f6950134810d6d6573736167655f6c696d6974c002a401047761736dd04822a3ddd2900dcb30a958d10818ea3d90407a79f88eab967063bac2452e99c7268259c7843df9a14e2cd5b4d187d3d603a535c64f0cc3ce3c9a3bdd5ecb3d950000085a000000000031010000000b48656c6c6f20776f726c6401bdb6f61e4f12c952f807ae7d3341af5367887dac000000000764656661756c74',
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1KPkmkC2vMBf5DE9fARbRuAPhqdovWqRQ4',
                  change: '-1618',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '1618',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                balance_updates: [
                  {
                    kind: 'contract',
                    contract: 'mv1KPkmkC2vMBf5DE9fARbRuAPhqdovWqRQ4',
                    change: '-1250',
                    origin: 'block',
                  },
                  {
                    kind: 'burned',
                    category: 'storage fees',
                    change: '1250',
                    origin: 'block',
                  },
                ],
                ticket_updates: [],
                consumed_milligas: '4731015',
                paid_storage_size_diff: '5',
              },
              internal_operation_results: [
                {
                  kind: 'transaction',
                  source: 'sr1J4MBaQqTGNwUqfcUusy3xUmH6HbMK7kYy',
                  nonce: 0,
                  amount: '0',
                  destination: 'KT1RstTQHYxjwHpN8jHaqBPgtxJdMSC4cc3w',
                  parameters: {
                    entrypoint: 'default',
                    value: {
                      string: 'Hello world',
                    },
                  },
                  result: {
                    status: 'applied',
                    storage: {
                      string: 'Hello world',
                    },
                    balance_updates: [
                      {
                        kind: 'contract',
                        contract: 'mv1KPkmkC2vMBf5DE9fARbRuAPhqdovWqRQ4',
                        change: '-2750',
                        origin: 'block',
                      },
                      {
                        kind: 'burned',
                        category: 'storage fees',
                        change: '2750',
                        origin: 'block',
                      },
                    ],
                    consumed_milligas: '1653300',
                    storage_size: '52',
                    paid_storage_size_diff: '11',
                  },
                },
              ],
            },
          },
        ],
        signature:
          'sigs8LVwSkqcMLzTVZWa1yS8aNz26A8bzR6QUHws5uVELh6kcmH7dWz5aKPqW3RXoFfynf5kVCvLJcsP3ucB5P6DEbD2YcQR',
      },
    ],
  ],
};

export const smartRollupCementResponse = {
  protocol: 'PtNairobiyssHuh87hEhfVBGCVrK3WnS8Z2FT4ymB5tAa4r1nQf',
  chain_id: 'NetXyuzvDo2Ugzb',
  hash: 'BM2HKHuf7cx6d5Uq6MG4P6czUepc5Tw9d71M7h8E4MdmPHTuvMN',
  header: {},
  metadata: {},
  operations: [
    [
      {
        protocol: 'PtNairobiyssHuh87hEhfVBGCVrK3WnS8Z2FT4ymB5tAa4r1nQf',
        chain_id: 'NetXyuzvDo2Ugzb',
        hash: 'ooty1P68jMrhZ3HXRWrpnvzaWS4Rdcvxbu6LdwgQYcpXwvfqG9U',
        branch: 'BKs1WHe13yyEHu68UEJ7Yk7YrM7axhxuofjJYeW9YbY3sAYjx7Z',
        contents: [
          {
            kind: 'smart_rollup_cement',
            source: 'mv1NgAgPTpVp5Pfp2cHGseGgzgU5MCvRigt8',
            fee: '977',
            counter: '150010',
            gas_limit: '6986',
            storage_limit: '0',
            rollup: 'sr1CCHLfB1jjz4ikB2bm4XGPvTjafVgUzhLB',
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1NgAgPTpVp5Pfp2cHGseGgzgU5MCvRigt8',
                  change: '-977',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '977',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '6884964',
                inbox_level: 337913,
                commitment_hash: 'src12wj4nwXiEkwYacLfkLR8X8Md76LNuMzwUgTwgLA9Y3DANaeRay',
              },
            },
          },
        ],
        signature:
          'sigPnRSud9gGtNAcAcZkv6kYoa5Nsp1u8388DBjRgUeuefZHRQxkXdVZxZy3QqVesBasDHQmAhp8yySYH5YMbzzbNz2JLZRw',
      },
    ],
  ],
};

export const smartRollupPublishResponse = {
  protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
  chain_id: 'NetXgbcrNtXD2yA',
  hash: 'BL9UBPLykShAAvAebxCiZxELFjSJBxhbQXC12pfZb2ddwtCa1XU',
  header: {},
  metadata: {},
  operations: [
    [
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'opaTRLSsdqtd8APeDHqU3BxvqYDg4Lor3roR2cdh3V3Hv1VXucm',
        branch: 'BM8ZBBpLnURFuRB1Wd6s7Z6iN3LiddUkKM4vsTS3LgqSmFMtCLE',
        contents: [
          {
            kind: 'smart_rollup_publish',
            source: 'mv1BPPMvozPCe1NS8NnAM7zpXYBxfnTV26eh',
            fee: '964',
            counter: '41266',
            gas_limit: '6418',
            storage_limit: '0',
            rollup: 'sr1AE6U3GNzE8iKzj6sKS5wh1U32ogeULCoN',
            commitment: {
              compressed_state: 'srs13FywcbcZV9VvHxdVkYK83Ch4477cqHMgM8d5oT955yf4XXMvKS',
              inbox_level: 197151,
              predecessor: 'src12i7dL2z9VbgshFDdGFP5TPBoJu6WnZNWJXGa1QQgPTErVPPtd8',
              number_of_ticks: '880000000000',
            },
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1BPPMvozPCe1NS8NnAM7zpXYBxfnTV26eh',
                  change: '-964',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '964',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '6317837',
                staked_hash: 'src13TanyZ7RvSULqVb2tjx1zRVw2jyJC2ToHLz1ZKg38sZ4HBYdSN',
                published_at_level: 197154,
                balance_updates: [],
              },
            },
          },
        ],
        signature:
          'sigiYrQFjQLnYe94Vc9VH1jGEkfSAsBGkZzBVL8jLgBK88vhbLM6fBD2x24wBhBdN718WRRTSMBqCGR7Zp9Z5eDmDotgGaTu',
      },
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'onjnz6RP5FPXafHfWupSb9Hv3uJZt5BGpVHPTisJkLsYEjP114H',
        branch: 'BKyGmNai1eFrUv3BBMz1ZNhtmMVW7KQH9x8DEj2egDZEH86ajno',
        contents: [
          {
            kind: 'smart_rollup_publish',
            source: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
            fee: '956',
            counter: '32544',
            gas_limit: '7298',
            storage_limit: '0',
            rollup: 'sr1LhGA2zC9VcYALSifpRBCgDiQfDSQ6bb4x',
            commitment: {
              compressed_state: 'srs12r6jebz4VTuP1C58mHGzezqFQdV6n5pdaqEamDo4FvD9omn9YJ',
              inbox_level: 41806,
              predecessor: 'src12rCbiTAvYntPQXcMoqdNh6ZXXBmfxzhaxZsxsbRKGC7bE3L1mD',
              number_of_ticks: '880000000000',
            },
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
                  change: '-956',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '956',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '7197891',
                staked_hash: 'src14ErSMhBhf3Hi6isN3cEdR4RgxT5egSjQYtgHEc5NP9qVFgmcpE',
                published_at_level: 41809,
                balance_updates: [
                  {
                    kind: 'contract',
                    contract: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
                    change: '-10000000000',
                    origin: 'block',
                  },
                  {
                    kind: 'freezer',
                    category: 'bonds',
                    contract: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
                    bond_id: {
                      smart_rollup: 'sr1LhGA2zC9VcYALSifpRBCgDiQfDSQ6bb4x',
                    },
                    change: '10000000000',
                    origin: 'block',
                  },
                ],
              },
            },
          },
        ],
        signature:
          'sigosbVhqFLPBoXUhtjwZ7UBDq4veP1pGECDm2nc7iviBE8gqmzGFgh9tPMviTDhETd4rjCwcRCCMwEL5hBu3tfgNJcydnrS',
      },
    ],
  ],
};

export const smartRollupRefuteResponse = {
  protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
  chain_id: 'NetXgbcrNtXD2yA',
  hash: 'BMRMq4e7QgU2xw5hHyFtDgv4rZCGCRbF9Z8FhWoAwmprSsJKPGx',
  header: {},
  operations: [
    [
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'oofTxRxHWQCYo9B4vmpLY7FZfQXrH9s1n7rRU7wHjazhrqVu2oJ',
        branch: 'BLDgHuXsD2qtEPy8SYcYCk1Wt2uDdDXUYXYmbfX6g1s1an8L5u6',
        contents: [
          {
            kind: 'smart_rollup_refute',
            source: 'mv1HiRtxzhWHA4fMGqrbCJ7rdqsWKgoUmHZm',
            fee: '2096',
            counter: '32553',
            gas_limit: '6299',
            storage_limit: '0',
            rollup: 'sr1LhGA2zC9VcYALSifpRBCgDiQfDSQ6bb4x',
            opponent: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
            refutation: {
              refutation_kind: 'move',
              choice: '176000000003',
              step: {
                pvm_step:
                  '03000298e4e3d5c88da366e885edf675ffd7a5087c8e0a2fcd508e7951113fe4c1491810067c06a78b88cb7c3e60c56b47ba9e14c922dbdbd4811ac6fee80a309620630005820764757261626c6582066b65726e656cd07d20c53bdd5b536a6be9c4cdad16e69a9af40b93a6564655fffd88bba050519008726561646f6e6c7982066b65726e656cd0a645771d9d5228a31312b282119c596699ccb6b60b93d759c2072a493ddbb5740c7761736d5f76657273696f6e8101408208636f6e74656e7473810130c10200322e302e30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066c656e677468c008000000000000000503746167c00800000004536f6d650003810370766d00050004000381166f7574626f785f76616c69646974795f706572696f64c00400013b0082136c6173745f746f705f6c6576656c5f63616c6cc00680c0abd38f05196d6178696d756d5f7265626f6f74735f7065725f696e707574c002e80781146f7574626f785f6d6573736167655f6c696d6974c002a401810c6d61785f6e625f7469636b73c00580dc9afd28820576616c7565810370766d8107627566666572738205696e7075740003810468656164c001008208636f6e74656e7473d06e2c0a5b371a53e76a9b7f221a5baa67170b3f9f43205fb06c0649123cec2358066c656e677468c00103066f75747075740004820132810a6c6173745f6c6576656cc0040000a33f0133810f76616c69646974795f706572696f64c00400013b0082013181086f7574626f786573d0ccbff4c181451166adb153f7a1631e9f036832f8e5c82acd8e8c12876eeeda870134810d6d6573736167655f6c696d6974c002a401047761736d00048205696e707574c0050000a33f0203746167c00b0000000770616464696e67820c63757272656e745f7469636bc00683c0abd38f050e7265626f6f745f636f756e746572c002e907',
              },
            },
          },
        ],
        signature:
          'sigQYS3D4Ppabx7MhsmJyHkQUo9cmAfieSykZXWnGmvVbn6W4cQvVvxbRXDPSnaNVn72N2ih9QwovsPw7Cv1eoELapdNjLTB',
      },
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'opUUHJwTXLDe2jMwvTWtC3bwoEQukhBjdPiYa5Ri1qBo7TiYJpq',
        branch: 'BMJcT8gh5PgoTvjWi6SQSUGn7gbx3Bb2rSKcdJQKB9PbzpS7FvH',
        contents: [
          {
            kind: 'smart_rollup_refute',
            source: 'mv18fba4Pv3BEFxBxw7LDGxHGrSvaiDY2Wei',
            fee: '943',
            counter: '25002',
            gas_limit: '6109',
            storage_limit: '0',
            rollup: 'sr1Ce7znpA1ea2YZca3v1CefxqXMhqYgDEXR',
            opponent: 'mv1UGgEGgfYo7qC2xzSVgzX3Bj6aKxfCXYTM',
            refutation: {
              refutation_kind: 'start',
              player_commitment_hash: 'src14Liog4xxPoZ55AgpBpeDweFSxHK6b3zbybhp7ChsWbM9g1Jsrd',
              opponent_commitment_hash: 'src12q2zZyxuK5UeYPQYSutA6RPMv7sZDtJ7oAWxAytuJC3rjvWct6',
            },
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv18fba4Pv3BEFxBxw7LDGxHGrSvaiDY2Wei',
                  change: '-943',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '943',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                consumed_milligas: '6008940',
                game_status: 'ongoing',
                balance_updates: [],
              },
            },
          },
        ],
        signature:
          'sigg9W1bDVuvKgs7WDq9Q4wKp2oTtMwWsm1tt7khCYYCa4PZ3fvsWUWktuAR8SyTzmywKmBWX752VcDb28JzHUmYJ7De94Kt',
      },
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'onqrLmUkjEowxhiS3t2CmxBCKQAEUf3PA4d8RD3zja9v2PtU11a',
        branch: 'BMbQxrYG4uUmjqy2Dht5FUeskoiQcebXqN46H9kt26hSzZ5W3Qs',
        contents: [
          {
            kind: 'smart_rollup_refute',
            source: 'mv1MqSDoqWk6YBvG1ZtKu2P5uSrgymPzQQYR',
            fee: '1989',
            counter: '32546',
            gas_limit: '4333',
            storage_limit: '0',
            rollup: 'sr1LhGA2zC9VcYALSifpRBCgDiQfDSQ6bb4x',
            opponent: 'mv1HiRtxzhWHA4fMGqrbCJ7rdqsWKgoUmHZm',
            refutation: {
              refutation_kind: 'move',
              choice: '0',
              step: [
                {
                  state: 'srs11y1ZCJfeWnHzoX3rAjcTXiphwg8NvqQhvishP3PU68jgSREuk6',
                  tick: '0',
                },
                {
                  state: 'srs12ti4nRqiqahBZedqjgnFx9ZK88KkSgpYD8ns5Q41UMEXGg9w3b',
                  tick: '22000000000',
                },
                {
                  state: 'srs12zdMUHiLiqTAuN81f1NS3rgD1M7fqUtMq4RpWq3wf3QDvsPCxa',
                  tick: '44000000000',
                },
              ],
            },
          },
        ],
        signature:
          'sigojctsjFdB6nv51JNAyRdANvbnSB5NyrfNq5KBnov58Hcqi9d1CHPWYwEJeQgBjjJv5vgQJC37tKMSUJZZoY4pPQj6A2X5',
      },
    ],
  ],
};

export const smartRollupRecoverBondResponse = {
  protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
  chain_id: 'NetXgbcrNtXD2yA',
  hash: 'BLxusPoX4vzCKAc9qmfS4myFs8KKEJpvwgAuMrccqqPXcn8Rxon',
  header: {},
  metadata: {},
  operations: [
    [
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'opWkyTZEwh5929VqXC4BZgrBSRQ7JvomNTv71rdkx1QAiRLpYAu',
        branch: 'BL5EYnuHPXMTq9s1HR8CcFWkgNHCvoZyVQCU2H2DjSudr6GXgXf',
        contents: [
          {
            kind: 'smart_rollup_recover_bond',
            source: 'mv18JDLdcxN3gxhrxCoM1TLqfkfhcsRLjiVV',
            fee: '1000000',
            counter: '25156',
            gas_limit: '4016',
            storage_limit: '0',
            rollup: 'sr1EYxm4fQjr15TASs2Q7PgZ1LqS6unkZhHL',
            staker: 'mv18JDLdcxN3gxhrxCoM1TLqfkfhcsRLjiVV',
            metadata: {
              balance_updates: [
                {
                  kind: 'contract',
                  contract: 'mv18JDLdcxN3gxhrxCoM1TLqfkfhcsRLjiVV',
                  change: '-1000000',
                  origin: 'block',
                },
                {
                  kind: 'accumulator',
                  category: 'block fees',
                  change: '1000000',
                  origin: 'block',
                },
              ],
              operation_result: {
                status: 'applied',
                balance_updates: [
                  {
                    kind: 'freezer',
                    category: 'bonds',
                    contract: 'mv18JDLdcxN3gxhrxCoM1TLqfkfhcsRLjiVV',
                    bond_id: {
                      smart_rollup: 'sr1EYxm4fQjr15TASs2Q7PgZ1LqS6unkZhHL',
                    },
                    change: '-10000000000',
                    origin: 'block',
                  },
                  {
                    kind: 'contract',
                    contract: 'mv18JDLdcxN3gxhrxCoM1TLqfkfhcsRLjiVV',
                    change: '10000000000',
                    origin: 'block',
                  },
                ],
                consumed_milligas: '3915240',
              },
            },
          },
        ],
        signature:
          'sigPbtnebwMZD1CZUEfFnhcjGuhyLhX2WPEFvQEFKaD6DKeYjMSBD6pc4UkR4zkAw5KdifSH7QdJ7wg9CmsruSi9cUGvqEap',
      },
    ],
  ],
};

export const smartRollupTimeoutResponse = {
  protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
  chain_id: 'NetXgbcrNtXD2yA',
  hash: 'BM5txTKWoRptQ7k8M4hF2SjLQjz7ezriNfaHZQZxNjHsqzESjMu',
  header: {},
  metadata: {},
  operations: [
    [
      {
        protocol: 'PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1',
        chain_id: 'NetXgbcrNtXD2yA',
        hash: 'opZMSbsYYSL1tMKYxgPoDvtaehAt24PSbwuNeQo8ry52KpWwzqa',
        branch: 'BLpiGot997JRMKyrYoP8MmjVMWHHXMiLj17gue86uNaRnip8jux',
        contents: [
          {
            kind: 'smart_rollup_timeout',
            source: 'mv1A8ve91yKr6hi8majbVN5ihSYtc2HHLj8g',
            fee: '753',
            counter: '23077',
            gas_limit: '4647',
            storage_limit: '0',
            rollup: 'sr1QZkk1swognQW3dmiXvga3wVkEgBq7QFjE',
            stakers: {
              alice: 'mv1A8ve91yKr6hi8majbVN5ihSYtc2HHLj8g',
              bob: 'mv1QKB2hj3Ufq2CEDQUDG7jf7J8ti7dSLmbv',
            },
          },
        ],
        signature:
          'sigN53ibLsMQAnkeE7EQZY9ZFkiBgtdsLKtsPdswdvGHU4kPAMh3Arz2fFDGKT3EyKHuYy5G9T6pJtTdfkRuWpN2fgvmH1Pr',
      },
    ],
  ],
};
