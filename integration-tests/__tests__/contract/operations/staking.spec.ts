import { CONFIGS } from "../../../config";
import { Protocols } from '@mavrykdynamics/taquito';
import { ProtoGreaterOrEqual } from '@mavrykdynamics/taquito-michel-codec';

CONFIGS().forEach(({ lib, rpc, setup, knownBaker, protocol }) => {
  const Mavryk = lib;
  const boreasAndAlpha = ProtoGreaterOrEqual(protocol, Protocols.PtBoreas) ? test : test.skip;

  describe(`Staking pseudo operations: ${rpc}`, () => {

    beforeAll(async () => {
      await setup(true);

      const delegateOp = await Mavryk.contract.setDelegate({
        delegate: knownBaker,
        source: await Mavryk.signer.publicKeyHash()
      });

      await delegateOp.confirmation();
    });

    boreasAndAlpha('should throw an error when the destination specified is not the same as source', async () => {
      expect(async () => {
        const op = await Mavryk.contract.stake({
          amount: 0.1,
          to: knownBaker
        });
      }).rejects.toThrow();
    });

    boreasAndAlpha('should be able to stake funds to a designated delegate', async () => {
      const op = await Mavryk.contract.stake({
        amount: 0.1
      });
      await op.confirmation();

      expect(op.hash).toBeDefined();
      expect(op.status).toEqual('applied');
    });

    boreasAndAlpha('should be able to unstake funds from a designated delegate', async () => {
      const op = await Mavryk.contract.unstake({
        amount: 0.1
      });
      await op.confirmation();

      expect(op.hash).toBeDefined();
      expect(op.status).toEqual('applied');
    });

    boreasAndAlpha('should be able to finalize_unstake funds from a designated delegate', async () => {
      const op = await Mavryk.contract.finalizeUnstake({});
      await op.confirmation();

      expect(op.hash).toBeDefined();
      expect(op.status).toEqual('applied');
    });
  });
});
