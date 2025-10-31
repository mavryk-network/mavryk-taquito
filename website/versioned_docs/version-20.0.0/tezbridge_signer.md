<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

---
title: TezBridge Signer
author: Simon Boissonneault-Robert
---

:::note
TezBridge Signer is deprecated in v13
:::
## Usage

You first need to include https://www.tezbridge.com/plugin.js in your application to use this signer

```js
import { TezBridgeSigner } from '@mavrykdynamics/webmavryk-tezbridge-signer'
import { MavrykToolkit } from "@mavrykdynamics/webmavryk";

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');

Mavryk.setProvider({signer: new TezBridgeSigner()})
```

For more information on how to use TezBridge see https://docs.tezbridge.com/
