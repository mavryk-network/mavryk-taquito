import { MichelsonMap, UnitValue } from '@mavrykdynamics/taquito';
import { CONFIGS } from '../../config';
import { tzip7Contract } from '../../data/tzip_7_contract';
import { testContract } from '../../data/test_lambda_view';
import { fa2Contract } from '../../data/fa2_contract';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;
  const toJSON = (x: any) => JSON.parse(JSON.stringify(x));

  describe(`Test contract with lambda view trough contract api using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();
    });

    test('Verify contract.originate for FA1.2 contract and then fetch data from view entrypoints', async () => {
      const mapAccount1 = new MichelsonMap();
      mapAccount1.set('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc', '25');
      mapAccount1.set('mv1HDistHPoEHEN2dAPZXmxyiBCZAqufraBi', '25');

      const mapAccount2 = new MichelsonMap();
      mapAccount2.set('mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q', '25');
      mapAccount2.set('mv1VezducUiKAyuzmt15pQCqYQz3S5Vw5io8', '25');

      const bigMapLedger = new MichelsonMap();
      bigMapLedger.set('mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF', {
        balance: '50',
        allowances: mapAccount1
      });
      bigMapLedger.set('mv1SYCrLhPXMoDeB2eh4FRwiSW5weQBDu4tx', {
        balance: '50',
        allowances: mapAccount2
      });

      const op = await Mavryk.contract.originate({
        balance: "1",
        code: tzip7Contract,
        storage: {
          owner: await Mavryk.signer.publicKeyHash(),
          totalSupply: '100',
          ledger: bigMapLedger
        },
      })

      await op.confirmation()
      const contract = await op.contract();

      const getTotalSupply = await contract.views.getTotalSupply(UnitValue).read();
      expect(getTotalSupply.toString()).toEqual('100');

      const getBalance = await contract.views.getBalance('mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF').read();
      expect(getBalance.toString()).toEqual('50');

      const getAllowance = await contract.views.getAllowance('mv1SYCrLhPXMoDeB2eh4FRwiSW5weQBDu4tx', 'mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q').read();
      expect(getAllowance.toString()).toEqual('25');

    });

    test('Verify contract.originate for a contract and then fetch data from view entrypoints', async () => {
      const mapAccount2 = new MichelsonMap();
      mapAccount2.set('mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q', '25');
      mapAccount2.set('mv1VezducUiKAyuzmt15pQCqYQz3S5Vw5io8', '25');

      const mapAccount1 = new MichelsonMap();
      mapAccount1.set('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc', {
        approvals: mapAccount2,
        balance: '50',
        whitelisted: true
      });
      mapAccount1.set('mv1HDistHPoEHEN2dAPZXmxyiBCZAqufraBi', {
        approvals: mapAccount2,
        balance: '50',
        whitelisted: true
      });

      const op = await Mavryk.contract.originate({
        balance: "1",
        code: testContract,
        storage: {
          administrator: await Mavryk.signer.publicKeyHash(),
          balances: mapAccount1,
          pause: false,
          totalSupply: '50'
        },
      })

      await op.confirmation()
      const contract = await op.contract();
      const getBalance = await contract.views.getBalance('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc').read();
      expect(toJSON(getBalance)).toEqual({
        balance: '50',
        owner: 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc'
      });

    });

    test('Verify contract.originate for a FA2 contract and then fetch data from view entrypoints', async () => {
      const bigMapLedger = new MichelsonMap();
      bigMapLedger.set('mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF', {
        allowances: ['mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc'],
        balance: '50'
      });
      bigMapLedger.set('mv1SYCrLhPXMoDeB2eh4FRwiSW5weQBDu4tx', {
        allowances: ['mv1HDistHPoEHEN2dAPZXmxyiBCZAqufraBi'],
        balance: '50',
      });

      const tokenMetadataBigMap = new MichelsonMap();
      tokenMetadataBigMap.set('0', {
        token_id: '0',
        symbol: 'hello',
        name: 'test',
        decimals: '0',
        extras: new MichelsonMap()
      });
      tokenMetadataBigMap.set('1', {
        token_id: '1',
        symbol: 'world',
        name: 'test2',
        decimals: '0',
        extras: new MichelsonMap()
      });

      const op = await Mavryk.contract.originate({
        balance: "1",
        code: fa2Contract,
        storage: {
          ledger: bigMapLedger,
          token_metadata: tokenMetadataBigMap,
          total_supply: '100'
        },
      });

      await op.confirmation()
      const contract = await op.contract();
      const balance_of = await contract.views.balance_of([{ owner: 'mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF', token_id: '0' }]).read();
      expect(toJSON(balance_of)).toEqual([{
        "balance": "50",
        "request": {
          "owner": "mv1PSUDXfWMnxcofp84crVhQzZk4EX78toYF",
          "token_id": "0"
        }
      }]);

    });
  });
});
