import { CONFIGS } from '../../config';

CONFIGS().forEach(({ lib, rpc, setup, protocol }) => {
    const Mavryk = lib;
    describe(`Test delegate registration through wallet api: ${rpc}`, () => {
        beforeEach(async () => {
            await setup(true);
        });
        it('Verify that the current address can be registered as a delegate using wallet.registerDelegate', async () => {
            try {
                const pkh = await Mavryk.wallet.pkh();
                const op = await Mavryk.wallet.registerDelegate().send();

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

                const account = await Mavryk.rpc.getDelegate(pkh);
                expect(account).toEqual(pkh);
            } catch (ex: any) {
                    // When running tests more than one time with the same key, the account is already delegated to the given delegate
                    expect(ex.message).toMatch('delegate.already_active')
            }
        });
    });
});
