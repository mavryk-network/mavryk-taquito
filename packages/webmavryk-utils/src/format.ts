/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import BigNumber from 'bignumber.js';

const TZ_DECIMALS = 6;
const MTZ_DECIMALS = 3;

type Format = 'mv' | 'mmv' | 'mumav';

function getDecimal(format: Format) {
  switch (format) {
    case 'mv':
      return TZ_DECIMALS;
    case 'mmv':
      return MTZ_DECIMALS;
    case 'mumav':
    default:
      return 0;
  }
}

export function format(
  from: Format = 'mumav',
  to: Format = 'mumav',
  amount: number | string | BigNumber
) {
  const bigNum = new BigNumber(amount);
  if (bigNum.isNaN()) {
    return amount;
  }

  return bigNum
    .multipliedBy(Math.pow(10, getDecimal(from)))
    .dividedBy(Math.pow(10, getDecimal(to)));
}
