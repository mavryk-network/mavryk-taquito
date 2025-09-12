import { CONFIGS } from './config';
import { MichelsonMap, OriginateParams, RpcForger, MavrykToolkit } from '@mavrykdynamics/taquito';
import { singleSaplingStateContractJProtocol } from './data/single_sapling_state_contract_jakarta_michelson';
import { fa2ForTokenMetadataView } from './data/fa2-for-token-metadata-view';
import { stringToBytes } from '@mavrykdynamics/taquito-utils';
import BigNumber from 'bignumber.js';
import { codeViewsTopLevel } from './data/contract_views_top_level';
import { knownBigMapContract } from './data/knownBigMapContract';
import { knownContract } from './data/knownContract';
import * as fs from 'fs/promises';

const MUMAV_UNIT = new BigNumber(1000000);

CONFIGS().forEach(({ lib, setup, protocol }) => {
  const mavryk = lib;
  let keyPkh: string = "";
  let keyInitialBalance: BigNumber = new BigNumber(0);
  let protocolShort = protocol.substring(0, 9);

  (async () => {
    await setup(true);
    console.log(protocol)

    let outputFile = await fs.open(`known-contracts-${protocolShort}.ts`, 'w');
    let writeOutput = async (line: string): Promise<void> => {
      return fs
        .writeFile(outputFile, line + '\n')
        .catch((err: any) => {
          console.error(err);
        });
    };
    let appendOutput = async (line: string): Promise<void> => {
      return fs
        .appendFile(outputFile, line + '\n')
        .catch((err: any) => {
          console.error(err);
        });
    };
    let originateKnownContract = async (contractName: string, mavryk: MavrykToolkit, contractOriginateParams: OriginateParams): Promise<void> => {
      try {
        const operation = await mavryk.contract.originate(contractOriginateParams);
        await operation.confirmation();
        const contract = await operation.contract();
        console.log(`known ${contractName} address:  ${contract.address}`);
        // Set the contract's address for subsequent GitHub actions
        const contractNameCapitalized = contractName.charAt(0).toUpperCase() + contractName.slice(1);
        const outputAddressVariableName: string = `known${contractNameCapitalized}Address`;
        console.log(`::set-output name=${outputAddressVariableName}::${contract.address}\n`);
        appendOutput(`  ${contractName}: "${contract.address}",`);
      } catch (e: any) {
        console.error(`Failed to deploy ${contractName} known contract | Error: ${e.stack}`);

        if (e.name === "ForgingMismatchError") {
          console.log(`Composite forger failed to originate ${contractName}. Trying to originate the contract by using RPC forger...`);

          mavryk.setForgerProvider(mavryk.getFactory(RpcForger)());

          originateKnownContract(contractName, mavryk, contractOriginateParams);
        } else {
          appendOutput(`  ${contractName}: "",`);
        }
      }
    };

    await writeOutput("import { KnownContracts } from './known-contracts';")
    await appendOutput("export const knownContracts" + protocolShort + ": KnownContracts = {");

    keyPkh = await mavryk.signer.publicKeyHash();
    keyInitialBalance = await mavryk.mv.getBalance(keyPkh);

    // KnownContract
    await originateKnownContract('contract', mavryk, {
      balance: '0',
      code: knownContract,
      init: {
        prim: 'Pair',
        args: [
          { int: '0' },
          {
            prim: 'Pair',
            args: [
              { int: '1' },
              [{ bytes: '005c8244b8de7d57795962c1bfc855d0813f8c61eddf3795f804ccdea3e4c82ae9' }],
            ],
          },
        ],
      }
    });

    // KnownBigMapContract
    const allowancesBigMap = new MichelsonMap();
    const ledgerBigMap = new MichelsonMap();
    ledgerBigMap.set('mv1Jf7tRzUSYjEpLfHj2R1EDgdYHstopbySD', { allowances: allowancesBigMap, balance: '100' });
    await originateKnownContract('bigMapContract', mavryk, {
      code: knownBigMapContract,
      storage: {
        ledger: ledgerBigMap,
        owner: 'mv1VHiNCXPvaU7W7UN8K6QNhbRsLJHZj9Y9q',
        paused: true,
        totalSupply: '100',
      }
    });

    // KnownTzip12BigMapOffChainContract
    const ledger = new MichelsonMap();
    ledger.set(
      {
        0: 'mv3Ju2CZXqfgiHctrWsjjJD8D7GnwJXMkdvV',
        1: 0,
      },
      '20000'
    );
    ledger.set(
      {
        0: 'mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo',
        1: 1,
      },
      '20000'
    );

    const url = 'https://storage.googleapis.com/tzip-16/fa2-views.json';
    const bytesUrl = stringToBytes(url);
    const metadata = new MichelsonMap();
    metadata.set('', bytesUrl);

    const operators = new MichelsonMap();

    const tokens = new MichelsonMap();
    const metadataMap0 = new MichelsonMap();
    metadataMap0.set('', stringToBytes('https://storage.googleapis.com/tzip-16/token-metadata.json'));
    metadataMap0.set('name', stringToBytes('Name from URI is prioritized!'));
    const metadataMap1 = new MichelsonMap();
    metadataMap1.set('name', stringToBytes('AliceToken'));
    metadataMap1.set('symbol', stringToBytes('ALC'));
    metadataMap1.set('decimals', '30');
    metadataMap1.set('extra', stringToBytes('Add more data'));
    const metadataMap2 = new MichelsonMap();
    metadataMap2.set('name', stringToBytes('Invalid token metadata'));
    tokens.set('0', {
      metadata_map: metadataMap0,
      total_supply: '20000',
    });
    tokens.set('1', {
      metadata_map: metadataMap1,
      total_supply: '20000',
    });
    tokens.set('2', {
      metadata_map: metadataMap2,
      total_supply: '20000',
    });

    await originateKnownContract('tzip12BigMapOffChainContract', mavryk, {
      code: fa2ForTokenMetadataView,
      storage: {
        administrator: 'mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg',
        all_tokens: '2',
        ledger: ledger,
        metadata,
        operators,
        paused: false,
        tokens,
      }
    });

    // KnownSaplingContract
    await originateKnownContract('saplingContract', mavryk, {
      code: singleSaplingStateContractJProtocol(),
      init: '{}'
    });

    // knownOnChainViewContract
    await originateKnownContract('onChainViewContractAddress', mavryk, {
      code: codeViewsTopLevel,
      storage: 2
    });

    await appendOutput('};');
    await outputFile.close();

    console.log(`
################################################################################
Public Key Hash : ${keyPkh}
Initial Balance : ${keyInitialBalance.dividedBy(MUMAV_UNIT)} MVRK
Final Balance   : ${(await mavryk.mv.getBalance(keyPkh)).dividedBy(MUMAV_UNIT)} MVRK

Total MVRK Spent : ${keyInitialBalance.minus(await mavryk.mv.getBalance(keyPkh)).dividedBy(MUMAV_UNIT)} MVRK
`)
  })();


  async function printBalance(pkh: string, mavryk: MavrykToolkit): Promise<void> {
    let balance = await mavryk.mv.getBalance(pkh);
    console.log(`${pkh} balance: ${balance}`);
  }
})
