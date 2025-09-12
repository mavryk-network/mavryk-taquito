import { MavrykStorageHandler } from '../../src/handlers/mavryk-storage-handler';
import {
  InvalidContractMetadataTypeError,
  InvalidUriError,
  BigMapContractMetadataNotFoundError,
  ContractMetadataNotFoundError,
} from '../../src/errors';

describe('Parse Mavryk storage URI test', () => {
  const mavrykStorageHandler = new MavrykStorageHandler();

  it('Should extract smart contract address, network and path from the URI properly', () => {
    expect(
      mavrykStorageHandler['parseMavrykStorageUri']('//KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg/here')
    ).toMatchObject({
      contractAddress: 'KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg',
      network: undefined,
      path: 'here',
    });

    expect(mavrykStorageHandler['parseMavrykStorageUri']('hello%2Fworld')).toMatchObject({
      contractAddress: undefined,
      network: undefined,
      path: 'hello/world',
    });

    expect(mavrykStorageHandler['parseMavrykStorageUri']('hello')).toMatchObject({
      contractAddress: undefined,
      network: undefined,
      path: 'hello',
    });

    expect(
      mavrykStorageHandler['parseMavrykStorageUri']('//KT1QDFEu8JijYbsJqzoXq7mKvfaQQamHD1kX/%2Ffoo')
    ).toMatchObject({
      contractAddress: 'KT1QDFEu8JijYbsJqzoXq7mKvfaQQamHD1kX',
      network: undefined,
      path: '/foo',
    });

    expect(
      mavrykStorageHandler['parseMavrykStorageUri'](
        '//KT1GPDQvmV37orH1XH3SZmVVKFaMuzzqsmN7.mainnet/contents'
      )
    ).toMatchObject({
      contractAddress: 'KT1GPDQvmV37orH1XH3SZmVVKFaMuzzqsmN7',
      network: 'mainnet',
      path: 'contents',
    });

    expect(mavrykStorageHandler['parseMavrykStorageUri']('hello/world')).toBeUndefined();
  });
});

describe('Tzip16 mavryk storage handler test', () => {
  const mockContractAbstraction: any = {};
  let mockReadProvider: {
    getScript: jest.Mock<any, any>;
  };
  let mockContext: {
    readProvider: any;
    contract: any;
  };
  let mockContractProvider: {
    getBigMapKeyByID: jest.Mock<any, any>;
  };

  const mavrykStorageHandler = new MavrykStorageHandler();

  beforeEach(() => {
    mockReadProvider = {
      getScript: jest.fn(),
    };
    mockContractProvider = {
      getBigMapKeyByID: jest.fn(),
    };
    mockContext = {
      readProvider: mockReadProvider,
      contract: mockContractProvider,
    };
    mockReadProvider.getScript.mockResolvedValue({
      code: [
        {
          prim: 'storage',
          args: [
            {
              prim: 'pair',
              args: [
                {
                  prim: 'big_map',
                  args: [{ prim: 'string' }, { prim: 'bytes' }],
                  annots: ['%metadata'],
                },
                {},
              ],
            },
          ],
        },
        { prim: 'code', args: [] },
      ],
      storage: { prim: 'Pair', args: [{ int: '32527' }, []] },
    });
  });

  it('Should succesfully find the metadata', async () => {
    mockContractProvider.getBigMapKeyByID.mockResolvedValue(
      '7b226e616d65223a2274657374222c226465736372697074696f6e223a2241206d657461646174612074657374222c2276657273696f6e223a22302e31222c226c6963656e7365223a224d4954222c22617574686f7273223a5b225461717569746f203c68747470733a2f2f7461717569746f2e6d617672796b2e6f72672f3e225d2c22686f6d6570616765223a2268747470733a2f2f7461717569746f2e6d617672796b2e6f72672f227d'
    );

    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'mavryk-storage',
      location: '//KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg/here',
    };
    const metadata = await mavrykStorageHandler.getMetadata(
      mockContractAbstraction,
      tzip16Uri,
      mockContext as any
    );

    expect(metadata).toEqual(
      `{"name":"test","description":"A metadata test","version":"0.1","license":"MIT","authors":["Taquito <https://taquito.mavryk.org/>"],"homepage":"https://taquito.mavryk.org/"}`
    );
  });

  it('Should fail with InvalidUriError when the URI is invalid', async () => {
    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'mavryk-storage',
      location: 'hello/world', // invalid
    };
    try {
      await mavrykStorageHandler.getMetadata(
        mockContractAbstraction,
        tzip16Uri as any,
        mockContext as any
      );
    } catch (ex) {
      expect(ex).toBeInstanceOf(InvalidUriError);
    }
  });

  it('Should fail with BigMapContractMetadataNotFoundError when there is no big map %metadata in the storage', async () => {
    mockReadProvider.getScript.mockResolvedValue({
      code: [{ prim: 'storage', args: [{ prim: 'pair', args: [{}, {}] }] }],
      storage: { prim: 'Pair', args: [] },
    });

    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'mavryk-storage',
      location: '//KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg/here',
    };
    try {
      await mavrykStorageHandler.getMetadata(mockContractAbstraction, tzip16Uri, mockContext as any);
    } catch (ex) {
      expect(ex).toBeInstanceOf(BigMapContractMetadataNotFoundError);
    }
  });

  it('Should fail with ContractMetadataNotFoundError when the path extracted from the URI is not a key of the big map %metadata', async () => {
    mockContractProvider.getBigMapKeyByID.mockResolvedValue(undefined);

    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'mavryk-storage',
      location: '//KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg/here',
    };
    try {
      await mavrykStorageHandler.getMetadata(
        mockContractAbstraction,
        tzip16Uri as any,
        mockContext as any
      );
    } catch (ex) {
      expect(ex).toBeInstanceOf(ContractMetadataNotFoundError);
    }
  });

  it('Should fail with InvalidContractMetadataTypeError when metadata type is not bytes', async () => {
    mockContractProvider.getBigMapKeyByID.mockResolvedValue('NOT-BYTES');

    const tzip16Uri = {
      sha256hash: undefined,
      protocol: 'mavryk-storage',
      location: '//KT1RF4nXUitQb2G8TE5H9zApatxeKLtQymtg/here',
    };
    try {
      await mavrykStorageHandler.getMetadata(
        mockContractAbstraction,
        tzip16Uri as any,
        mockContext as any
      );
    } catch (ex) {
      expect(ex).toBeInstanceOf(InvalidContractMetadataTypeError);
    }
  });
});
