---
title: Mavryk Domains
id: tezos_domains
author: Claude Barde
---

A Mavryk domain is a feature that allows users of the Mavryk blockchain to use a human-readable and easy to remember address (for example, `alice.mav`) instead of a long string of letters and numbers (for example, `mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv`). The data about which address owns which domain is stored as a token inside a smart contract, so it's possible to find this piece of information when inspecting the storage of the contract.

Let's have a look at the Mavryk domain contract on testnet to see how we can find a domain associated to an address and vice-versa.

> Note: the domains have a different extension on the various networks. All the domains on mainnet have the `.mav` extension while the domains on florencenet have a `.flo` extension. However, the contracts work exactly in the same way.

## Looking up an address

If you have an address and you want to find the domain tied to it, the storage of the Mavryk domain contract holds a bigmap called `reverse_records` whose keys are addresses and whose values include the corresponding Mavryk domain. Here is a little function to fetch it:

```typescript
import { MavrykToolkit } from "@mavrykdynamics/taquito";
import { bytesToString } from "@mavrykdynamics/taquito-utils";

const domainContractAddress = "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS";

// the function returns the domain name if found or the provided address
const fetchMavrykDomainFromAddress = async (address: string): Promise<string> => {
    const Mavryk = new MavrykToolkit("https://mainnet.ecadinfra.com");
    const contract = await Mavryk.wallet.at(domainContractAddress);
    const storage: any = await contract.storage();
    const domain = await storage.store.reverse_records.get(address);
    if (domain) {
      return bytesToString(domain.name);
    } else {
      return address;
    }
};

```

2 things to remember when you are looking for a Mavryk domain in the storage of the contract:
- the `reverse_records` bigmap is nested inside the `store` property
- the domain name is stored as bytes, so you can use the `bytesToString` function from `@mavrykdynamics/taquito-utils` to decode it as a string.

If we call the `fetchMavrykDomainFromAddress` function with `mv1TfAvXWDtT4Q8sVrqiLzLEhpa9fjteEKgK`, it will return `taquito.mav`.

## Looking up a Mavryk domain

It is also possible to look up a domain name to find the address it references. In this case, you will use the `records` bigmap that you can also find under the `store` property of the storage:

```typescript
import { MavrykToolkit } from "@mavrykdynamics/taquito";
import { bytesToString } from "@mavrykdynamics/taquito-utils";

const contractAddress = "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS";

// the function returns the address if found or the provided domain name
const fetchAddressFromMavrykDomain = async (domainName: string): Promise<string> => {
    const Mavryk = new MavrykToolkit("https://mainnet.ecadinfra.com");
    const contract = await Mavryk.wallet.at(contractAddress);
    const storage: any = await contract.storage();
    const domain = await storage.store.records.get(stringToBytes(domainName));
    if (domain) {
      return domain.address; // address that the domain points to 
      // return domain.owner; // address that owns the domainName
    } else {
      return domainName;
    }
};

```

This function works in the same manner as the previous one, but the owner's address is a simple address and doesn't need to be decoded.

## Looking up the expiry date of a domain

The Mavryk domains have an expiry date after which they must be renewed or they will be available again.
To find the expiry date, you can check the `expiry_map` bigmap under the `store` property of the storage where the keys are the domain names encoded into bytes:

```typescript
import { MavrykToolkit } from "@mavrykdynamics/taquito";
import { bytesToString } from "@mavrykdynamics/taquito-utils";

const contractAddress = "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS";

// this function return the expiry date of a domain name
const fetchExpiryDate = async (domainName: string): Promise<string> => {
    const Mavryk = new MavrykToolkit("https://mainnet.ecadinfra.com");
    const contract = await Mavryk.wallet.at(contractAddress);
    const storage: any = await contract.storage();
    const expiryDate = await storage.store.expiry_map.get(stringToBytes(domainName));
    if (expiryDate) {
      return expiryDate;
    } else {
      return "not a valid domain name";
    }
}
```

If you provide `taquito.mav` as a parameter, the function will return `2023-04-30T00:00:00Z`, meaning that the domain name expires in April 9th, 2023.
