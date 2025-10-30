/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import {
  Token,
  TokenFactory,
  ComparableToken,
  TokenValidationError,
  SemanticEncoding,
} from '../token';
import BigNumber from 'bignumber.js';
import { BaseTokenSchema } from '../../schema/types';

/**
 *  @category Error
 *  @description Error that indicates a failure happening when parsing encoding/executing Mumav
 */
export class MumavValidationError extends TokenValidationError {
  name = 'MumavValidationError';
  constructor(public value: any, public token: MumavToken, message: string) {
    super(value, token, message);
  }
}

export class MumavToken extends ComparableToken {
  static prim: 'mumav' = 'mumav' as const;

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val: any) {
    return new BigNumber(val[Object.keys(val)[0]]);
  }

  /**
   * @deprecated ExtractSchema has been deprecated in favor of generateSchema
   *
   */
  public ExtractSchema() {
    return MumavToken.prim;
  }

  generateSchema(): BaseTokenSchema {
    return {
      __michelsonType: MumavToken.prim,
      schema: MumavToken.prim,
    };
  }

  /**
   * @throws {@link MumavValidationError}
   */
  private validate(val: any) {
    const bigNumber = new BigNumber(val);
    if (bigNumber.isNaN()) {
      throw new MumavValidationError(val, this, `Value is not a number: ${val}`);
    }
  }

  /**
   * @throws {@link MumavValidationError}
   */
  public Encode(args: any[]): any {
    const val = args.pop();

    this.validate(val);

    return { int: String(val).toString() };
  }

  /**
   * @throws {@link MumavValidationError}
   */
  public EncodeObject(val: any, semantic?: SemanticEncoding): any {
    this.validate(val);

    if (semantic && semantic[MumavToken.prim]) {
      return semantic[MumavToken.prim](val);
    }

    return { int: String(val).toString() };
  }

  public ToBigMapKey(val: string | number) {
    return {
      key: { int: String(val) },
      type: { prim: MumavToken.prim },
    };
  }

  public ToKey({ int }: any) {
    return int;
  }

  compare(mumav1: string | number, mumav2: string | number) {
    const o1 = Number(mumav1);
    const o2 = Number(mumav2);
    if (o1 === o2) {
      return 0;
    }

    return o1 < o2 ? -1 : 1;
  }

  findAndReturnTokens(tokenToFind: string, tokens: Token[]) {
    if (MumavToken.prim === tokenToFind) {
      tokens.push(this);
    }
    return tokens;
  }
}
