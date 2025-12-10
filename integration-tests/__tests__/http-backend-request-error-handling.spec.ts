/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { HttpBackend } from '@mavrykdynamics/webmavryk-http-utils';

describe('HttpBackend request', () => {
  it('should fail with url and error message with a timeout error', async () => {
    try {
      const http: HttpBackend = new HttpBackend(1);
      await http.createRequest<string>({
        method: 'GET',
        url: 'https://mainnet.rpc.mavryk.network/chains/main/blocks/head/hash'
      });
    } catch (err: any) {
      expect(err.name).toEqual('HttpTimeoutError');
      expect(err.url).toContain('https://mainnet.rpc.mavryk.network/chains/main/blocks/head/hash');
      expect(err.message).toContain('timeout of 1ms exceeded');
    }
  });

  it('should fail with HttpResponseError when a 401 gets returned', async () => {
    try {
      const http: HttpBackend = new HttpBackend();
      await http.createRequest<string>({
        method: 'GET',
        url: 'https://mainnet.rpc.mavryk.network/chains/main/blocks/head/helpers/baking_rights',
        query: {
          level: 0
        }
      });
    } catch (err: any) {
      expect(err.name).toEqual('HttpResponseError');
      expect(err.status).toEqual(403);
      expect(err.url).toEqual('https://mainnet.rpc.mavryk.network/chains/main/blocks/head/helpers/baking_rights?level=0');
      expect(err.message).toContain('Http error response: (403) {\"message\":\"You don\'t have access /chains/main/blocks/head/helpers/baking_rights route\",\"success\":false}');
    }
  });
});
