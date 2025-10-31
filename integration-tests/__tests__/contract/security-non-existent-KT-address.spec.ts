/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { CONFIGS } from '../../config';
import { RpcClient } from '@mavrykdynamics/webmavryk-rpc';
import { Protocols, MavrykToolkit } from '@mavrykdynamics/webmavryk';

// TC001 - non-existing KT addresses can not be prefunded

// KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn is the tzBTC contract on mainnet

const testContractAddress = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn';

CONFIGS().forEach(({ rpc, setup, protocol }) => {
  const weeklynet = protocol === Protocols.ProtoALpha ? test : test.skip;
  const Mavryk = new MavrykToolkit(new RpcClient(rpc));

  describe(`Test contracts using: ${rpc}`, () => {
    beforeEach(async () => {
      await setup();

    });

    weeklynet('Verify that you cannot prefund a non existent smart contract', async () => {
      try {
        await Mavryk.contract.at(testContractAddress);
      } catch (error: any) {
        // Contract Address cannot be prefunded because it cannot be loaded into Webmavryk
        expect(error.message).toContain('Http error response: (404)');
      }
    });
  });
});

// This test was transcribed to Webmavryk from bash scripts at https://github.com/InferenceAG/TezosSecurityBaselineChecking
