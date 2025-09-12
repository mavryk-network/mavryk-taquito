import { CONFIGS } from './config';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test contract call with amount using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();
    });

    it(
      'originate a contract with SUB MUMAV',
      async () => {
        const op = await Mavryk.contract.originate({
          code: `{ parameter (or (or (mumav %decrement) (mumav %increment)) (mumav %reset)) ;
               storage mumav ;
               code { UNPAIR ;
                      IF_LEFT { IF_LEFT { SWAP ; SUB_MUMAV; ASSERT_SOME } { ADD } } { SWAP ; DROP } ;
                      NIL operation ;
                      PAIR } }
                   `,
          init: `0`,
        });
        await op.confirmation()
        expect(op.hash).toBeDefined();
        expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY)
        const contract = await op.contract();

        expect(await contract.storage()).toBeTruthy();
      }
    );

    it('fail to originate a contract on Ithaca with SUB', async () => {
      try {
        await Mavryk.contract.originate({
          code: `{ parameter (or (or (mumav %decrement) (mumav %increment)) (mumav %reset)) ;
                 storage mumav ;
                 code { UNPAIR ;
                        IF_LEFT { IF_LEFT { SWAP ; SUB } { ADD } } { SWAP ; DROP } ;
                        NIL operation ;
                        PAIR } }
                   `,
          init: `0`,
        });
      } catch (error: any) {
        expect(error.message).toContain("michelson_v1.deprecated_instruction")
      }
    });

  });
});
