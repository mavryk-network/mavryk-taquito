import { CONFIGS } from "../../../config";
import { DefaultContractType, MavrykToolkit } from "@mavrykdynamics/taquito";
import { ticketsSendTz, ticketsBagTz, ticketsBlackholeTz } from "../../../data/code_with_ticket_transfer";
import { RpcClient, TicketTokenParams } from '@mavrykdynamics/taquito-rpc';

CONFIGS().forEach(({ lib, rpc, setup, createAddress }) => {
  const Mavryk1 = lib;
  const client = new RpcClient(rpc);

  let mavryk1Pkh: string;
  let mavryk2Pkh: string;
  let Mavryk2: MavrykToolkit;
  let ticketSendContract: DefaultContractType;
  let ticketBagContract: DefaultContractType;
  let ticketBlackholeContract: DefaultContractType;
  let ticketToken: TicketTokenParams

  describe(`Test transfer ticket between implicit and originated accounts, in ${rpc}`, () => {

    beforeAll(async () => {
      await setup(true);
      try {
        Mavryk2 = await createAddress();
        mavryk1Pkh = await Mavryk1.signer.publicKeyHash();
        mavryk2Pkh = await Mavryk2.signer.publicKeyHash();

        // ticketSend contract has one default entrypoint which accepts an address to issue tickets to
        const ticketSendOrigination = await Mavryk1.contract.originate({ code: ticketsSendTz, storage: null });
        await ticketSendOrigination.confirmation();
        ticketSendContract = await ticketSendOrigination.contract();

        // ticketBag contract has two entrypoints, one is "save" to receive tickets and the other is "send" to send tickets out
        const ticketBagOrigination = await Mavryk1.contract.originate({ code: ticketsBagTz, storage: [] });
        await ticketBagOrigination.confirmation();
        ticketBagContract = await ticketBagOrigination.contract();

        // ticketBlackhole contract has one default entrypoint to accept tickets and dispose them
        const ticketBlackholeOrigination = await Mavryk1.contract.originate({ code: ticketsBlackholeTz, storage: null });
        await ticketBlackholeOrigination.confirmation();
        ticketBlackholeContract = await ticketBlackholeOrigination.contract();

        ticketToken = { ticketer: ticketSendContract.address, content_type: { prim: 'string' }, content: { string: 'Ticket' } };
      } catch (error) {
        console.error(error);
      }
    });

    it('will send 3 tickets from an originated to an implicit account', async () => {
      const ticketSendToImplicitOp = await ticketSendContract.methods.default(mavryk1Pkh, '3').send();
      await ticketSendToImplicitOp.confirmation();
      expect(ticketSendToImplicitOp.status).toEqual('applied');

      let Mavryk1TicketBalance = await client.getTicketBalance(mavryk1Pkh, ticketToken);
      expect(Mavryk1TicketBalance).toBe('3');
    });

    it('will transfer 1 tickets from an implicit to another implicit account', async () => {
      let Mavryk2TicketBalanceBefore = await client.getTicketBalance(mavryk2Pkh, ticketToken);
      expect(Mavryk2TicketBalanceBefore).toBe('0');

      const implicitToImplicitOp = await Mavryk1.contract.transferTicket({
        ticketContents: { string: "Ticket" },
        ticketTy: { prim: "string" },
        ticketTicketer: ticketSendContract.address,
        ticketAmount: 1,
        destination: await Mavryk2.signer.publicKeyHash(),
        entrypoint: 'default',
      });
      await implicitToImplicitOp.confirmation();
      expect(implicitToImplicitOp.status).toEqual('applied');

      let Mavryk1TicketBalanceAfter = await client.getTicketBalance(await Mavryk1.signer.publicKeyHash(), ticketToken);
      expect(Mavryk1TicketBalanceAfter).toBe('2');
      let Mavryk2TicketBalanceAfter = await client.getTicketBalance(await Mavryk2.signer.publicKeyHash(), ticketToken);
      expect(Mavryk2TicketBalanceAfter).toBe('1');
    });

    it('will transfer 1 ticket from an implicit to an originated account', async () => {
      const implicitToOriginatedOp = await Mavryk1.contract.transferTicket({
        ticketContents: { string: "Ticket" },
        ticketTy: { prim: "string" },
        ticketTicketer: ticketSendContract.address,
        ticketAmount: 1,
        destination: ticketBagContract.address,
        entrypoint: 'save',
      });
      await implicitToOriginatedOp.confirmation();
      expect(implicitToOriginatedOp.status).toEqual('applied');

      let contractBagTicketBalance = await client.getTicketBalance(ticketBagContract.address, ticketToken);
      expect(contractBagTicketBalance).toBe('1');
    });

    it('will send 1 ticket from an origianted to another originated account to dispose', async () => {
      const ticketSendOriginatedOp = await ticketBagContract.methods.send(ticketBlackholeContract.address).send();
      await ticketSendOriginatedOp.confirmation();
      expect(ticketSendOriginatedOp.status).toEqual('applied');

      let contractBagTicketBalance = await client.getTicketBalance(ticketBagContract.address, ticketToken);
      expect(contractBagTicketBalance).toBe('0');
    });
  });
});
