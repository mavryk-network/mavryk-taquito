<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

# WebMavryk RPC package
*Documentation can be found [here](https://webmavryk.mavryk.org/docs/rpc_package)*  
*TypeDoc style documentation is available on-line [here](https://webmavryk.mavryk.org/typedoc/modules/_webmavryk_rpc.html)*

`@mavrykdynamics/webmavryk-rpc` is an npm package that provides low-level methods and types to invoke RPC calls from a Nomadic Mavryk RPC node.

## General Information

The RPC package can be used to query the RPC API of your chosen node. Methods in the RPC package map one-to-one to the corresponding Mavryk RPC API endpoints. All responses from the RPC are returns with TypeScript types.

The higher-level `@mavrykdynamics/webmavryk` package builds on this RPC package.

## Install

```
npm i --save @mavrykdynamics/webmavryk-rpc
```

## Usage
### RpcClient

The constructor of the `RpcClient` takes an RPC URL as a parameter and an optional chain (default is main).

```ts
import { RpcClient } from '@mavrykdynamics/webmavryk-rpc';

const client = new RpcClient('https://YOUR_PREFERRED_RPC_URL');

// Fetching the balance of an account in mumav (micro ꝳ)
const balance = await client.getBalance('mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv');
```

### RpcClientCache

The `RpcClientCache` class aims to improve the performance of dApps built using WebMavryk by reducing the number of calls made to the RPC. Its constructor takes a RpcClient instance as a parameter and an optional ttl (time to live). The RpcClient responses will be cached for the period defined by the ttl (default is of 1000 milliseconds). The `RpcClientCache` can be injected to the MavrykToolkit as follow:

```ts
import { MavrykToolkit } from '@mavrykdynamics/webmavryk';
import { RpcClient, RpcClientCache } from '@mavrykdynamics/webmavryk-rpc';

const rpcClient = new RpcClient('https://YOUR_PREFERRED_RPC_URL');
const mavryk = new MavrykToolkit(new RpcClientCache(rpcClient));
```
## Additional info

See the top-level project [https://github.com/mavryk-network/webmavryk](https://github.com/mavryk-network/webmavryk) for details on reporting issues, contributing and versioning.

## Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
