import { CONFIGS } from '../../config';

import {
  depositContractCode,
  depositContractStorage,
} from '../../data/deposit_contract';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test contract call with amount using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup(true);
    });

    it(
      'originates a contract with SUB MUMAV and sends base layer tokens when calling contract methods',
      async () => {
        const op = await Mavryk.contract.originate({
          balance: '0',
          code: depositContractCode,
          init: depositContractStorage,
        });
        await op.confirmation();
        const contract = await op.contract();

        const operation = await contract.methods.deposit(null).send({ amount: 1 });
        await operation.confirmation();
        expect(operation.status).toEqual('applied');
        let balance = await Mavryk.mv.getBalance(contract.address);
        expect(balance.toString()).toEqual('1000000');

        const operationMumav = await contract.methods
          .deposit(null)
          .send({ amount: 1, mumav: true } as any);
        await operationMumav.confirmation();
        expect(operationMumav.status).toEqual('applied');
        balance = await Mavryk.mv.getBalance(contract.address);
        expect(balance.toString()).toEqual('1000001');
      }
    );
  });
});
