import { CONFIGS } from '../../config';
import { Protocols } from '@mavrykdynamics/taquito';

// TC-007 - A 0tez transaction to an implicit account should fail.

CONFIGS().forEach(({ lib, rpc, setup, protocol }) => {
  const Mavryk = lib;
  const weeklynet = protocol === Protocols.ProtoALpha ? test : test.skip;

  describe(`Test contracts using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();

    });

    weeklynet('Verify that Transactions of 0ṁ towards a contract without code are forbidden', async () => {
      try {
        const op = await Mavryk.contract.originate({
          code: `{ parameter address ;
                      storage unit ;
                      code { UNPAIR ;
                             CONTRACT unit ;
                             IF_NONE { PUSH string "none" ; FAILWITH } {} ;
                             PUSH mumav 0 ;
                             UNIT ;
                             TRANSFER_TOKENS ;
                             SWAP ;
                             NIL operation ;
                             DIG 2 ;
                             CONS ;
                             PAIR } }
                          `,
          init: { prim: 'Unit' },
        });

        await op.confirmation();
        expect(op.hash).toBeDefined();
        expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
        const contract = await op.contract();
        expect(await contract.storage()).toBeTruthy();

        const publicKeyHash = await Mavryk.signer.publicKeyHash();

        const opSend = await contract.methods.default(publicKeyHash).send();
        await opSend.confirmation();

      } catch (error: any) {
        expect(error.message).toContain('contract.empty_transaction');
      }
    });
  });
});

// This test was transcribed to Taquito from bash scripts at https://github.com/InferenceAG/TezosSecurityBaselineChecking
