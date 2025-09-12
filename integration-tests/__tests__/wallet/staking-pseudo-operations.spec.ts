import { CONFIGS } from '../../config';
import { Protocols } from '@mavrykdynamics/taquito';
import { ProtoGreaterOrEqual } from '@mavrykdynamics/taquito-michel-codec';
import { InvalidStakingAddressError, InvalidFinalizeUnstakeAmountError } from '@mavrykdynamics/taquito-core';

CONFIGS().forEach(({ lib, rpc, setup, protocol, knownBaker }) => {
  const Mavryk = lib;
  const boreasAndAlpha = ProtoGreaterOrEqual(protocol, Protocols.PtBoreas) ? test : test.skip;
  describe(`Test staking pseudo operations using: ${rpc}`, () => {
    beforeAll(async () => {
      await setup(true);
      try {
        const delegateOp = await Mavryk.contract.setDelegate({
          delegate: knownBaker,
          source: await Mavryk.signer.publicKeyHash()
        });
        await delegateOp.confirmation();
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });

    boreasAndAlpha(`should be able to stake successfully: ${rpc}`, async () => {
      const op = await Mavryk.wallet.stake({ amount: 3 }).send()
      await op.confirmation();
      expect(await op.status()).toBe('applied');

      const stakedBalance = await Mavryk.rpc.getStakedBalance(await Mavryk.signer.publicKeyHash());
      // staked balance returned in mumav therefore dividing by 1000000 and rounding explanation here https://tezos-dev.slack.com/archives/C05RS0MEJ9H/p1714641691368019?thread_ts=1714604532.409029&cid=C05RS0MEJ9H
      expect(Math.round(stakedBalance.toNumber() / 1000000)).toEqual(3);
    });

    boreasAndAlpha(`should be able to unstake successfully: ${rpc}`, async () => {
      const op = await Mavryk.wallet.unstake({ amount: 1 }).send()
      await op.confirmation();
      expect(await op.status()).toBe('applied');

      const UnstakedBalance = await Mavryk.rpc.getUnstakedFrozenBalance(await Mavryk.signer.publicKeyHash());
      // unstaked balance returned in mumav therefore dividing by 1000000 and rounding explanation here https://tezos-dev.slack.com/archives/C05RS0MEJ9H/p1714641691368019?thread_ts=1714604532.409029&cid=C05RS0MEJ9H
      expect(Math.round(UnstakedBalance.toNumber() / 1000000)).toEqual(1);
    });

    boreasAndAlpha(`should be able to finalizeUnstake successfully: ${rpc}`, async () => {
      const op = await Mavryk.wallet.finalizeUnstake({}).send()
      await op.confirmation();
      expect(await op.status()).toBe('applied');
    });

    boreasAndAlpha('should throw error when param is against pseudo operation', async () => {
      expect(async () => {
        const op = await Mavryk.wallet.stake({ amount: 1, to: 'mv1X83v8gdttgFt4U8kDExzcXV68Ndh141U5' }).send();
      }).rejects.toThrow(InvalidStakingAddressError);
      expect(async () => {
        const op = await Mavryk.wallet.unstake({ amount: 1, to: 'mv1X83v8gdttgFt4U8kDExzcXV68Ndh141U5' }).send();
      }).rejects.toThrow(InvalidStakingAddressError);
      expect(async () => {
        const op = await Mavryk.wallet.finalizeUnstake({ to: 'mv1X83v8gdttgFt4U8kDExzcXV68Ndh141U5' }).send();
      }).rejects.toThrow(InvalidStakingAddressError);
      expect(async () => {
        const op = await Mavryk.wallet.finalizeUnstake({ amount: 1 }).send();
      }).rejects.toThrow(InvalidFinalizeUnstakeAmountError);
    });
  });
});
