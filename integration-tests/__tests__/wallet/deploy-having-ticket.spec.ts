import { CONFIGS } from "../../config";
import { ticketCode, ticketStorage } from '../../data/code_with_ticket';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test contract origination having ticket with init through wallet api using: ${rpc}`, () => {

    beforeEach(async () => {
      await setup();
    });

    it('Verify wallet.originate for a contract having ticket with init', async () => {
      const op = await Mavryk.wallet.originate({
        code: ticketCode,
        init: ticketStorage
      }).send();

      await op.confirmation();
      expect(op.opHash).toBeDefined();

    });

    it('Verify wallet.originate having ticket with init in JSON', async () => {
      const op = await Mavryk.wallet.originate({
        code: ticketCode,
        init: { prim: 'Pair', args: [{ prim: 'None' }, { prim: 'None' }] }
      }).send();

      await op.confirmation();
      expect(op.opHash).toBeDefined();
    });

    it('Verify wallet.originate for a contract having ticket with storage', async () => {
      const op = await Mavryk.wallet.originate({
        code: ticketCode,
        storage: {
          '%x': null,
          '%y': null
        }
      }).send();

      await op.confirmation();
      expect(op.opHash).toBeDefined();

    });
  });
})
