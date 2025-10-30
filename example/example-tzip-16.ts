/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { MavrykToolkit } from "@mavrykdynamics/taquito";
import { tzip16, Tzip16Module } from '@mavrykdynamics/taquito-tzip16';

async function example() {
  try {

    const mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');
    mavryk.addExtension(new Tzip16Module());
    const contract = await mavryk.contract.at("KT1JZVozQHLZN7TaACnX6NGBxUkhNjn6tmTB", tzip16)
    const metadata = await contract.tzip16().getMetadata();
    console.log(JSON.stringify(metadata, null, 2));

  } catch (ex) {
    console.error(ex);
  }
}

example();