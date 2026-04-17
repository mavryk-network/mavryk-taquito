<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

# WebMavryk Mavlet Wallet package

_Documentation can be found [here](https://webmavryk.mavryk.org/docs/wallet_API)_  
_TypeDoc style documentation is available [here](https://webmavryk.mavryk.org/typedoc/modules/_webmavryk_mavlet_wallet.html)_

## General Information

`@mavrykdynamics/webmavryk-mavlet-wallet` is an npm package implementing the TZIP-10 standard that describes the communication between decentralized applications and wallets. The package provides developers a way to connect a dapp built with WebMavryk to a wallet giving the freedom to the users of the dapp to choose the wallet they want.

## Install

Install the package as follows

```
npm install @mavrykdynamics/webmavryk-mavlet-wallet
```

## Usage

Create a wallet instance with defined option parameters and set the wallet provider using `setWalletProvider` to the `MavrykToolkit` instance

```ts
import { MavrykToolkit } from '@mavrykdynamics/webmavryk';
import { MavletWallet } from '@mavrykdynamics/webmavryk-mavlet-wallet';

const options = {
  name: 'MyAwesomeDapp',
  iconUrl: 'https://webmavryk.mavryk.org/img/favicon.ico',
  network: { type: 'basenet' },
  enableMetrics: true,
};
const wallet = new MavletWallet(options);

await wallet.client.subscribeToEvent(
  MavletEvent.ACTIVE_ACCOUNT_SET,
  async (account) => {
    // An active account has been set, update the dApp UI
    console.log(`${MavletEvent.ACTIVE_ACCOUNT_SET} triggered: `, account);
  },
);
await wallet.requestPermissions();

const Mavryk = new MavrykToolkit('https://YOUR_PREFERRED_RPC_URL');
Mavryk.setWalletProvider(wallet);
```

## Additional Info

See the top-level [https://github.com/mavryk-network/webmavryk](https://github.com/mavryk-network/webmavryk) file for details on reporting issues, contributing and versioning.

## Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
