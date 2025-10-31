/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { IpfsHttpHandler } from '../../src/handlers/ipfs-handler';

describe('Tzip16 http handler test', () => {
  let mockHttpBackend: {
    createRequest: jest.Mock<any, any>;
  };
  const mockContractAbstraction: any = {};
  const mockContext: any = {};

  const ipfsHandler = new IpfsHttpHandler();

  beforeEach(() => {
    mockHttpBackend = {
      createRequest: jest.fn(),
    };

    ipfsHandler['httpBackend'] = mockHttpBackend as any;
  });

  it('Should return a string representing the metadata fetched by the httpBackend', async () => {
    mockHttpBackend.createRequest.mockResolvedValue(`{ "name": "WebMavryk test" }`);
    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'ipfs',
      location: '//QmcMUKkhXowQjCPtDVVXyFJd7W9LmC92Gs5kYH1KjEisdjn',
    };
    const metadata = await ipfsHandler.getMetadata(mockContractAbstraction, tzip16Uri, mockContext);

    expect(metadata).toEqual(`{ "name": "WebMavryk test" }`);
  });
});
