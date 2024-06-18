import { CONFIGS } from '../../../config';
import { InvalidAmountError } from '@mavrykdynamics/taquito-core';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test simple transaction to mavryk public key hashes: ${rpc}`, () => {
    beforeEach(async () => {
      await setup(true);
    });

    it('should be able to send to a mv4 address', async () => {
      const op = await Mavryk.contract.transfer({
        amount: 1,
        to: 'mv4V7CnM8pzPbWHtiRRbvSLkaheyM4pEnMSC'
      });

      await op.confirmation();

      expect(op.status).toEqual('applied');
    });

    it('should throw an error when trying to send negative amount', async () => {
      expect(async () => {
        const op = await Mavryk.contract.transfer({
          amount: -1,
          to: 'mv4V7CnM8pzPbWHtiRRbvSLkaheyM4pEnMSC'
        });

        await op.confirmation();
      }).rejects.toThrowError(InvalidAmountError);

    })
  });
});
