---
title: Quick Start
author: Simon Boissonneault-Robert
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installing Taquito using npm

> For quick-start, you may also like to try out our template/boilerplate app [here][boilerplate]

The following instructions assume you have a project already created, and you have `npm` installed and operable.

```bash
npm install @mavrykdynamics/taquito
```

## Import the library in your project

### Import `MavrykToolkit` from `@mavrykdynamics/taquito` and instantiate it

The constructor of the `MavrykToolkit` class takes an RPC URL as a parameter. It can be a string or a [RpcClient](rpc_package.md) object. A list of community-run nodes can be accessed [here](rpc_nodes.md#list-of-community-run-nodes).

```js
import { MavrykToolkit } from '@mavrykdynamics/taquito';

const mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
```

In some cases, it can be useful to make more than one instance of Taquito, perhaps if you wanted to communicate with two different RPC nodes or offer other Signing options. You can now up separate instances with various providers or configurations per instance.

## Configuration

### Changing the underlying signer

Taquito's Contract API supports different signers. There is no default signer configured. A signer is required if you intend to inject operations into the Mavryk blockchain.

You can set which signer you wish to use as follows:

```js
import { MavrykToolkit } from '@mavrykdynamics/taquito';
import { RemoteSigner } from '@mavrykdynamics/taquito-remote-signer';

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');

Mavryk.setProvider({
  signer: new RemoteSigner(pkh, rootUrl, { headers: requestHeaders });,
});
```

Alternatively, you can use a `WalletProvider` to interact with a wallet. Please refer to the [Wallet API](wallet_API.md) documentation for more information.

## Examples

### Get the current Mavryk spendable balance for an address

```js live noInline
// import { MavrykToolkit } from '@mavrykdynamics/taquito';
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

Mavryk.mv
  .getBalance('mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc')
  .then((balance) => println(`${balance.toNumber() / 1000000} ṁ`))
  .catch((error) => println(JSON.stringify(error)));
```

### Using the inMemory Signer and Importing a key

The `InMemorySigner` package is useful for development and testing. It's an easy way to get started with Mavryk when you don't need to interact with a user's wallet. The `InMemorySigner` is suitable for testing and development. Should you be writing code for production that deals with real value tokens, we strongly recommend that you use a RemoteSigner that an HSM backs.

This feature will import your private key in memory and sign operations using this key.

#### Importing a Private key

If you have a private key, you can import it as follows:

```js
import { MavrykToolkit } from '@mavrykdynamics/taquito';
import { InMemorySigner, importKey } from '@mavrykdynamics/taquito-signer';

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');

Mavryk.setProvider({
  signer: new InMemorySigner('YOUR_PRIVATE_KEY'),
});
```

The following link can be used to fund an address on the different testnets: https://teztnets.com/.

### Transfer

The transfer operation requires a configured signer. In this example, we will use a private key to fetch a key service implemented for demonstration purposes. You should only use this key service for testing and development purposes.

<Tabs
defaultValue="contractAPI"
values={[
{label: 'Contract API', value: 'contractAPI'},
{label: 'Wallet API', value: 'walletAPI'}
]}>
<TabItem value="contractAPI">

```js live noInline
const amount = 2;
const address = 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc';

println(`Transfering ${amount} ṁ to ${address}...`);
Mavryk.contract
  .transfer({ to: address, amount: amount })
  .then((op) => {
    println(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => println(`Operation injected: https://ghost.tzstats.com/${hash}`))
  .catch((error) => println(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
```

</TabItem>
  <TabItem value="walletAPI">

```js live noInline wallet
const amount = 2;
const address = 'mv1UrqbBFBXnEdHnvSrMpt2BQnZzFMA9HQnc';

println(`Transfering ${amount} ṁ to ${address}...`);
Mavryk.wallet
  .transfer({ to: address, amount: amount })
  .send()
  .then((op) => {
    println(`Waiting for ${op.opHash} to be confirmed...`);
    return op.confirmation(1).then(() => op.opHash);
  })
    .then((hash) => println(`Operation injected: https://ghost.tzstats.com/${hash}`))
  .catch((error) => println(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
```

  </TabItem>
</Tabs>

### Interact with a smart contract

Calling smart contract operations requires a configured signer. The Ligo source code for the smart contract [KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7][smart_contract_on_better_call_dev] used in this example can be found in a [Ligo Web IDE][smart_contract_source].

<Tabs
defaultValue="contractAPI"
values={[
{label: 'Contract API', value: 'contractAPI'},
{label: 'Wallet API', value: 'walletAPI'}
]}>
<TabItem value="contractAPI">

```js live noInline
Mavryk.contract
  .at('KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7')
  .then((contract) => {
    const i = 7;

    println(`Incrementing storage value by ${i}...`);
    return contract.methodsObject.increment(i).send();
  })
  .then((op) => {
    println(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => println(`Operation injected: https://ghost.tzstats.com/${hash}`))
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```

</TabItem>
  <TabItem value="walletAPI">

```js live noInline wallet
Mavryk.wallet
  .at('KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7')
  .then((wallet) => {
    const i = 7;

    println(`Incrementing storage value by ${i}...`);
    return wallet.methodsObject.increment(i).send();
  })
  .then((op) => {
    println(`Waiting for ${op.opHash} to be confirmed...`);
    return op.confirmation(1).then(() => op.opHash);
  })
  .then((hash) => println(`Operation injected: https://ghost.tzstats.com/${hash}`))
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```


  </TabItem>
</Tabs>

[boilerplate]: https://github.com/mavryk-network/mavryk-taquito-boilerplate
[smart_contract_source]: https://ide.ligolang.org/p/2sVshnZ_Aat5pIuUypIBsQ
[smart_contract_on_better_call_dev]: https://better-call.dev/basenet/KT1BJadpDyLCACMH7Tt9xtpx4dQZVKw9cDF7/operations
