/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { Wallet } from '../wallet/wallet';
import { Context } from '../context';
import { ContractAbstraction } from './contract';
import { ContractProvider } from './interface';

export function compose<
    ContractAbsComposer1 extends ContractAbstraction<ContractProvider | Wallet>,
    ContractAbsComposer2 extends ContractAbstraction<ContractProvider | Wallet>,
    ContractAbstractionComposed
>(
    functioncomposer1: (abs: ContractAbsComposer1, context: Context) => ContractAbsComposer2,
    functioncomposer2: (abs: ContractAbsComposer2, context: Context) => ContractAbstractionComposed
): (abs: ContractAbsComposer1, context: Context) => ContractAbstractionComposed {
    return (contractAbstraction, context) =>
        functioncomposer2(functioncomposer1(contractAbstraction, context), context);
}
