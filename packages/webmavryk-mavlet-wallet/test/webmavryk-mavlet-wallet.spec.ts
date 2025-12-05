/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import {
  MavletWallet,
  MavletWalletNotInitialized,
  MissingRequiredScopes,
} from '../src/webmavryk-mavlet-wallet';
import LocalStorageMock from './mock-local-storage';
import { PermissionScope, LocalStorage, SigningType } from '@mavrykdynamics/mavlet-dapp';
import { indexedDB } from 'fake-indexeddb';

global.localStorage = new LocalStorageMock();
global.indexedDB = indexedDB;
global.window = { addEventListener: jest.fn() } as any;

describe('Mavlet Wallet tests', () => {
  it('Verify that MavletWallet is instantiable', () => {
    expect(new MavletWallet({ name: 'testWallet' })).toBeInstanceOf(MavletWallet);
  });

  it('Verify MavletWallet not initialized error', () => {
    expect(new MavletWalletNotInitialized()).toBeInstanceOf(Error);
  });

  it('Verify MavletWallet permissions scopes not granted error', () => {
    expect(new MissingRequiredScopes([PermissionScope.OPERATION_REQUEST])).toBeInstanceOf(Error);
  });

  it('Verify that permissions must be called before getPKH', async () => {
    try {
      const wallet = new MavletWallet({ name: 'testWallet' });
      await wallet.getPKH();
    } catch (error: any) {
      expect(error.message).toContain('MavletWallet needs to be initialized');
    }
  });

  it(`Verify that a Mavlet Wallet has a mavlet ID`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    expect(typeof (await wallet.client.mavletId)).toEqual('string');
    expect(await wallet.client.mavletId).toBeDefined;
  });

  it(`Verify that an error is thrown if MavletWallet is initialized with an empty object`, async () => {
    try {
      const wallet = new MavletWallet({} as any);
      expect(wallet).toBeDefined();
    } catch (e) {
      expect((e as any).message).toEqual('Name not set');
    }
  });

  it(`Verify formatParameters for fees`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.formatParameters({ fee: 10 });
    expect(formattedParam.fee).toEqual('10');
  });

  it(`Verify formatParameters for storageLimit`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.formatParameters({ storageLimit: 2000 });
    expect(formattedParam.storageLimit).toEqual('2000');
  });

  it(`Verify formatParameters for gasLimit`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.formatParameters({ gasLimit: 40 });
    expect(formattedParam.gasLimit).toEqual('40');
  });

  it(`Verify removeDefaultParameters for fees`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.removeDefaultParams({ fee: 10 }, { fee: 30 });
    expect(formattedParam.fee).toEqual(30);
  });

  it(`Verify removeDefaultParameters for storageLimit`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.removeDefaultParams(
      { storageLimit: 2000 },
      { storageLimit: 165 }
    );
    expect(formattedParam.storageLimit).toEqual(165);
  });

  it(`Verify removeDefaultParameters for gas limit`, async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const formattedParam = await wallet.removeDefaultParams({ gasLimit: 40 }, { gasLimit: 80 });
    expect(formattedParam.gasLimit).toEqual(80);
  });

  it('Verify getSigningType returns correct signing type for undefined', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const signingType = wallet['getSigningType'](undefined);
    expect(signingType).toBe(SigningType.RAW);
  });

  it('Verify getSigningType returns correct signing type for an empty array', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const signingType = wallet['getSigningType'](new Uint8Array([]));
    expect(signingType).toBe(SigningType.RAW);
  });

  it('Verify getSigningType returns correct signing type for 3', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const signingType = wallet['getSigningType'](new Uint8Array([3]));
    expect(signingType).toBe(SigningType.OPERATION);
  });

  it('Verify getSigningType returns correct signing type for 5', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    const signingType = wallet['getSigningType'](new Uint8Array([5]));
    expect(signingType).toBe(SigningType.MICHELINE);
  });

  it('Verify getSigningType throws for invalid inputs', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    expect(() => wallet['getSigningType'](new Uint8Array([5, 3]))).toThrow();
    expect(() => wallet['getSigningType'](new Uint8Array([7]))).toThrow();
  });

  it('Verify sign throws for Micheline', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    expect(
      async () => await wallet.sign('48656C6C6F20576F726C64', new Uint8Array([5]))
    ).rejects.toThrow();
  });

  it('Verify sign throws for Raw', async () => {
    const wallet = new MavletWallet({ name: 'Test', storage: new LocalStorage() });
    expect(async () => await wallet.sign('48656C6C6F20576F726C64')).rejects.toThrow();
  });
});
