---
title: Drain an account
author: Roxane Letourneau
---

This section shows how to transfer all tokens from one account (implicit or originated) to another so that the source account balance is zero.

## Draining implicit accounts (mv1, mv2, mv3)

We want to "empty" an implicit account by sending all of its tokens to another account. It can be tricky to empty a mavryk account because the system must subtract the gas fee from the account balance.

To do so, we first need to estimate the fees related to this operation. The `estimate` property of the `MavrykToolkit` provides access to operation estimation utilities. Calling the `transfer` method will return an instance of the `Estimate` class and its `suggestedFeeMumav` property will allow us to know the fee associated with the operation.

Once we know the associated fees, we can calculate the maximum amount that needs to send to drain the account by subtracting these fees from the account balance.

Finally, we can do the transfer operation and use the maximum amount we just calculated as the `amount` parameter of the `transfer` function.

:::note
In the following example, we have not revealed the account that we want to empty. We need to keep in mind that there are fees related to a reveal operation. We are subtracting 374 mumav from the balance to cover reveal fees.

**If the account to drain has already been revealed, you must not subtract the reveal fee from the balance.**
:::

```js live noInline
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');
// import { getRevealFee } from "@mavrykdynamics/taquito";

Mavryk.signer
    .publicKeyHash()
    .then((address) => {
        Mavryk.mv.getBalance(address).then((balance) => {
            println(
                `The account we want to drain is ${address}.\nIts initial balance is ${
                  balance.toNumber() / 1000000
                  } ṁ.`
            );
            return Mavryk.estimate
                .transfer({
                    to: 'mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo',
                    amount: balance.toNumber() - getRevealFee(address), // Remove default reveal fee
                    mumav: true
                })
                .then((estimate) => {
                    const maxAmount = balance.minus(
                      estimate.suggestedFeeMumav + getRevealFee(address)
                    ).toNumber();
                    println(
                        `The estimated fees related to the emptying operation are ${
                          estimate.suggestedFeeMumav
                        } mumav.\nThe fees related to the reveal operation are ${
                          getRevealFee(address)
                        } mumav.\nConsidering those fees, the amount we need to send to empty the account is ${
                          maxAmount / 1000000
                        } ṁ.`
                    );
                    return Mavryk.contract.transfer({
                        to: 'mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo',
                        mumav: true,
                        amount: maxAmount,
                        fee: estimate.suggestedFeeMumav,
                        gasLimit: estimate.gasLimit,
                        storageLimit: 0
                    });
                })
                .then((op) => {
                    println(`Waiting for confirmation of the draining operation...`);
                    return op.confirmation(1).then(() => op.hash);
                })
                .then((hash) => {
                    println(`The account has been emptied.`);
                    return Mavryk.mv.getBalance(address);
                })
                .then((finalBalance) => {
                    println(`The balance is now ${finalBalance.toNumber() / 1000000} ṁ.`);
                });
        });
    })
    .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```

## Draining originated accounts (KT1)

In the following example, we first originate a contract with a starting balance of 8 ṁ. Then, we transfer all of its tokens to an implicit account.

The contract we originate is a `manager contract.` It has a `do` method taking a lambda function as a parameter. We call the smart contract by passing a function called `transferImplicit` to its `do` method to transfer its tokens to the implicit address. More information on transfers involving originated KT1 addresses can be found [here](https://taquito.mavryk.org/docs/making_transfers#transfers-involving-originated-kt1-addresses).

In the example, we estimate the transfer operation before doing it. The associated fees are deducted from the manager's address when draining the account. Thus, for the operation to be successful, the manager's address for that account must contain funds to cover the gas.

```js live noInline
// const Mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network');

function transferImplicit(key, mumav) {
  return [
    { prim: 'DROP' },
    { prim: 'NIL', args: [{ prim: 'operation' }] },
    {
      prim: 'PUSH',
      args: [{ prim: 'key_hash' }, { string: key }],
    },
    { prim: 'IMPLICIT_ACCOUNT' },
    {
      prim: 'PUSH',
      args: [{ prim: 'mumav' }, { int: `${mumav}` }],
    },
    { prim: 'UNIT' },
    { prim: 'TRANSFER_TOKENS' },
    { prim: 'CONS' },
  ];
}

Mavryk.signer
  .publicKeyHash()
  .then((address) => {
    Mavryk.contract
      .originate({
        balance: '8',
        code: managerCode,
        init: { string: address },
      })
      .then((contractOrigination) => {
        println(
          `Waiting for confirmation of origination for ${contractOrigination.contractAddress}...`
        );
        return contractOrigination.contract();
      })
      .then((contract) => {
        println(`Origination completed.`);
        Mavryk.mv.getBalance(contract.address).then((balance) => {
          println(`The balance of the contract is ${balance.toNumber() / 1000000} ꜩ.`);
          const estimateOp = contract.methodsObject
            .do(transferImplicit('mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo', balance.toNumber()))
            .toTransferParams({});
          println(`Waiting for the estimation of the smart contract call...`);
          Mavryk.estimate
            .transfer(estimateOp)
            .then((estimate) => {
              //Will be deducted from manager's address
              println(
                `The estimated fees related to the emptying operation are ${estimate.suggestedFeeMumav} mumav.`
              );
              return contract.methodsObject
                .do(transferImplicit('mv1EQssQ7RPhKvocd4rhHsSA1BYGe5VKYeDo', balance.toNumber()))
                .send({ amount: 0 });
            })
            .then((operation) => {
              println(`Waiting for confirmation of the draining operation...`);
              return operation.confirmation(1).then(() => operation.hash);
            })
            .then((hash) => {
              println(`The account has been emptied.`);
              return Mavryk.mv.getBalance(contract.address);
            })
            .then((finalBalance) => {
              println(`The balance is now ${finalBalance.toNumber() / 1000000} ṁ.`);
            });
        });
      });
  })
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
```
