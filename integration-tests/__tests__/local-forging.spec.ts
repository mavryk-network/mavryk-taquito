import { CONFIGS } from "../config";
import { commonCases, boreasCases } from '../data/allTestsCases';
import { LocalForger, ProtocolsHash } from '@mavrykdynamics/taquito-local-forging'
import { Protocols, MavrykToolkit } from "@mavrykdynamics/taquito";
import { ProtoGreaterOrEqual } from '@mavrykdynamics/taquito-michel-codec';

CONFIGS().forEach(({ rpc, protocol }) => {
  const Mavryk = new MavrykToolkit(rpc);
  const boreasAndAlpha = ProtoGreaterOrEqual(protocol, Protocols.PtBoreas) ? test : test.skip

  describe(`Test local forger: ${rpc}`, () => {
    boreasCases.forEach(({ name, operation, expected }) => {
      boreasAndAlpha(`Verify that .forge for local forge will return same result as for network forge for rpc: ${name} (${rpc})`, async () => {
        const localForger = new LocalForger(protocol as unknown as ProtocolsHash);
        const result = await localForger.forge(operation);
        const rpcResult = await Mavryk.rpc.forgeOperations(operation);
        expect(result).toEqual(rpcResult);
        expect(await localForger.parse(rpcResult)).toEqual(expected || operation);
      });
    });
    // all protocols
    commonCases.forEach(({ name, operation, expected }) => {
      it(`Verify that .forge for local forge will return same result as for network forge for rpc: ${name} (${rpc})`, async () => {
        const localForger = new LocalForger(protocol as unknown as ProtocolsHash);
        const result = await localForger.forge(operation);
        const rpcResult = await Mavryk.rpc.forgeOperations(operation);
        expect(result).toEqual(rpcResult);
        expect(await localForger.parse(result)).toEqual(expected || operation);

      });
    });
  });
});
