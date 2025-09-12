import { Estimate } from '@mavrykdynamics/taquito';
import { CONFIGS } from '../../config';
CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test estimation of contractCalls using ${rpc}`, () => {
    let op;
    let contractAddress: string | undefined;

    beforeEach(async () => {
      await setup(true);

      const code = `parameter nat; storage nat; code { CAR ; NIL operation ; PAIR }`;
      op = await Mavryk.contract.originate({
        code,
        storage: 10
      });

      await op.confirmation();
      contractAddress = op.contractAddress;

    });

    it(`should be able to estimate a contract call`, async () => {
      const contract = await Mavryk.contract.at(contractAddress!);
      const opEntrypoint = contract.methods.default(5);
      const estimate = await Mavryk.estimate.contractCall(opEntrypoint);

      expect(estimate).toBeDefined();
      expect(estimate).toBeInstanceOf(Estimate);

    });
  });
});