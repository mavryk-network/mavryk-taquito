/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { InvalidCurveError, InvalidMnemonicError, ToBeImplemented } from '../src/errors';
import { InMemorySigner } from '../src/webmavryk-signer';
import { InvalidDerivationPathError } from '@mavrykdynamics/webmavryk-core';

describe('inmemory-signer', () => {
  const mnemonic = 'prefer wait flock brown volume recycle scrub elder rate pair twenty giant';
  it('fromFundraiser', async () => {
    const signer = InMemorySigner.fromFundraiser(
      'rtphpwty.yohjelcp@tezos.example.org',
      'HMYlTEu0EF',
      [
        'zone',
        'cheese',
        'venture',
        'sad',
        'marriage',
        'attitude',
        'borrow',
        'limit',
        'country',
        'agent',
        'away',
        'raven',
        'nerve',
        'laptop',
        'oven',
      ].join(' ')
    );

    expect(await signer.publicKeyHash()).toBe('mv1N3KY1vXdYX2x568MGmNBRLEK7k7uc2zEM');
  });
  it('fromFundraiser bad mnemonic', () => {
    expect(() =>
      InMemorySigner.fromFundraiser(
        'rtphpwty.yohjelcp@tezos.example.org',
        'HMYlTEu0EF',
        [
          'zone',
          'cheese',
          'venture',
          'sad',
          'marriage',
          'attitude',
          'borrow',
          'limit',
          'country',
          'agent',
          'away',
          'veryveryverwrong',
          'nerve',
          'laptop',
          'oven',
        ].join(' ')
      )
    ).toThrowError(InvalidMnemonicError);
  });

  it('Invalid key', () => {
    expect(function () {
      new InMemorySigner('test');
    }).toThrow(`unsupported prefix`);
  });

  it('(mv1) Invalid key unable to decode', () => {
    expect(function () {
      new InMemorySigner('edsk4TjJWEszkHKono7XMnepqwi37FrbVt1KCsifJeAGimxheShG');
    }).toThrow('Invalid checksum');
  });

  it('(mv2) Invalid key unable to decode', () => {
    expect(function () {
      new InMemorySigner('spsk4TjJWEszkHKono7XMnepqwi37FrbVt1KCsifJeAGimxheShG');
    }).toThrow('Invalid checksum');
  });

  it('(mv3) Invalid key unable to decode', () => {
    expect(function () {
      new InMemorySigner('p2sk4TjJWEszkHKono7XMnepqwi37FrbVt1KCsifJeAGimxheShG');
    }).toThrow('Invalid checksum');
  });

  it('Mv1 64 bytes', async () => {
    const signer = new InMemorySigner(
      'edskS3DtVSbWbPD1yviMGebjYwWJtruMjDcfAZsH9uba22EzKeYhmQkkraFosFETmEMfFNVcDYQ5QbFerj9ozDKroXZ6mb5oxV'
    );
    expect(await signer.publicKey()).toEqual(
      'edpkvJELH15q7a8ShGRsoULGxLQfUQaGahwRTFywCsnWPPdwnmASRH'
    );
    expect(await signer.publicKeyHash()).toEqual('mv1EJAw9QBv5nGw9LWszdWFqwn6q1yyVZ5HE');
    expect(await signer.secretKey()).toEqual(
      'edskS3DtVSbWbPD1yviMGebjYwWJtruMjDcfAZsH9uba22EzKeYhmQkkraFosFETmEMfFNVcDYQ5QbFerj9ozDKroXZ6mb5oxV'
    );

    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigeeho3jK4MZKsyqcTc9mjhtz9w6enG3AFniufgUXCuXFW7VjShxLoNmxqkQSRYUwP1LHRMere5LrvxcqLgU9KmDGN356Yz'
    );
  });

  it('Mv1 32 bytes', async () => {
    const signer = new InMemorySigner('edsk4TjJWEszkHKono7XMnepVqwi37FrpbVt1KCsifJeAGimxheShG');
    expect(await signer.publicKey()).toEqual(
      'edpkuhmrbunxumoiVdQuxBZUPMmwkPt7yLtY5Qnua3VJVTLWr3vXXa'
    );
    expect(await signer.publicKeyHash()).toEqual('mv1PXDneKgnVwKf3EUYTaT8pi32ih82dRTJt');
    expect(await signer.secretKey()).toEqual(
      'edskS8rh49SrQHQxMu5sVsyRXX3Kaodfgbk8qqtTFjxSg2tJbLEtbMnimfJzSz7TTZQeP7EMhZoegHbQWa548RcXJP9kn2J8P8'
    );

    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigpKAnfQGzG4Rk5pV7z9mx2TL9veQCHD7qN4PhsUZMj1BqsumBoApBS9Ue616vKVymxrzfZE2L4h27zzxRUVy6BNPRMpufb'
    );
  });

  it('Tz2', async () => {
    const signer = new InMemorySigner('spsk2rBDDeUqakQ42nBHDGQTtP3GErb6AahHPwF9bhca3Q5KA5HESE');
    expect(await signer.publicKey()).toEqual(
      'sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH'
    );
    expect(await signer.publicKeyHash()).toEqual('mv2QQ5sHsmFuksCRmRgkZpp2DUHBxrZkQzcZ');
    expect(await signer.secretKey()).toEqual(
      'spsk2rBDDeUqakQ42nBHDGQTtP3GErb6AahHPwF9bhca3Q5KA5HESE'
    );

    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigREwM1SuRN5WzjH5xGJuyeZQ9kWi8XtbA4wRqGTumJwNY18PmF1XQMLCXEQBr4frnriKHWdPUynF1vGUvPcoWrNjb3s5xp'
    );
  });

  it('Tz2 with bytes producing public key that needs padding', async () => {
    const signer = new InMemorySigner('spsk33kCcKpgrvXRQJB2GVGxAMxrSEmwKXLh2KR4ztLcbaCnQq3FFs');
    expect(await signer.publicKeyHash()).toEqual('mv2VxfuxJfS2b49BM66s4ZAHryPK3tim9YWM');
    expect(await signer.publicKey()).toEqual(
      'sppk7bFd7b4DWcabg4yw4N5q8rn9thycWmY21EJDCKfTskNiBH8RJrd'
    );
  });

  it('Tz2 having "y" coordinate shorter than 32 bytes', async () => {
    const signer = new InMemorySigner('spsk24EJohZHJkZnWEzj3w9wE7BFARpFmq5WAo9oTtqjdJ2t4pyoB3');
    expect(await signer.publicKey()).toEqual(
      'sppk7bcmsCiZmrzrfGpPHnZMx73s6pUC4Tf1zdASQ3rgXfq8uGP3wgV'
    );
    expect(await signer.publicKeyHash()).toEqual('mv2epmeR8LLhvyTqHi7VxDKqUCecfhhDwiDQ');
    expect(await signer.secretKey()).toEqual(
      'spsk24EJohZHJkZnWEzj3w9wE7BFARpFmq5WAo9oTtqjdJ2t4pyoB3'
    );
    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigmVKa3AcvzDTPGD7rJXkrMh8XMVkVQUkLwGLL3h1APWgicRKBmgjZ3624vqHA2FufBrLTQuPS9YBN1h2Z16kexp9F8NRXp'
    );
  });

  it('Tz3', async () => {
    const signer = new InMemorySigner('p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1');
    expect(await signer.publicKey()).toEqual(
      'p2pk66tTYL5EvahKAXncbtbRPBkAnxo3CszzUho5wPCgWauBMyvybuB'
    );
    expect(await signer.publicKeyHash()).toEqual('mv393EPoJ2jp8P1uVwKg8PFHsQpyRXqi1s1a');
    expect(await signer.secretKey()).toEqual(
      'p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1'
    );

    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigRUobRZ4oG7CvdtQfNoDe3Gqn8zrLw6RXjXVa84rX3HMzWuCuncWgDqY8wRkssofLUsfbdR6MNGJzDWaNXEwTxDktfrKmj'
    );
  });

  it('Tz3 Encrypted', async () => {
    const signer = new InMemorySigner(
      'p2esk2TFqgNcoT4u99ut5doGTUFNwo9x4nNvkpM6YMLqXrt4SbFdQnqLM3hoAXLMB2uZYazj6LZGvcoYzk16H6Et',
      'test1234'
    );
    expect(await signer.publicKey()).toEqual(
      'p2pk65zwHGP9MdvANKkp267F4VzoKqL8DMNpPfTHUNKbm8S9DUqqdpw'
    );
    expect(await signer.publicKeyHash()).toEqual('mv3VctQxtG2obggDpfydkQkyWv55YGR7k3Ef');
    expect(await signer.secretKey()).toEqual(
      'p2sk2mJNRYqs3UXJzzF44Ym6jk38RVDPVSuLCfNd5ShE5zyVdu8Au9'
    );

    expect((await signer.sign('1234', new Uint8Array([3]))).sig).toEqual(
      'sigZiUh7khZmjP1kGSSNe3LQdZC5GMpWHuyFkqcR37pwiGUJrpKaatUxWcRPBE5sHwqfydUsPM4JvK14dBMoHbCxC7VHdMZC'
    );
  });

  it('Tz3 Encrypted with bytes producing signature that needs padding', async () => {
    const signer = new InMemorySigner('p2sk2ke47zhFz3znRZj39TW5KKS9VgfU1Hax7KeErgnShNe9oQFQUP');
    expect(await signer.publicKeyHash()).toEqual('mv3PYh5z3QVHE1nSndTihkQdLVFDMrHfXygC');
    expect(await signer.secretKey()).toEqual(
      'p2sk2ke47zhFz3znRZj39TW5KKS9VgfU1Hax7KeErgnShNe9oQFQUP'
    );

    expect(
      (
        await signer.sign(
          '03051d7ba791fbe8ccfb6f83dd9c760db5642358909eede2a915a26275e6880b9a6c02a2dea17733a2ef2685e5511bd3f160fd510fea7db50edd8122997800c0843d016910882a9436c31ce1d51570e21ae277bb8d91b800006c02a2dea17733a2ef2685e5511bd3f160fd510fea7df416de812294cd010000016910882a9436c31ce1d51570e21ae277bb8d91b800ff020000004602000000410320053d036d0743035d0100000024747a31655935417161316b5844466f6965624c3238656d7958466f6e65416f5667317a68031e0743036a0032034f034d031b6c02a2dea17733a2ef2685e5511bd3f160fd510fea7dd016df8122a6ca010000016910882a9436c31ce1d51570e21ae277bb8d91b800ff020000003e02000000390320053d036d0743035d0100000024747a3161575850323337424c774e484a6343443462334475744365766871713254315a390346034e031b6c02a2dea17733a2ef2685e5511bd3f160fd510fea7dc916e08122dec9010000016910882a9436c31ce1d51570e21ae277bb8d91b800ff0200000013020000000e0320053d036d053e035d034e031b'
        )
      ).prefixSig
    ).toEqual(
      'p2sigMMsHbzzKh6Eg3cDxfLURiUpTMkyjyPWd7RFtBUH7ZyGBzBqMZH9xZc16akQWZNKkCMHnf1vYjjckPEfru456ikHaFWXFD'
    );
  });

  it('Should instantiate mv1 from mnemonic from in memory signer', async () => {
    const signer = InMemorySigner.fromMnemonic({ mnemonic });
    const pkh = await signer.publicKeyHash();

    expect(pkh).toEqual('mv1LapnmjYfyts8DShXLZNXRqCMccF2FwgH8');
  });

  it('Should instantiate mv1 from mnemonic will throw an error with non-hardened derivation paths', () => {
    // good path: 44'/1969'/0'/0' || 44h/1969h/0h/0h
    const badPath = '44/1969/0/0';

    expect(() => InMemorySigner.fromMnemonic({ mnemonic, derivationPath: badPath })).toThrowError(
      InvalidDerivationPathError
    );
  });

  it('Should instantiate mv1 from mnemonic will throw an error if path option is greater than 2^31', () => {
    // good path: 44'/1969'/0'/0' || 44h/1969h/0h/0h
    const badPath = `44/1969/${Number('0x80000000') + 10}'/0'`;

    expect(() => InMemorySigner.fromMnemonic({ mnemonic, derivationPath: badPath })).toThrowError(
      InvalidDerivationPathError
    );
  });

  it('Should instantiate mv1 from mnemonic will throw an error if path option NaN', () => {
    // good path: 44'/1969'/0'/0' || 44h/1969h/0h/0h
    const badPath = `44/1969/suspicious'/0'`;

    expect(() => InMemorySigner.fromMnemonic({ mnemonic, derivationPath: badPath })).toThrowError(
      InvalidDerivationPathError
    );
  });

  it('Should throw error if invalid mnemonic provided', () => {
    const mnemonic = 'prefer wait something wrong';

    expect(() =>
      InMemorySigner.fromMnemonic({ mnemonic, derivationPath: "44'/1969'/0'/0'" })
    ).toThrowError(InvalidMnemonicError);
  });

  it('Should throw error if invalid mnemonic provided', () => {
    const mnemonic =
      'prefer wait flock brown volume recycle scrubbyiswrong elder rate pair twenty giant';

    expect(() =>
      InMemorySigner.fromMnemonic({ mnemonic, derivationPath: "44'/1969'/0'/0'" })
    ).toThrowError(InvalidMnemonicError);
  });

  it('Should instantiate mv2 hardened from mnemonic from in memory signer', async () => {
    const signer = InMemorySigner.fromMnemonic({
      mnemonic,
      derivationPath: "44'/1969'/0'/0'",
      curve: 'secp256k1',
    });
    const pkh = await signer.publicKeyHash();

    expect(pkh).toEqual('mv2LGYNEgrQWFcjktG6u7oLpnC26YzgE4N6c');
  });

  it('Should instantiate mv2 non-hardened from mnemonic from in memory signer', async () => {
    const signer = InMemorySigner.fromMnemonic({
      mnemonic,
      derivationPath: "44'/1969'/0/0",
      curve: 'secp256k1',
    });
    const pkh = await signer.publicKeyHash();

    expect(pkh).toEqual('mv2RtTyt4yqxkAUEeyjiSC7MAzPeJTVmdgoK');
  });

  it('Should instantiate mv3 hardened path from mnemonic from in memory signer', async () => {
    const signer = InMemorySigner.fromMnemonic({
      mnemonic,
      derivationPath: "44'/1969'/0'/0'",
      curve: 'p256',
    });
    const pkh = await signer.publicKeyHash();

    expect(pkh).toEqual('mv3FLXBkPSoL8Z658YcAtr6UrZ5CsZCF4t65');
  });

  it('Should instantiate mv3 non-hardened path from mnemonic from in memory signer', async () => {
    const signer = InMemorySigner.fromMnemonic({
      mnemonic,
      derivationPath: "44'/1969'/0/0",
      curve: 'p256',
    });
    const pkh = await signer.publicKeyHash();

    expect(pkh).toEqual('mv3GSVdx3h4mj6sJC2BC3At85HTNPpUF6G7x');
  });

  // REMOVE WHEN BIP32 IMPLEMENTED
  it('Should throw error if bip32 requested', () => {
    expect(() =>
      InMemorySigner.fromMnemonic({
        mnemonic,
        derivationPath: "44'/1969'/0'/0'",
        curve: 'bip25519',
      })
    ).toThrowError(ToBeImplemented);
  });

  it('Should throw error with wrong curve', () => {
    // account for js error / bad type cast
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() =>
      InMemorySigner.fromMnemonic({
        mnemonic,
        derivationPath: "44'/1969'/0'/0'",
        curve: 'wrong' as any,
      })
    ).toThrowError(InvalidCurveError);
  });
});
