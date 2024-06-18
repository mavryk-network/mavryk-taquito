# Taquito Sapling package

_Documentation can be found [here](https://taquito.mavryk.org/docs/next/sapling)_  
_TypeDoc style documentation is available on-line [here](https://taquito.mavryk.org/typedoc/modules/_taquito_sapling.html)_

## General Information

Sapling is a protocol allowing to perform private transactions in a decentralized environment. This package allows to read from a sapling state (retrieve the balance and transaction history) and prepare sapling transactions.

## Install

Install the package as follows

```
npm install @mavrykdynamics/taquito-sapling
```
## Usage

**Retrieve a balance in the Sapling shielded pool**

The returned balance is in mumav.

```ts
import { MavrykToolkit, RpcReadAdapter } from '@mavrykdynamics/taquito';
import { SaplingToolkit, InMemorySpendingKey } from '@mavrykdynamics/taquito-sapling';

const mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network/');

const saplingContract = await mavryk.contract.at('KT1UYwMR6Q6LZnwQEi77DSBrAjKT1tEJb245');

const inMemorySpendingKey = await InMemorySpendingKey.fromMnemonic('YOUR_MNEMONIC');

const readProvider = new RpcReadAdapter(mavryk.rpc);

const saplingToolkit = new SaplingToolkit(
    { saplingSigner: inMemorySpendingKey },
    { contractAddress: saplingContract.address, memoSize: 8 },
    readProvider
)

const txViewer = await saplingToolkit.getSaplingTransactionViewer();
const initialBalance = await txViewer.getBalance();
```

**Prepare a shielded transaction**

A shielded transaction allows sending tokens from a Mavryk account (mv1, mv2, mv3) to a Sapling address (zet).

```ts
import { MavrykToolkit, RpcReadAdapter } from '@mavrykdynamics/taquito';
import { SaplingToolkit, InMemorySpendingKey } from '@mavrykdynamics/taquito-sapling';

const mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network/');
// set up your signer on the MavrykToolkit as usual
const saplingContract = await mavryk.contract.at('KT1UYwMR6Q6LZnwQEi77DSBrAjKT1tEJb245');

const inMemorySpendingKey = await InMemorySpendingKey.fromMnemonic('YOUR_MNEMONIC');

const readProvider = new RpcReadAdapter(mavryk.rpc);

const saplingToolkit = new SaplingToolkit(
    { saplingSigner: inMemorySpendingKey },
    { contractAddress: saplingContract.address, memoSize: 8 },
    readProvider
)

// Fetch a payment address (zet)
const inMemoryViewingKey = await inMemorySpendingKey.getSaplingViewingKeyProvider();
const paymentAddress = (await inMemoryViewingKey.getAddress()).address;

// prepare the shielded transaction
const shieldedTx = await saplingToolkit.prepareShieldedTransaction([{
    to: paymentAddress,
    amount: 3,
    memo: 'test',
    mumav: false // set to false by default
}])

// Inject the sapling transaction using the ContractAbstraction
// The amount MUST be specified in the send method to transfer the 3 mav to the shielded pool
const op = await saplingContract.methodsObject.default([shieldedTx]).send({ amount: 3 });
await op.confirmation();
```

Refer to the website documentation for further examples and information: https://taquito.mavryk.org/docs/next/sapling

## Additional info

See the top-level project [https://github.com/ecadlabs/taquito](https://github.com/ecadlabs/taquito) for details on reporting issues, contributing and versioning.

## Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
