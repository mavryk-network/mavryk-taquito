import { CONFIGS } from '../../config';
import { ligoSample, ligoSampleMichelson } from '../../data/ligo-simple-contract';
import { managerCode } from '../../data/manager_code';
import { MANAGER_LAMBDA, OpKind } from '@mavrykdynamics/taquito';
import { OperationContentsAndResultTransaction } from '@mavrykdynamics/taquito-rpc'

CONFIGS().forEach(({ lib, rpc, setup, knownContract, knownBaker, createAddress }) => {
    const Mavryk = lib;

    describe(`Test wallet.batch using: ${rpc}`, () => {
        beforeEach(async () => {
            await setup();
        });

        test('Verify wallet.batch simple transfers with origination code in JSON Michelson format', async () => {
            const batch = Mavryk.wallet
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
            const conf1 = await op.confirmation();
            const currentConf1 = await op.getCurrentConfirmation();

            expect(currentConf1).toEqual(1);
            expect(conf1).toEqual(
                expect.objectContaining({
                    expectedConfirmation: 1,
                    currentConfirmation: 1,
                    completed: true
                })
            );
            expect(op.opHash).toBeDefined();
            expect(await op.status()).toEqual('applied');
        });

        test('Verify wallet.batch simple transfers with origination code in Michelson format', async () => {
            const batch = Mavryk.wallet
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
            const conf1 = await op.confirmation();
            const currentConf1 = await op.getCurrentConfirmation();

            expect(currentConf1).toEqual(1);
            expect(conf1).toEqual(
                expect.objectContaining({
                    expectedConfirmation: 1,
                    currentConfirmation: 1,
                    completed: true
                })
            );
            expect(op.opHash).toBeDefined();
            expect(await op.status()).toEqual('applied');
        });

        test('Verify wallet.batch simple transfers with origination', async () => {
            const op = await Mavryk.wallet
                .batch([
                    {
                        kind: OpKind.TRANSACTION,
                        to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
                        amount: 0.02
                    },
                    {
                        kind: OpKind.ORIGINATION,
                        balance: '1',
                        code: ligoSample,
                        storage: 0
                    }
                ])
                .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
                .withTransfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 })
                .send();

            const conf1 = await op.confirmation();
            const currentConf1 = await op.getCurrentConfirmation();

            expect(currentConf1).toEqual(1);
            expect(conf1).toEqual(
                expect.objectContaining({
                    expectedConfirmation: 1,
                    currentConfirmation: 1,
                    completed: true
                })
            );
            expect(op.opHash).toBeDefined();
            expect(await op.status()).toEqual('applied');
        });

        test('Verify wallet.batch simple transfers from an account with low balance', async () => {
            const LocalTez = await createAddress();
            const op = await Mavryk.wallet.transfer({ to: await LocalTez.wallet.pkh(), amount: 2 }).send();
            await op.confirmation();

            const batchOp = await LocalTez.wallet
                .batch([
                    {
                        kind: OpKind.TRANSACTION,
                        to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM',
                        amount: 1
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

            expect(batchOp.opHash).toBeDefined();
            expect(await batchOp.status()).toEqual('applied');
        });

        test('Verify wallet.batch simple transfers with chained contract calls', async () => {
            const op = await Mavryk.wallet
                .originate({
                    balance: '1',
                    code: managerCode,
                    init: { string: await Mavryk.signer.publicKeyHash() }
                })
                .send();

            const contract = await op.contract();
            expect(await op.status()).toEqual('applied');

            const batch = Mavryk.wallet
                .batch()
                .withTransfer({ to: contract.address, amount: 1 })
                .withContractCall(
                    contract.methods.do(MANAGER_LAMBDA.transferImplicit('mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m', 5))
                )
                .withContractCall(contract.methods.do(MANAGER_LAMBDA.setDelegate(knownBaker)))
                .withContractCall(contract.methods.do(MANAGER_LAMBDA.removeDelegate()));

            const batchOp = await batch.send();
            await batchOp.confirmation();
            const conf1 = await batchOp.confirmation();
            const currentConf1 = await batchOp.getCurrentConfirmation();

            expect(currentConf1).toEqual(1);
            expect(conf1).toEqual(
                expect.objectContaining({
                    expectedConfirmation: 1,
                    currentConfirmation: 1,
                    completed: true
                })
            );
            expect(batchOp.opHash).toBeDefined();
            expect(await batchOp.status()).toEqual('applied');
        });

        test('Verify wallet.batch with contract.method call', async () => {
            const contract = await Mavryk.wallet.at(knownContract);
            const batch = await Mavryk.wallet
                .batch([
                    { kind: OpKind.TRANSACTION, to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 },
                    { kind: OpKind.TRANSACTION, to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 0.02 },
                    { kind: OpKind.TRANSACTION, ...contract.methods.default([['Unit']]).toTransferParams() }
                ])
                .send();

            const conf1 = await batch.confirmation();
            const currentConf1 = await batch.getCurrentConfirmation();

            expect(currentConf1).toEqual(1);
            expect(conf1).toEqual(
                expect.objectContaining({
                    expectedConfirmation: 1,
                    currentConfirmation: 1,
                    completed: true
                })
            );
            expect(batch.opHash).toBeDefined();
            expect(await batch.status()).toEqual('applied');
        });
    });

    test('Batch multiple originations and get contract addresses info from getOriginatedContractAddresses member function', async () => {
        const batch = Mavryk.wallet
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
            });

        const op = await batch.send();
        const confirmation = await op.confirmation()
        const currentConfirmation = await op.getCurrentConfirmation()

        expect(currentConfirmation).toEqual(1);
        expect(confirmation).toEqual(
            expect.objectContaining({
                expectedConfirmation: 1,
                currentConfirmation: 1,
                completed: true
            })
        );
        expect(op.opHash).toBeDefined();
        expect(await op.status()).toEqual('applied');
        expect((await op.getOriginatedContractAddresses()).length).toEqual(2);
    });

    test('Verify batch contract calls can specify amount, fee, gasLimit and storageLimit', async () => {
        const op = await Mavryk.wallet
            .originate({
                balance: '1',
                code: managerCode,
                init: { string: await Mavryk.signer.publicKeyHash() }
            })
            .send();
        const contract = await op.contract();

        const estimateOp = await Mavryk.estimate.batch([
            { ...(contract.methodsObject.do(MANAGER_LAMBDA.transferImplicit("mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m", 5)).toTransferParams()), kind: OpKind.TRANSACTION },
            { ...(contract.methods.do(MANAGER_LAMBDA.setDelegate(knownBaker)).toTransferParams()), kind: OpKind.TRANSACTION },
            { ...(contract.methods.do(MANAGER_LAMBDA.removeDelegate()).toTransferParams()), kind: OpKind.TRANSACTION },

        ])

        const batch = Mavryk.wallet
            .batch()
            .withContractCall(
                contract.methods.do(MANAGER_LAMBDA.transferImplicit('mv1UE4jMeeBM49FjNmyvtE19aBKT73HDvM2m', 5), { fee: estimateOp[0].suggestedFeeMumav, gasLimit: estimateOp[0].gasLimit, storageLimit: estimateOp[0].storageLimit })
            )
            .withContractCall(
                contract.methods.do(MANAGER_LAMBDA.setDelegate(knownBaker), { fee: estimateOp[1].suggestedFeeMumav, gasLimit: estimateOp[1].gasLimit, storageLimit: estimateOp[1].storageLimit })
            )
            .withContractCall(
                contract.methods.do(MANAGER_LAMBDA.removeDelegate(), { fee: estimateOp[2].suggestedFeeMumav, gasLimit: estimateOp[2].gasLimit, storageLimit: estimateOp[2].storageLimit })
            )

        const batchOp = await batch.send();
        await batchOp.confirmation();
        const opResults = await batchOp.operationResults() as OperationContentsAndResultTransaction[]
        expect(Number(opResults[0].fee)).toEqual(estimateOp[0].suggestedFeeMumav)
        expect(Number(opResults[0].gas_limit)).toEqual(estimateOp[0].gasLimit)
        expect(Number(opResults[0].storage_limit)).toEqual(estimateOp[0].storageLimit)
        expect(Number(opResults[1].fee)).toEqual(estimateOp[1].suggestedFeeMumav)
        expect(Number(opResults[1].gas_limit)).toEqual(estimateOp[1].gasLimit)
        expect(Number(opResults[1].storage_limit)).toEqual(estimateOp[1].storageLimit)
        expect(Number(opResults[2].fee)).toEqual(estimateOp[2].suggestedFeeMumav)
        expect(Number(opResults[2].gas_limit)).toEqual(estimateOp[2].gasLimit)
        expect(Number(opResults[2].storage_limit)).toEqual(estimateOp[2].storageLimit)
    })
});