---
title: Getting the Operation Hash without Injecting
id: ophash_before_injecting
author: Davis Sawali
---

This section serves as a guide to get the operation hash without injecting it into the blockchain.

## Getting the Operation Hash

There might come a time when you, the developer, would like to grab the operation hash without injecting it into the blockchain.

To accomplish that, we have a utility function called `encodeOpHash()` in the `@mavrykdynamics/taquito-utils` package. This function takes in the signed operation bytes in the form of a `string`, and outputs the operation hash of said transaction without injecting it.

### Usage example

Here is a simple example on getting the operation hash of a transaction (transfer) operation:

```js

// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// import { encodeOpHash } from '@mavrykdynamics/taquito-utils';
// import { LocalForger } from '@mavrykdynamics/taquito-local-forging';

// const Mavryk = new MavrykToolkit('RPC_ENDPOINT');

const preparedTransfer = await Mavryk.prepare.transaction({
  amount: 1,
  to: 'mv1EnD2M4ATv38QrCqx2CbLpC5AKgHqDwdxa'
});


// convert prepared operation into a forgeable object
const forgeParams = await Mavryk.prepare.toForge(preparedTransfer);

// forge the transaction operation
const forger = new LocalForger();
const forgedBytes = await forger.forge(forgeParams);

// sign the transaction operation
const signedBytes = await Mavryk.signer.sign(forgedBytes);

// get the operation hash using the encodeOpHash() function
const opHash = encodeOpHash(signedBytes.sbytes, new Uint8Array([3]));

```



