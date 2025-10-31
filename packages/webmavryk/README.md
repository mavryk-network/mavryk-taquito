<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

# WebMavryk high-level functions

*TypeDoc style documentation is available on-line [here](https://webmavryk.mavryk.org/typedoc/modules/_webmavryk_webmavryk.html)*

The `@mavrykdynamics/webmavryk` package contains higher-level functionality that builds upon the other packages in the Mavryk Typescript Library Suite.

## CDN Bundle

```html
<script src="https://unpkg.com/@mavrykdynamics/webmavryk@20.0.0/dist/webmavryk.min.js"
crossorigin="anonymous" integrity="sha384-IxvP0ECHi5oqLyz94wF85pU9+ktcsL1HHtA42MITxZsGbsUMEu/g+0Vkjj5vqiMR"></script>
```

## General Information

The `MavrykToolkit` is a facade class that surfaces all of the library's capability and allows its configuration through different providers.

## Install

```
npm i --save @mavrykdynamics/webmavryk
```


## Minimal configuration
### MavrykToolkit instantiation

The `MavrykToolkit` constructor takes at least an RPC URL as a parameter. When instantiating the toolkit with a URL, a default instance of `RpcClient` is created. The `RpcClient` class is used to interact with the Mavryk network.

```ts
import { MavrykToolkit } from '@mavrykdynamics/webmavryk';

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
```

It is also possible to instantiate the `MavrykToolkit` with a class that implements the `RpcClientInterface`. See the `RpcClientCache` from the `@mavrykdynamics/webmavryk-rpc` package as an example that provides caching functionality.

### Choosing between the contract or the wallet APIs

In most cases, you want to use the Wallet API when you give the users of your dapp the freedom to choose the wallet of their choice to interact with. The Contract API is more suited for back-end applications and forging/signing offline (for example, using the inMemorySigner). You would also use the Contract API to build a wallet.

**Configure a signer to use the Contract API**

Sending operations using the Contract API requires a signer to be configured. WebMavryk provides different signer implementations (e.g. see the `webmavryk/remote-signer`, `webmavryk/signer` and `webmavryk/legder-signer`). Here is an example using the `InMemorySigner`:

```js
import { InMemorySigner } from '@mavrykdynamics/webmavryk-signer';
import { MavrykToolkit } from '@mavrykdynamics/webmavryk';

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');

Mavryk.setProvider({ signer: await InMemorySigner.fromSecretKey('edsk...') });

// Using the contract API, the follwing operation is signed using the configured signer:
await Mavryk.contract.transfer({ to: publicKeyHash, amount: 2 });
```

**Configure a wallet to use the Wallet API**

Sending operations using the Wallet API requires a wallet to be configured. The wallet API supports different kinds of wallets. For example, the `BeaconWallet` from the `@mavrykdynamics/webmavryk-beacon-wallet` can be used. Use the `setWalletProvider` method of the `MavrykToolkit` to set the wallet and refer to the `@mavrykdynamics/webmavryk-beacon-wallet` for specific configuration:

```ts
import { MavrykToolkit } from '@mavrykdynamics/webmavryk';
import { BeaconWallet } from '@mavrykdynamics/webmavryk-beacon-wallet';

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
const wallet = new BeaconWallet(options);

await wallet.requestPermissions(network);

Mavryk.setWalletProvider(wallet);

// Using the wallet API, the configured wallet will prepare the transaction and broadcast it
await Mavryk.wallet.transfer({ to: publicKeyHash, amount: 2 }).send();
```

## MavrykToolkit examples of additional configuration

The `MavrykToolkit` contains different default providers that are customizable to adapt to users' needs.

### Forger

Replace the default `RpcForger` with an instance of `LocalForger`:

```ts
import { localForger } from '@mavrykdynamics/webmavryk-local-forger'
Mavryk.setForgerProvider(localForger);
```

### Packer

To fetch values of the big map using the local implementation to pack data, replace the default `RpcPacker` with an instance of `MichelCodecPacker`:

```ts
import { MichelCodecPacker } from '@mavrykdynamics/webmavryk';
// Fetch values of the big map using local implementation to pack data
Mavryk.setPackerProvider(new MichelCodecPacker());
```

### Poller configuration

Polling interval for operation confirmation can be set globally for a webmavryk instance.

```js
Mavryk.setProvider(
    {
        config: {
            confirmationPollingIntervalSecond: 5,
            confirmationPollingTimeoutSecond: 180
        }
    }
)
```

## Estimation

Use the `estimate` member to estimate fees, gas and storage of operations.

```ts
const estimate = await Mavryk.estimate.transfer(transferParams);
```

## Stream

Use the `stream` member to subscribe to specific operations:

```ts
Mavryk.setProvider({
    config: { shouldObservableSubscriptionRetry: true, streamerPollingIntervalMilliseconds: 15000 }
});

const bakerAttestationFilter = {
    and: [{ source: 'mv2MzgCFpDwh37SnEdzzMhQWzmCyj32tCsMG' }, { kind: 'attestation' }]
}

const bakerDelegation = {
    and: [{ destination: 'mv2MzgCFpDwh37SnEdzzMhQWzmCyj32tCsMG' }, { kind: 'delegation' }]
}

const sub = mavryk.stream.subscribeOperation({
    or: [bakerAttestationFilter, bakerDelegation]
})

sub.on('data', console.log)
```

## Additional info

See the top-level [https://github.com/mavryk-network/webmavryk](https://github.com/mavryk-network/webmavryk) file for details on reporting issues, contributing and versioning.

## Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
