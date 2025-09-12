---
title: Contracts Library
author: Roxane Letourneau
---

To increase dApp performance, we aim to provide ways to reduce the number of calls made by Taquito to the RPC.
The `@mavrykdynamics/taquito-contracts-library` package allows developers to supply the static contracts data, preventing Taquito from fetching them from the network.


The `ContractsLibrary` class can be populated by users with contract addresses and their corresponding script and entry points. Then, the `ContractsLibrary` instance can be injected into a `MavrykToolkit` as an extension using its `addExtension` method. 

When creating a `ContractAbstraction` instance using the `at` method of the Contract or the Wallet API, if a `ContractsLibrary` is present on the `MavrykToolkit` instance, the script and entry points of the contract will be loaded from the `ContractsLibrary`. Otherwise, the values will be fetched from the RPC as usual.

### Example of use:

```ts
import { ContractsLibrary } from '@mavrykdynamics/taquito-contracts-library';
import { MavrykToolkit } from '@mavrykdynamics/taquito';

const contractsLibrary = new ContractsLibrary();
const Mavryk = new MavrykToolkit('rpc');

contractsLibrary.addContract({
    'contractAddress1': {
        script: script1, // script should be obtained from Mavryk.rpc.getNormalizedScript('contractAddress1')
        entrypoints: entrypoints1 // entrypoints should be obtained from Mavryk.rpc.getEntrypoints('contractAddress1')
    },
    'contractAddress2': {
        script: script2,
        entrypoints: entrypoints2
    }
})

Mavryk.addExtension(contractsLibrary);

// The script en entrypoints are loaded from the contractsLibrary instead of the RPC
const contract = await Mavryk.contract.at('contractAddress1');
```