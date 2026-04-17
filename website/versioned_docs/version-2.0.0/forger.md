---
title: Forger
author: Roxane Letourneau
---

<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

Operations must be _forged_ and _signed_ before it gets injected into the blockchain. _Forging_ is the act of encoding your operation into its binary representation. 

## Forger implementations 

Forging can be done either remotely using the RPC node or locally. Note that forging locally is considered a safer option. **If forging remotely, it is important to ensure that the node is trusted.** 

Since version 12 of Webmavryk, an instance of `LocalForger` is set by default on the `MavrykToolkit`. The `LocalForger` is implemented in the `@mavrykdynamics/webmavryk-local-forging` package, which provides developers with local forging and parsing functionalities.

### Changing the underlying forger

#### Composite forger

Using a Composite forger can provide additional security because the binary returned by the forger instances will be compared and if there is a mismatch, a `ForgingMismatchError` will be thrown. Here is an example of a composite forger using the `LocalForger` and the `RpcForger`. 

```js
import { MavrykToolkit, RpcForger, CompositeForger } from '@mavrykdynamics/webmavryk';
import { localForger } from '@mavrykdynamics/webmavryk-local-forging';

const mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
const rpcForger = mavryk.getFactory(RpcForger)();
const composite = new CompositeForger([rpcForger, localForger]);
mavryk.setForgerProvider(composite);
```

#### RpcForger

When the node is trusted, the forger can be set to an instance of `RpcForger` as follow:

```js
import { MavrykToolkit, RpcForger } from '@mavrykdynamics/webmavryk';

const mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
mavryk.setForgerProvider(Mavryk.getFactory(RpcForger)());
```
