---
title: Estimate Provider
author: Edmond Lee & Roxane Letourneau
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Taquito's estimate method can be used to estimate fees, gas, and storage associated with an operation.

:::note
Our estimation of `fee`, `gasLimit` and `storageLimit` is based on the RPC call response to `simulate_operation` plus a small buffer. The context and volume at the time of `simulate_operation` might differ from `preapply/operations` and `injection/operation`, potentially causing errors like `fees_too_low`, `storage_exhausted.operation` and `gas_exhausted.operation`.
:::

## The `Estimate` object

The `Estimate` object has the following properties:

[`burnFeeMumav`]: The number of Mumav that will be burned for the storage of the operation. Returns a number.

[`gasLimit`]: The limit on the amount of gas a given operation can consume. Returns a number.

[`minimalFeeMumav`]: Minimum fees for the operation according to baker defaults. Returns a number.

[`storageLimit`]: The limit on the amount of storage an operation can use. Returns a number.

[`suggestedFeeMumav:`]: The suggested fee for the operation includes minimal fees and a small buffer. Returns a number.

[`totalCost`]: The sum of `minimalFeeMumav` + `burnFeeMumav`. Returns a number.

[`usingBaseFeeMumav`]: Fees according to your specified base fee will ensure that at least minimum fees are used.

### Estimate a transfer operation

The following example shows an estimate of the fees associated with transferring 2ṁ to `mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc` address. The configuration of the signer is to use a throw-away private key for demonstration purposes.

<Tabs
defaultValue="signer"
values={[
{label: 'Signer', value: 'signer'},
{label: 'Wallet', value: 'wallet'}
]}>
<TabItem value="signer">

```js live noInline
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

const amount = 2;
const address = 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc';

println(`Estimating the transfer of ${amount} ṁ to ${address} : `);
Mavryk.estimate
  .transfer({ to: address, amount: amount })
  .then((est) => {
    println(`burnFeeMumav : ${est.burnFeeMumav}, 
    gasLimit : ${est.gasLimit}, 
    minimalFeeMumav : ${est.minimalFeeMumav}, 
    storageLimit : ${est.storageLimit}, 
    suggestedFeeMumav : ${est.suggestedFeeMumav}, 
    totalCost : ${est.totalCost}, 
    usingBaseFeeMumav : ${est.usingBaseFeeMumav}`);
  })
  .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));
```

</TabItem>
  <TabItem value="wallet">

```js live noInline wallet
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

const amount = 2;
const address = 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc';

println(`Estimating the transfer of ${amount} ṁ to ${address} : `);
Mavryk.estimate
  .transfer({ to: address, amount: amount })
  .then((est) => {
    println(`burnFeeMumav : ${est.burnFeeMumav}, 
    gasLimit : ${est.gasLimit}, 
    minimalFeeMumav : ${est.minimalFeeMumav}, 
    storageLimit : ${est.storageLimit}, 
    suggestedFeeMumav : ${est.suggestedFeeMumav}, 
    totalCost : ${est.totalCost}, 
    usingBaseFeeMumav : ${est.usingBaseFeeMumav}`);
  })
  .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));
```

  </TabItem>
</Tabs>


### Estimate a smart contract call

This example will demonstrate how to estimate the fees related to calling a smart contract.

<Tabs
defaultValue="signer"
values={[
{label: 'Signer', value: 'signer'},
{label: 'Wallet', value: 'wallet'}
]}>
<TabItem value="signer">

We have updated the estimate provider to have a `contractCall()` method.
The `contractCall()` member method can now be used to estimate contract calls as such:

```js live noInline
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');
Mavryk.contract
  .at('KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7')
  .then((contract) => {
    return contract.methodsObject.increment(7);
  })
  .then((op) => {
    println(`Estimating the smart contract call: `);
    return Mavryk.estimate.contractCall(op);
  })
  .then((estimate) => {
    println(`burnFeeMumav : ${estimate.burnFeeMumav}, 
    gasLimit : ${estimate.gasLimit}, 
    minimalFeeMumav : ${estimate.minimalFeeMumav}, 
    storageLimit : ${estimate.storageLimit}, 
    suggestedFeeMumav : ${estimate.suggestedFeeMumav}, 
    totalCost : ${estimate.totalCost}, 
    usingBaseFeeMumav : ${estimate.usingBaseFeeMumav}`);
  })
  .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));
```


</TabItem>
  <TabItem value="wallet">

```js live noInline wallet
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');
      
Mavryk.wallet
  .at('KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7')
  .then((contract) => {
    return contract.methodsObject.increment(7);
  })
  .then((op) => {
    println(`Estimating the smart contract call: `);
    return Mavryk.estimate.contractCall(op);
  })
  .then((estimate) => {
    println(`burnFeeMumav : ${estimate.burnFeeMumav}, 
    gasLimit : ${estimate.gasLimit}, 
    minimalFeeMumav : ${estimate.minimalFeeMumav}, 
    storageLimit : ${estimate.storageLimit}, 
    suggestedFeeMumav : ${estimate.suggestedFeeMumav}, 
    totalCost : ${estimate.totalCost}, 
    usingBaseFeeMumav : ${estimate.usingBaseFeeMumav}`);
  })
  .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));
```

  </TabItem>
</Tabs>


### Estimate a contract origination

In this example, we will use the estimate method of Taquito on a contract origination. The `genericMultisigJSONfile` variable contains a Michelson Smart Contract.

<Tabs
defaultValue="signer"
values={[
{label: 'Signer', value: 'signer'},
{label: 'Wallet', value: 'wallet'}
]}>
<TabItem value="signer">

```js live noInline
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

println(`Estimating the contract origination : `);
Mavryk.estimate
  .originate({
    code: genericMultisigJSONfile,
    storage: {
      stored_counter: 0,
      threshold: 1,
      keys: ['edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t'],
    },
  })
  .then((originationOp) => {
    println(`burnFeeMumav : ${originationOp.burnFeeMumav},
    gasLimit : ${originationOp.gasLimit},
    minimalFeeMumav : ${originationOp.minimalFeeMumav},
    storageLimit : ${originationOp.storageLimit},
    suggestedFeeMumav : ${originationOp.suggestedFeeMumav},
    totalCost : ${originationOp.totalCost},
    usingBaseFeeMumav : ${originationOp.usingBaseFeeMumav}`);
  })
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```

</TabItem>
  <TabItem value="wallet">


```js live noInline wallet
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

println(`Estimating the contract origination : `);
Mavryk.estimate
  .originate({
    code: genericMultisigJSONfile,
    storage: {
      stored_counter: 0,
      threshold: 1,
      keys: ['edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t'],
    },
  })
  .then((originationOp) => {
    println(`burnFeeMumav : ${originationOp.burnFeeMumav},
    gasLimit : ${originationOp.gasLimit},
    minimalFeeMumav : ${originationOp.minimalFeeMumav},
    storageLimit : ${originationOp.storageLimit},
    suggestedFeeMumav : ${originationOp.suggestedFeeMumav},
    totalCost : ${originationOp.totalCost},
    usingBaseFeeMumav : ${originationOp.usingBaseFeeMumav}`);
  })
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```

  </TabItem>
</Tabs>
