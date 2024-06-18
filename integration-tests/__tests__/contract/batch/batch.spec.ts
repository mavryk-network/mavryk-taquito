import { CONFIGS } from '../../../config';
import { ligoSample, ligoSampleMichelson } from '../../../data/ligo-simple-contract';
import { managerCode } from '../../../data/manager_code';
import { MANAGER_LAMBDA, OpKind } from '@mavrykdynamics/taquito';

CONFIGS().forEach(({ lib, rpc, setup, knownBaker, knownContract, createAddress }) => {
  const Mavryk = lib;

  describe(`Test contract.batch through contract api using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();
    });

    it('Verify contract.batch simple transfers with origination code in JSON Michelson format', async () => {
      const batch = Mavryk.contract
        .batch()
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withOrigination({
          balance: '1',
          code: ligoSample,
          storage: 0
        });

      const op = await batch.send();
      await op.confirmation();
      expect(op.status).toEqual('applied');
      expect(Number(op.consumedGas)).toBeGreaterThan(0);
    });

    it('Verify contract.batch simple transfers with origination code in Michelson format', async () => {
      const batch = Mavryk.contract
        .batch()
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withOrigination({
          balance: '1',
          code: ligoSampleMichelson,
          storage: 0
        });

      const op = await batch.send();
      await op.confirmation();
      expect(op.status).toEqual('applied');
    });

    it('Verify batch of transfers and origination operation using a combination of the two notations (array of operation with kind mixed with withTransfer method)', async () => {
      const op = await Mavryk.contract.batch([
        {
          kind: OpKind.TRANSACTION,
          to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
          amount: 0.02
        },
        {
          kind: OpKind.ORIGINATION,
          balance: "1",
          code: ligoSample,
          storage: 0,
        }
      ])
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
        .send();
      await op.confirmation();
      expect(op.status).toEqual('applied')
    })

    it('Verify handling of contract.batch simple transfers with bad origination', async () => {
      expect.assertions(1);
      try {
        await Mavryk.contract
          .batch()
          .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
          .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
          .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
          .withOrigination({
            balance: '1',
            code: ligoSample,
            storage: 0,
            storageLimit: 0
          })
          .send();
      } catch (ex) {
        expect(ex).toEqual(
          expect.objectContaining({
            message: expect.stringContaining('storage_exhausted.operation')
          })
        );
      }
    });

    it('Verify transfer and origination for contract.batch simple transfers from an account with low balance', async () => {
      const LocalTez = await createAddress();
      const op = await Mavryk.contract.transfer({ to: await LocalTez.signer.publicKeyHash(), amount: 2 });
      await op.confirmation();

      const contract = await Mavryk.contract.at(knownContract);

      const batchOp = await LocalTez.contract
        .batch([
          {
            kind: OpKind.TRANSACTION,
            to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
            amount: 0.01
          },
          {
            kind: OpKind.ORIGINATION,
            balance: '0',
            code: ligoSample,
            storage: 0
          }
        ])
        .send();
      await batchOp.confirmation();
      expect(op.status).toEqual('applied');
    });

    it('Verify contract.batch simple transfers with chained contract calls', async () => {
      const op = await Mavryk.contract.originate({
        balance: '1',
        code: managerCode,
        init: { string: await Mavryk.signer.publicKeyHash() }
      });
      await op.confirmation();
      const contract = await op.contract();
      expect(op.status).toEqual('applied');

      const batch = Mavryk.contract
        .batch()
        .withTransfer({ to: contract.address, amount: 1 })
        .withContractCall(
          contract.methods.do(MANAGER_LAMBDA.transferImplicit('mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m', 5))
        )
        .withContractCall(contract.methods.do(MANAGER_LAMBDA.setDelegate(knownBaker)))
        .withContractCall(contract.methods.do(MANAGER_LAMBDA.removeDelegate()));

      const batchOp = await batch.send();

      await batchOp.confirmation();

      expect(batchOp.status).toEqual('applied');
    });

    it('Verify contract.batch of simple transfers and a contract entrypoint call using the array notation with kind', async () => {
      const contract = await Mavryk.contract.at(knownContract);
      const batchOp = await Mavryk.contract
        .batch([
          { kind: OpKind.TRANSACTION, to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 },
          { kind: OpKind.TRANSACTION, to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 },
          { kind: OpKind.TRANSACTION, ...contract.methods.default([['Unit']]).toTransferParams() }
        ])
        .send();

      await batchOp.confirmation();

      expect(batchOp.status).toEqual('applied');
    });

    it('Verify that with a batch of multiple originations contract address info can be got from the getOriginatedContractAddresses member function', async () => {
      const batch = Mavryk.contract
        .batch()
        .withOrigination({
          balance: '1',
          code: ligoSample,
          storage: 0
        })
        .withOrigination({
          balance: '1',
          code: ligoSampleMichelson,
          storage: 0
        })

      const op = await batch.send();
      await op.confirmation();

      const addresses = op.getOriginatedContractAddresses();
      expect(op.status).toEqual('applied');
      expect(addresses.length).toEqual(2);
    })

    it('Verify batch contract calls can specify amount, fee, gasLimit and storageLimit', async () => {
      const op = await Mavryk.contract.originate({
        balance: "1",
        code: managerCode,
        init: { "string": await Mavryk.signer.publicKeyHash() },
      })
      await op.confirmation();
      const contract = await op.contract();

      const estimateOp = await Mavryk.estimate.batch([
        { ...(contract.methodsObject.do(MANAGER_LAMBDA.transferImplicit("mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m", 5)).toTransferParams()), kind: OpKind.TRANSACTION },
        { ...(contract.methodsObject.do(MANAGER_LAMBDA.setDelegate(knownBaker)).toTransferParams()), kind: OpKind.TRANSACTION },
        { ...(contract.methodsObject.do(MANAGER_LAMBDA.removeDelegate()).toTransferParams()), kind: OpKind.TRANSACTION },
      ])

      const batch = Mavryk.contract.batch()
        .withContractCall(contract.methodsObject.do(MANAGER_LAMBDA.transferImplicit("mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m", 5)), { fee: estimateOp[0].suggestedFeeMumav, gasLimit: estimateOp[0].gasLimit, storageLimit: estimateOp[0].storageLimit })
        .withContractCall(contract.methods.do(MANAGER_LAMBDA.setDelegate(knownBaker)), { fee: estimateOp[1].suggestedFeeMumav, gasLimit: estimateOp[1].gasLimit, storageLimit: estimateOp[1].storageLimit })
        .withContractCall(contract.methods.do(MANAGER_LAMBDA.removeDelegate()), { fee: estimateOp[2].suggestedFeeMumav, gasLimit: estimateOp[2].gasLimit, storageLimit: estimateOp[2].storageLimit })
      const batchOp = await batch.send();

      await batchOp.confirmation();

      // The sum of fee is slightly different from estimates above due to the size of the operation length varying slightly when forged (default value of estimates have higher values than actual estimates, making the variable length smaller than initially estimated)
      expect(batchOp.fee).toEqual(estimateOp[0].suggestedFeeMumav + estimateOp[1].suggestedFeeMumav + estimateOp[2].suggestedFeeMumav);
      expect(batchOp.gasLimit).toEqual(estimateOp[0].gasLimit + estimateOp[1].gasLimit + estimateOp[2].gasLimit)
      expect(batchOp.storageLimit).toEqual(estimateOp[0].storageLimit + estimateOp[1].storageLimit + estimateOp[2].storageLimit)
    })
  });
});
