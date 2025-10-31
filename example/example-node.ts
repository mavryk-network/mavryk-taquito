/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { BigMapAbstraction, MavrykToolkit } from '../packages/webmavryk/src/webmavryk';
import { RpcClient } from '../packages/webmavryk-rpc/src/webmavryk-rpc';
import { castToString } from '../packages/webmavryk-rpc/src/utils/utils';
import BigNumber from 'bignumber.js';

const provider = 'https://basenet.rpc.mavryk.network';

const client = new RpcClient(provider);

async function example() {
  try {
    const mavryk = new MavrykToolkit(provider);

    console.log('Getting storage...');
    const contract = await mavryk.contract.at('KT1LRBZUde7PbmKEELT829Ts3HjownyYmW2F') // knownBigMapContract used in integration tests
    const storage = await contract.storage();
    console.log(storage);

    console.log('Getting balance...');
    const balance = await mavryk.mv.getBalance('mv1QKLY6XJjb6uD9vdXmtW6aUfP4C7h66aTg');
    console.log(`${balance.toNumber() / 1000000} ṁ`)

    console.log('Getting big map key...');

      const contractStorage: {
        ledger: BigMapAbstraction;
        owner: string;
        paused:boolean;
        totalSupply: BigNumber;
      } = await contract.storage();

      const bigMapKey = await contractStorage.ledger.get('mv1Jf7tRzUSYjEpLfHj2R1EDgdYHstopbySD');
      console.log(bigMapKey);


  } catch (ex) {
    console.error(ex);
  }

  console.log('Getting constants from head...');
  try {
    await client.getConstants().then(res => {
      console.log('The output we get with BigNumbers:');
      console.log(res);
      console.log('Converted BigNumbers to strings for readability:');
      console.log(castToString(res));
    });
  } catch (ex) {
    console.error(ex);
  }

  console.log('Getting block from head...');
  try {
    await client.getBlock().then(res => {
      console.log(res);
    });
  } catch (ex) {
    console.error(ex);
  }
}

example();
