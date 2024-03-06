import { OriginateParams } from '../../src/operations/types';
import { Context, MichelCodecParser, Protocols, InvalidCodeParameter } from '../../src/taquito';

describe('MichelCodec parser', () => {
  const mockRpcClient = {
    getProtocols: jest.fn(),
  };
  const mockGlobalConstantsProvider = {
    getGlobalConstantByHash: jest.fn(),
  };

  mockRpcClient.getProtocols.mockResolvedValue({
    next_protocol: 'PtAtLasjh71tv2N8SDMtjajR42wTSAd9xFTvXvhDuYfRJPRLSL2',
  });

  it('is instantiable', () => {
    expect(new MichelCodecParser(new Context('url'))).toBeInstanceOf(MichelCodecParser);
  });

  describe('getNextProto', () => {
    it('calls getProtocols from the rpc client', async () => {
      const parser = new MichelCodecParser(new Context(mockRpcClient as any));
      const result = await parser['getNextProto']();
      expect(result).toStrictEqual(Protocols.PtAtLas);
    });
  });

  describe('prepareCodeOrigination', () => {
    it('prepares code and init parameters when they are in Michelson', async () => {
      const code = `parameter int; storage (pair int address); code { DUP; };`;
      const init = '(Pair 0 "mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW")';
      const originateParams: OriginateParams = { code, init };
      const parser = new MichelCodecParser(new Context(mockRpcClient as any));
      const result = await parser.prepareCodeOrigination(originateParams);

      expect(JSON.stringify(result)).toEqual(
        JSON.stringify({
          code: [
            { prim: 'parameter', args: [{ prim: 'int' }] },
            {
              prim: 'storage',
              args: [{ prim: 'pair', args: [{ prim: 'int' }, { prim: 'address' }] }],
            },
            {
              prim: 'code',
              args: [[{ prim: 'DUP' }]],
            },
          ],
          init: {
            prim: 'Pair',
            args: [{ int: '0' }, { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }],
          },
        })
      );
    });

    it('prepares code and init parameters when they are in JSON Michelson', async () => {
      const code = [
        { prim: 'parameter', args: [{ prim: 'int' }] },
        { prim: 'storage', args: [{ prim: 'pair', args: [{ prim: 'int' }, { prim: 'address' }] }] },
        {
          prim: 'code',
          args: [[{ prim: 'DUP' }]],
        },
      ];
      const init = {
        prim: 'Pair',
        args: [{ int: '0' }, { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }],
      };
      const originateParams: OriginateParams = { code, init };
      const parser = new MichelCodecParser(new Context(mockRpcClient as any));
      const result = await parser.prepareCodeOrigination(originateParams);

      expect(JSON.stringify(result)).toEqual(
        JSON.stringify({
          code: [
            { prim: 'parameter', args: [{ prim: 'int' }] },
            {
              prim: 'storage',
              args: [{ prim: 'pair', args: [{ prim: 'int' }, { prim: 'address' }] }],
            },
            {
              prim: 'code',
              args: [[{ prim: 'DUP' }]],
            },
          ],
          init: {
            prim: 'Pair',
            args: [{ int: '0' }, { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }],
          },
        })
      );
    });

    it(`Ensures correct ordering for RPC: 'parameter', 'storage', 'code'`, async () => {
      const code = [
        { prim: 'parameter', args: [{ prim: 'int' }] },
        {
          prim: 'code',
          args: [[{ prim: 'DUP' }]],
        },
        { prim: 'storage', args: [{ prim: 'pair', args: [{ prim: 'int' }, { prim: 'address' }] }] },
      ];
      const init = {
        prim: 'Pair',
        args: [{ int: '0' }, { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }],
      };
      const originateParams: OriginateParams = { code, init };
      const parser = new MichelCodecParser(new Context(mockRpcClient as any));
      const result = await parser.prepareCodeOrigination(originateParams);

      expect(JSON.stringify(result)).toEqual(
        JSON.stringify({
          code: [
            { prim: 'parameter', args: [{ prim: 'int' }] },
            {
              prim: 'storage',
              args: [{ prim: 'pair', args: [{ prim: 'int' }, { prim: 'address' }] }],
            },
            {
              prim: 'code',
              args: [[{ prim: 'DUP' }]],
            },
          ],
          init: {
            prim: 'Pair',
            args: [{ int: '0' }, { string: 'mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW' }],
          },
        })
      );
    });

    it('Throws InvalidMichelsonCode when code is an empty string', async () => {
      const code = ``;
      const init = '(Pair 0 "mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW")';
      const originateParams: OriginateParams = { code, init };
      const parser = new MichelCodecParser(new Context(mockRpcClient as any));

      try {
        await parser.prepareCodeOrigination(originateParams);
      } catch (err: any) {
        expect(err).toBeInstanceOf(InvalidCodeParameter);
        expect(err.message).toContain('Unable to parse');
        console.log(err.data);
      }
    });

    it('expands global constants before encoding storage arguments', async () => {
      const context = new Context(mockRpcClient as any);
      mockGlobalConstantsProvider.getGlobalConstantByHash.mockResolvedValue({ prim: 'int' });
      context.globalConstantsProvider = mockGlobalConstantsProvider;
      const parser = new MichelCodecParser(context);

      const code = [
        { prim: 'parameter', args: [{ prim: 'int' }] },
        {
          prim: 'storage',
          args: [
            {
              prim: 'constant',
              args: [{ string: 'expruu5BTdW7ajqJ9XPTF3kgcV78pRiaBW3Gq31mgp3WSYjjUBYxre' }],
            },
          ],
        },
        {
          prim: 'code',
          args: [[{ prim: 'DUP' }]],
        },
      ];

      const result = await parser.prepareCodeOrigination({ code, storage: 10 });

      expect(result).toEqual({
        code: [
          { prim: 'parameter', args: [{ prim: 'int' }] },
          {
            prim: 'storage',
            args: [
              {
                prim: 'constant',
                args: [{ string: 'expruu5BTdW7ajqJ9XPTF3kgcV78pRiaBW3Gq31mgp3WSYjjUBYxre' }],
              },
            ],
          },
          {
            prim: 'code',
            args: [[{ prim: 'DUP' }]],
          },
        ],
        init: { int: '10' },
      });
    });
  });
});
