
// This example can be flaky as the result depends on the state of the ledger device.
// Sometimes the transport will fail before all the paths have been scanned
// rerun two or three times if needed

import { LedgerSigner, DerivationType } from '@mavrykdynamics/taquito-ledger-signer';
import { MavrykToolkit } from '@mavrykdynamics/taquito';
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

async function example() {

    const transport = await TransportNodeHid.create();
    let index = 0;
    const mavryk = new MavrykToolkit('https://basenet.rpc.mavryk.network')
    while (index < 8) {
        const ledgerSigner = new LedgerSigner(transport, `44'/1729'/${index}'/0'`, false, DerivationType.ED25519);
        mavryk.setProvider({ signer: ledgerSigner });
        const pkh = await mavryk.signer.publicKeyHash();
        const balance = await mavryk.mv.getBalance(pkh)
        const getPublicKey = await mavryk.rpc.getManagerKey(pkh)
        console.log(`The public key hash related to the derivation path having the account ${index} is ${pkh}.`)
        if (getPublicKey) {
            console.log(`The balance is ${balance.toNumber() / 1000000} ṁ.\n`)
        } else {
            console.log('This account is not revealed.\n')
        }
        index++
    }
}

example();
