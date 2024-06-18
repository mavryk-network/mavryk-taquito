import { PollingSubscribeProvider } from "@mavrykdynamics/taquito";
import BigNumber from "bignumber.js";
import { CONFIGS } from "../../config";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  let timeBetweenBlocks: BigNumber;
  describe(`Test handling of missed blocks through contract api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup();
      timeBetweenBlocks = (await Mavryk.rpc.getConstants()).delay_increment_per_round ?? new BigNumber(15);
    })

    it('Verify the operation is found even if the poller skipped blocks', async () => {
      // To simulate the behavior where blocks are skipped, we use a polling interval higher than the time between blocks
      // Before fixing issue #1783, if the block containing the operation was skipped, the operation was never found, and the test ended with a timeout
      // After fixing issue #1783, if blocks are skipped, they will be retrieved and inspected by the Operation class
      Mavryk.setStreamProvider(Mavryk.getFactory(PollingSubscribeProvider)({ pollingIntervalMilliseconds: Number(timeBetweenBlocks.multipliedBy(4000)) }));
      const op = await Mavryk.contract.transfer({ to: 'mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM', amount: 2 });
      await op.confirmation();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      expect(op.status).toBe('applied');

    })
  });
})
