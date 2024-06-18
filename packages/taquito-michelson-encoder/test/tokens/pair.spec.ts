import { Schema } from '../../src/taquito-michelson-encoder';
import { createToken } from '../../src/tokens/createToken';
import { PairToken } from '../../src/tokens/pair';
import BigNumber from 'bignumber.js';

describe('Pair token', () => {
  const token = createToken(
    {
      prim: 'pair',
      args: [
        { prim: 'int', annots: ['test'] },
        { prim: 'string', annots: ['test2'] },
      ],
    },
    0
  ) as PairToken;
  describe('Compare', () => {
    test('Compare simple pair', () => {
      expect(token.compare({ test: 1, test2: 'test' }, { test: 2, test2: 'test' })).toEqual(-1);
      expect(token.compare({ test: 3, test2: 'test' }, { test: 2, test2: 'test' })).toEqual(1);
      expect(token.compare({ test: 2, test2: 'test' }, { test: 2, test2: 'test' })).toEqual(0);
      expect(token.compare({ test: 2, test2: 'hello' }, { test: 2, test2: 'test' })).toEqual(-1);
      expect(token.compare({ test: 2, test2: 'test' }, { test: 2, test2: 'hello' })).toEqual(1);
    });
  });

  describe('ToBigMapKey', () => {
    test('Simple pair to big map key', () => {
      const { key, type } = token.ToBigMapKey({ test: 1, test2: 'test' });
      expect(key).toEqual({ prim: 'Pair', args: [{ int: '1' }, { string: 'test' }] });
      expect(type).toEqual({ prim: 'pair', args: [{ prim: 'int' }, { prim: 'string' }] });
    });

    it('Nested pair to big map key', () => {
      const token = createToken(
        {
          prim: 'pair',
          args: [
            { prim: 'int', annots: ['test'] },
            {
              prim: 'pair',
              args: [
                { prim: 'string', annots: ['test2'] },
                { prim: 'string', annots: ['test3'] },
              ],
            },
          ],
        },
        0
      ) as PairToken;
      const { key, type } = token.ToBigMapKey({ test: 1, test2: 'test', test3: 'test' });
      expect(key).toEqual({
        prim: 'Pair',
        args: [{ int: '1' }, { prim: 'Pair', args: [{ string: 'test' }, { string: 'test' }] }],
      });
      expect(type).toEqual({
        prim: 'pair',
        args: [{ prim: 'int' }, { prim: 'pair', args: [{ prim: 'string' }, { prim: 'string' }] }],
      });
    });
  });

  describe('generateSchema', () => {
    it('Should generate the schema properly', () => {
      expect(token.generateSchema()).toEqual({
        __michelsonType: 'pair',
        schema: {
          test: {
            __michelsonType: 'int',
            schema: 'int',
          },
          test2: {
            __michelsonType: 'string',
            schema: 'string',
          },
        },
      });
    });
  });
});

describe('Complexe pair token', () => {
  const complexPair = createToken(
    {
      prim: 'pair',
      args: [
        { prim: 'int', annots: ['%simple'] },
        {
          prim: 'pair',
          args: [
            { prim: 'pair', annots: ['%complex'], args: [{ prim: 'nat' }, { prim: 'string' }] },
            {
              prim: 'pair',
              args: [
                {
                  prim: 'pair',
                  annots: ['%optional'],
                  args: [
                    {
                      prim: 'or',
                      args: [
                        { prim: 'int', annots: ['%int'] },
                        { prim: 'string', annots: ['%string'] },
                      ],
                    },
                    {
                      prim: 'or',
                      args: [
                        { prim: 'int', annots: ['%int'] },
                        { prim: 'string', annots: ['%string'] },
                      ],
                    },
                  ],
                },
                {
                  prim: 'option',
                  annots: ['%last_checked_sig'],
                  args: [
                    {
                      prim: 'pair',
                      args: [
                        {
                          prim: 'pair',
                          args: [
                            { prim: 'bytes', annots: ['%msg'] },
                            { prim: 'address', annots: ['%sender'] },
                          ],
                        },
                        { prim: 'signature', annots: ['%sig_'] },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    0
  ) as PairToken;

  it('Should generate the schema properly', () => {
    expect(complexPair.generateSchema()).toEqual({
      __michelsonType: 'pair',
      schema: {
        simple: {
          __michelsonType: 'int',
          schema: 'int',
        },
        complex: {
          __michelsonType: 'pair',
          schema: {
            '1': {
              __michelsonType: 'nat',
              schema: 'nat',
            },
            '2': {
              __michelsonType: 'string',
              schema: 'string',
            },
          },
        },
        optional: {
          __michelsonType: 'pair',
          schema: {
            '2': {
              __michelsonType: 'or',
              schema: {
                int: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                string: {
                  __michelsonType: 'string',
                  schema: 'string',
                },
              },
            },
            '3': {
              __michelsonType: 'or',
              schema: {
                int: {
                  __michelsonType: 'int',
                  schema: 'int',
                },
                string: {
                  __michelsonType: 'string',
                  schema: 'string',
                },
              },
            },
          },
        },
        last_checked_sig: {
          __michelsonType: 'option',
          schema: {
            __michelsonType: 'pair',
            schema: {
              msg: {
                __michelsonType: 'bytes',
                schema: 'bytes',
              },
              sender: {
                __michelsonType: 'address',
                schema: 'address',
              },
              sig_: {
                __michelsonType: 'signature',
                schema: 'signature',
              },
            },
          },
        },
      },
    });
  });

  it('Should encode object properly', () => {
    expect(
      complexPair.EncodeObject({
        simple: 132138771926046,
        complex: {
          1: 132138771926013,
          2: 'Taquito',
        },
        optional: {
          // or null
          3: { int: 4 }, // or {string: 'aaa'}
          4: { string: 'Mavryk' }, // or {int: 5}
        },
        last_checked_sig: {
          // or null
          msg: '0554657a6f73205369676e6564204d6573736167653a20626561636f6e2d746573742d646170702e6e65746c6966792e6170702f20323032322d30332d30395431393a34313a31382e3035375a203130',
          sender: 'mv1BVZi8XFX8wWoJ3hiiT4RwrG5CJsLJzctu',
          sig_: 'sigfRR4eWYXHRAXafFY5muQoH6Hh43kSLBeDzcPjBsDH5TKQzRATyoMafMtcDp19Gs8BveGbFSm77hzEjioKq2UWKpTF1j6T',
        },
      })
    ).toEqual({
      prim: 'Pair',
      args: [
        {
          int: '132138771926046',
        },
        {
          prim: 'Pair',
          args: [
            {
              prim: 'Pair',
              args: [
                {
                  int: '132138771926013',
                },
                {
                  string: 'Taquito',
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
                      prim: 'Left',
                      args: [
                        {
                          int: '4',
                        },
                      ],
                    },
                    {
                      prim: 'Right',
                      args: [
                        {
                          string: 'Mavryk',
                        },
                      ],
                    },
                  ],
                },
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
                              bytes:
                                '0554657a6f73205369676e6564204d6573736167653a20626561636f6e2d746573742d646170702e6e65746c6966792e6170702f20323032322d30332d30395431393a34313a31382e3035375a203130',
                            },
                            {
                              string: 'mv1BVZi8XFX8wWoJ3hiiT4RwrG5CJsLJzctu',
                            },
                          ],
                        },
                        {
                          string:
                            'sigfRR4eWYXHRAXafFY5muQoH6Hh43kSLBeDzcPjBsDH5TKQzRATyoMafMtcDp19Gs8BveGbFSm77hzEjioKq2UWKpTF1j6T',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});

describe('PairToken mixed with and without annotations', () => {
  const schema = {
    prim: 'pair',
    args: [
      {
        prim: 'pair',
        args: [
          {
            prim: 'pair',
            args: [{ prim: 'int' }, { prim: 'int' }],
            annots: ['%A3'],
          },
          { prim: 'int' },
        ],
      },
      { prim: 'bool' },
    ],
  };

  const michelineJson = {
    prim: 'Pair',
    args: [
      {
        prim: 'Pair',
        args: [{ prim: 'Pair', args: [{ int: '11' }, { int: '22' }] }, { int: '33' }],
      },
      { prim: 'True' },
    ],
  };

  const javaScriptObject = new Schema(schema).Execute(michelineJson);

  expect(javaScriptObject).toEqual({
    1: new BigNumber(33),
    2: true,
    A3: {
      0: new BigNumber(11),
      1: new BigNumber(22),
    },
  });
});
