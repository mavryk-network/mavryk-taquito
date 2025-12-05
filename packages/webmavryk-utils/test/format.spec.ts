/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { format } from '../src/format';
import BigNumber from 'bignumber.js';
import { bytesToString, stringToBytes } from '../src/webmavryk-utils';

describe('Format', () => {
  it('Should convert mumav to mv', () => {
    expect(format('mumav', 'mv', 1000000)).toEqual(new BigNumber(1));
  });

  it('Should convert mmv to mv', () => {
    expect(format('mmv', 'mv', 1000)).toEqual(new BigNumber(1));
  });

  it('Should convert mumav to mmv', () => {
    expect(format('mumav', 'mmv', 1000000)).toEqual(new BigNumber(1000));
  });

  it('Should convert mv to mmv', () => {
    expect(format('mv', 'mmv', 1)).toEqual(new BigNumber(1000));
  });

  it('Should convert mv to mumav', () => {
    expect(format('mv', 'mumav', 1)).toEqual(new BigNumber(1000000));
  });
});

describe('webmavryk.mavryk.org example signing formatting', () => {
  it('Should be valid bytes WebMavryk example https://webmavryk.mavryk.org/docs/next/signing#generating-a-signature-with-mavlet-sdk with proper padding for bytes length', () => {
    const formattedInput: string = [
      'Mavryk Signed Message:',
      'some url',
      '18:43:34Z',
      'something',
    ].join(' ');

    const bytes = stringToBytes(formattedInput);
    const bytesLength = (bytes.length / 2).toString(16);
    const addPadding = `00000000${bytesLength}`;
    const paddedBytesLength = addPadding.slice(addPadding.length - 8);
    const payloadBytes = '05' + '01' + paddedBytesLength + bytes;
    const regex = new RegExp('^(0x|0X)?[a-fA-F0-9]+$');
    const check = regex.test(payloadBytes);
    expect(check).toEqual(true);
    expect(payloadBytes.length % 2).toEqual(0);
    expect(bytesToString(payloadBytes)).toEqual(
      bytesToString('05' + '01' + paddedBytesLength) + formattedInput
    );
  });
});
