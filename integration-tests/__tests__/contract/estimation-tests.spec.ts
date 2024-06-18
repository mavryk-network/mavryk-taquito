import { MANAGER_LAMBDA, getRevealFee, MavrykToolkit } from '@mavrykdynamics/taquito';
import { Contract } from '@mavrykdynamics/taquito';
import { CONFIGS } from '../../config';
import { originate, originate2, transferImplicit2 } from '../../data/lambda';
import { ligoSample } from '../../data/ligo-simple-contract';
import { managerCode } from '../../data/manager_code';
import { InvalidAmountError } from '@mavrykdynamics/taquito-core';

CONFIGS().forEach(({ lib, setup, knownBaker, createAddress, rpc }) => {
  const Mavryk = lib;

  describe(`Test estimate scenarios using: ${rpc}`, () => {
    let LowAmountTez: MavrykToolkit;
    let contract: Contract;
    let amt = 2000000

    beforeAll(async () => {
      try {
        await setup();
        LowAmountTez = await createAddress();
        const pkh = await LowAmountTez.signer.publicKeyHash();
        amt += getRevealFee(await LowAmountTez.signer.publicKeyHash());
        const transfer = await Mavryk.contract.transfer({ to: pkh, mumav: true, amount: amt });
        await transfer.confirmation();
        const op = await Mavryk.contract.originate({
          balance: '1',
          code: managerCode,
          init: { 'string': pkh },
        });
        await op.confirmation();
        contract = await LowAmountTez.contract.at((await op.contract()).address);
        expect(op.status).toEqual('applied');
      }
      catch (ex: any) {
        fail(ex.message);
      } finally {
      }
    });

    it('Verify .estimate.transfer with allocated destination', async () => {
      const estimate = await LowAmountTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), amount: 0.019 });
      expect(estimate.gasLimit).toEqual(101);
      expect(estimate.storageLimit).toEqual(0);
      expect(estimate.suggestedFeeMumav).toEqual(188);
      expect(estimate.burnFeeMumav).toEqual(0);
      expect(estimate.minimalFeeMumav).toEqual(168);
      expect(estimate.totalCost).toEqual(168);
      expect(estimate.usingBaseFeeMumav).toEqual(168);
      expect(estimate.consumedMilligas).toEqual(100040);
    });

    it('Verify .estimate.transfer with unallocated destination', async () => {
      const estimate = await LowAmountTez.estimate.transfer({ to: await (await createAddress()).signer.publicKeyHash(), amount: 0.017 });
      expect(estimate.gasLimit).toEqual(101);
      expect(estimate.storageLimit).toEqual(277);
      expect(estimate.suggestedFeeMumav).toEqual(188);
      expect(estimate.burnFeeMumav).toEqual(69250);
      expect(estimate.minimalFeeMumav).toEqual(168);
      expect(estimate.totalCost).toEqual(69418);
      expect(estimate.usingBaseFeeMumav).toEqual(168);
      expect(estimate.consumedMilligas).toEqual(100040);
    });

    it('Verify .estimate.originate simple contract', async () => {
      const estimate = await LowAmountTez.estimate.originate({
        balance: '1',
        code: ligoSample,
        storage: 0,
      });
      expect(estimate.gasLimit).toEqual(677);
      expect(estimate.storageLimit).toEqual(591);
      expect(estimate.suggestedFeeMumav).toEqual(537);
      expect(estimate.burnFeeMumav).toEqual(147750);
      expect(estimate.minimalFeeMumav).toEqual(517);
      expect(estimate.totalCost).toEqual(148267);
      expect(estimate.usingBaseFeeMumav).toEqual(517);
      expect(estimate.consumedMilligas).toEqual(676402);
    });

    it('Verify .estimate.setDelegate result', async () => {
      const estimate = await LowAmountTez.estimate.setDelegate({
        delegate: knownBaker,
        source: await LowAmountTez.signer.publicKeyHash(),
      });
      expect(estimate.gasLimit).toEqual(100);
      expect(estimate.storageLimit).toEqual(0);
      expect(estimate.suggestedFeeMumav).toEqual(183);
      expect(estimate.burnFeeMumav).toEqual(0);
      expect(estimate.minimalFeeMumav).toEqual(163);
      expect(estimate.totalCost).toEqual(163);
      expect(estimate.usingBaseFeeMumav).toEqual(163);
      expect(estimate.consumedMilligas).toEqual(100000);
    });

    it('Verify .estimate.transfer for internal transfer to allocated implicit', async () => {
      const tx = contract.methods.do(MANAGER_LAMBDA.transferImplicit(knownBaker, 5)).toTransferParams();
      const estimate = await LowAmountTez.estimate.transfer(tx);
      expect(estimate.gasLimit).toEqual(1457);
      expect(estimate.storageLimit).toEqual(0);
      expect(estimate.suggestedFeeMumav).toEqual(396);
      expect(estimate.burnFeeMumav).toEqual(0);
      expect(estimate.minimalFeeMumav).toEqual(376);
      expect(estimate.totalCost).toEqual(376);
      expect(estimate.usingBaseFeeMumav).toEqual(376);
      expect(estimate.consumedMilligas).toEqual(1456228);
    });

    it('Verify .estimate.transfer for multiple internal transfers to unallocated account', async () => {
      const tx = contract.methods.do(transferImplicit2(
        await (await createAddress()).signer.publicKeyHash(),
        await (await createAddress()).signer.publicKeyHash(),
        50)
      ).toTransferParams();
      const estimate = await LowAmountTez.estimate.transfer(tx);
      expect(estimate.gasLimit).toEqual(1571);
      expect(estimate.storageLimit).toEqual(534);
      expect(estimate.suggestedFeeMumav).toEqual(467);
      expect(estimate.burnFeeMumav).toEqual(133500);
      expect(estimate.minimalFeeMumav).toEqual(447);
      expect(estimate.totalCost).toEqual(133947);
      expect(estimate.usingBaseFeeMumav).toEqual(447);
      expect(estimate.consumedMilligas).toEqual(1570757);
    });

    it('Verify .estimate.transfer for internal origination', async () => {
      const tx = contract.methods.do(originate()).toTransferParams();
      const estimate = await LowAmountTez.estimate.transfer(tx);
      expect(estimate.gasLimit).toEqual(1867);
      expect(estimate.storageLimit).toEqual(337);
      expect(estimate.suggestedFeeMumav).toEqual(443);
      expect(estimate.burnFeeMumav).toEqual(84250);
      expect(estimate.minimalFeeMumav).toEqual(423);
      expect(estimate.totalCost).toEqual(84673);
      expect(estimate.usingBaseFeeMumav).toEqual(423);
      expect(estimate.consumedMilligas).toEqual(1866852);
    });

    it('Verify .estimate.transfer for multiple internal originations', async () => {
      const tx = contract.methods.do(originate2()).toTransferParams();
      const estimate = await LowAmountTez.estimate.transfer(tx);
      expect(estimate.gasLimit).toEqual(2393);
      expect(estimate.storageLimit).toEqual(654);
      expect(estimate.suggestedFeeMumav).toEqual(561);
      expect(estimate.burnFeeMumav).toEqual(163500);
      expect(estimate.minimalFeeMumav).toEqual(541);
      expect(estimate.totalCost).toEqual(164041);
      expect(estimate.usingBaseFeeMumav).toEqual(541);
      expect(estimate.consumedMilligas).toEqual(2392005);
      // Do the actual operation
      const op2 = await contract.methods.do(originate2()).send();
      await op2.confirmation();
    });

    it('should throw error when trying to estimate transfer with negative amount in param', async () => {
      expect(async () => {
        const est = await LowAmountTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), amount: -1 });
      }).rejects.toThrowError(InvalidAmountError);
    });
  });


  describe(`Test estimate scenarios with very low balance using: ${rpc}`, () => {
    let LowAmountTez: MavrykToolkit;
    let amt = 2000

    beforeAll(async () => {
      await setup();
      LowAmountTez = await createAddress();
      const pkh = await LowAmountTez.signer.publicKeyHash();
      amt += getRevealFee(await LowAmountTez.signer.publicKeyHash());
      const transfer = await Mavryk.contract.transfer({ to: pkh, mumav: true, amount: amt });
      await transfer.confirmation();
    });

    it('Verify .estimate.transfer to regular address', async () => {
      let estimate = await LowAmountTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), mumav: true, amount: amt - (1382 + getRevealFee(await LowAmountTez.signer.publicKeyHash())) });
      expect(estimate.gasLimit).toEqual(101);
      expect(estimate.storageLimit).toEqual(0);
      expect(estimate.suggestedFeeMumav).toEqual(187);
      expect(estimate.burnFeeMumav).toEqual(0);
      expect(estimate.minimalFeeMumav).toEqual(167);
      expect(estimate.totalCost).toEqual(167);
      expect(estimate.usingBaseFeeMumav).toEqual(167);
      expect(estimate.consumedMilligas).toEqual(100040);
    });

    it('Estimate transfer to regular address with a fixed fee', async () => {

      const params = { fee: 2000, to: await Mavryk.signer.publicKeyHash(), mumav: true, amount: amt - (1382 + getRevealFee(await LowAmountTez.signer.publicKeyHash())) };
      await expect(LowAmountTez.estimate.transfer(params)).rejects.toMatchObject({
        id: expect.stringContaining('empty_implicit_contract'),
      });
    });

    it('Estimate transfer to regular address with insufficient balance', async () => {
      await expect(
        LowAmountTez.estimate.transfer({ to: await Mavryk.signer.publicKeyHash(), mumav: true, amount: amt })
      ).rejects.toMatchObject({
        id: expect.stringContaining('subtraction_underflow'),
      });
    });

    it('Estimate transfer to regular address with insufficient balance to pay storage for allocation', async () => {
      await expect(
        LowAmountTez.estimate.transfer({ to: await (await createAddress()).signer.publicKeyHash(), mumav: true, amount: amt - (1382 + getRevealFee(await LowAmountTez.signer.publicKeyHash())) })
      ).rejects.toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([expect.objectContaining({ id: expect.stringContaining('cannot_pay_storage_fee') })]),
          message: expect.stringContaining('subtraction_underflow'),
        }));
    });

    it('Estimate origination with insufficient balance to pay storage', async () => {
      expect(true).toBeTruthy();
      await expect(LowAmountTez.estimate.originate({
        balance: '0',
        code: ligoSample,
        storage: 0,
      })).rejects.toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([expect.objectContaining({ id: expect.stringContaining('cannot_pay_storage_fee') })]),
          message: expect.stringContaining('subtraction_underflow'),
        }));
    });
  });
});