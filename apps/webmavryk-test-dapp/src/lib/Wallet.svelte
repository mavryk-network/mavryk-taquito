<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { fly } from "svelte/transition";
  import { MavrykToolkit } from "@mavrykdynamics/webmavryk";
  import { MavletWallet } from "@mavrykdynamics/webmavryk-mavlet-wallet";
  import { MavletEvent, type DAppClientOptions } from "@mavrykdynamics/mavlet-sdk";
  import store from "../store";
  import { formatTokenAmount, shortenHash } from "../utils";
  import {
    defaultMatrixNode,
    getRpcUrl,
    defaultNetworkType,
    type SupportedNetworks,
  } from "../config";
  import type { MavrykAccountAddress } from "../types";

  let showDialog = false;
  let connectedWallet = "";

  const createNewWallet = (config: { networkType: SupportedNetworks }) => {
    const options: DAppClientOptions = {
      name: "Webmavryk Test Dapp",
      matrixNodes: [defaultMatrixNode] as any,
      network: {
        type: config.networkType,
        rpcUrl: getRpcUrl(config.networkType),
      },
      walletConnectOptions: {
        projectId: "ba97fd7d1e89eae02f7c330e14ce1f36",
      },
      enableMetrics: $store.enableMetrics,
    };
    // if ($store.disableDefaultEvents) {
    //   options.disableDefaultEvents = true;
    //   options.eventHandlers = {
    //     // To keep the pairing alert, we have to add the following default event handlers back
    //     [MavletEvent.PAIR_INIT]: {
    //       handler: defaultEventCallbacks.PAIR_INIT
    //     },
    //     [MavletEvent.PAIR_SUCCESS]: {
    //       handler: defaultEventCallbacks.PAIR_SUCCESS
    //     }
    //   }
    // }
    return new MavletWallet(options);
  };

  const connectWallet = async () => {
    const wallet = await setWallet({
      networkType: $store.networkType,
    });

    await subscribeToAllEvents(wallet);

    try {
      await wallet.requestPermissions();

      const userAddress = (await wallet.getPKH()) as MavrykAccountAddress;
      store.updateUserAddress(userAddress);
      const url = getRpcUrl($store.networkType);
      const Mavryk = new MavrykToolkit(url);
      Mavryk.setWalletProvider(wallet);
      store.updateMavryk(Mavryk);

      const balance = await Mavryk.mv.getBalance(userAddress);
      if (balance) {
        store.updateUserBalance(balance.toNumber());
      }

      store.updateWallet(wallet);

      const peers = await wallet.client.getPeers();
      connectedWallet = peers[0].name;
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    await $store.wallet?.clearActiveAccount();
    store.updateUserAddress(undefined);
    store.updateUserBalance(undefined);
    store.updateWallet(undefined);
    store.updateSelectedTest(undefined);
  };

  export const setWallet = async (config: { networkType: SupportedNetworks }) => {
    store.updateNetworkType(config.networkType);

    const wallet = createNewWallet(config);
    store.updateWallet(wallet);
    const url = getRpcUrl(config.networkType);
    const Mavryk = new MavrykToolkit(url);
    Mavryk.setWalletProvider(wallet);
    store.updateMavryk(Mavryk);

    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const userAddress = (await wallet.getPKH()) as MavrykAccountAddress;
      store.updateUserAddress(userAddress);

      const balance = await Mavryk.mv.getBalance(userAddress);
      if (balance) {
        store.updateUserBalance(balance.toNumber());
      }
    }
    return wallet;
  };

  onMount(async () => {
    store.updateNetworkType(defaultNetworkType);
  });

  afterUpdate(async () => {
    if ($store.wallet) {
      const activeAccount = await $store.wallet.client.getActiveAccount();
      if (activeAccount) {
        const peers = await $store.wallet.client.getPeers();
        if (peers && Array.isArray(peers) && peers.length > 0) {
          connectedWallet = peers[0].name;
        }
      }
    }
  });

  const saveLog = (data: unknown, eventType: MavletEvent) => {
    const log = JSON.stringify({ eventType, data });
    store.addEvent(log);
  };

  async function subscribeToAllEvents(wallet: MavletWallet) {
    await wallet.client.subscribeToEvent(MavletEvent.PERMISSION_REQUEST_SENT, (data) =>
      saveLog(data, MavletEvent.PERMISSION_REQUEST_SENT),
    );
    await wallet.client.subscribeToEvent(MavletEvent.PERMISSION_REQUEST_SUCCESS, (data) =>
      saveLog(data, MavletEvent.PERMISSION_REQUEST_SUCCESS),
    );
    await wallet.client.subscribeToEvent(MavletEvent.PERMISSION_REQUEST_ERROR, (data) =>
      saveLog(data, MavletEvent.PERMISSION_REQUEST_ERROR),
    );
    await wallet.client.subscribeToEvent(MavletEvent.OPERATION_REQUEST_SENT, (data) =>
      saveLog(data, MavletEvent.OPERATION_REQUEST_SENT),
    );
    await wallet.client.subscribeToEvent(MavletEvent.OPERATION_REQUEST_SUCCESS, (data) =>
      saveLog(data, MavletEvent.OPERATION_REQUEST_SUCCESS),
    );
    await wallet.client.subscribeToEvent(MavletEvent.OPERATION_REQUEST_ERROR, (data) =>
      saveLog(data, MavletEvent.OPERATION_REQUEST_ERROR),
    );
    await wallet.client.subscribeToEvent(MavletEvent.SIGN_REQUEST_SENT, (data) =>
      saveLog(data, MavletEvent.SIGN_REQUEST_SENT),
    );
    await wallet.client.subscribeToEvent(MavletEvent.SIGN_REQUEST_SUCCESS, (data) =>
      saveLog(data, MavletEvent.SIGN_REQUEST_SUCCESS),
    );
    await wallet.client.subscribeToEvent(MavletEvent.SIGN_REQUEST_ERROR, (data) =>
      saveLog(data, MavletEvent.SIGN_REQUEST_ERROR),
    );
    await wallet.client.subscribeToEvent(MavletEvent.BROADCAST_REQUEST_SENT, (data) =>
      saveLog(data, MavletEvent.BROADCAST_REQUEST_SENT),
    );
    await wallet.client.subscribeToEvent(MavletEvent.BROADCAST_REQUEST_SUCCESS, (data) =>
      saveLog(data, MavletEvent.BROADCAST_REQUEST_SUCCESS),
    );
    await wallet.client.subscribeToEvent(MavletEvent.BROADCAST_REQUEST_ERROR, (data) =>
      saveLog(data, MavletEvent.BROADCAST_REQUEST_ERROR),
    );
    await wallet.client.subscribeToEvent(MavletEvent.ACKNOWLEDGE_RECEIVED, (data) =>
      saveLog(data, MavletEvent.ACKNOWLEDGE_RECEIVED),
    );
    await wallet.client.subscribeToEvent(MavletEvent.LOCAL_RATE_LIMIT_REACHED, (data) =>
      saveLog(data, MavletEvent.LOCAL_RATE_LIMIT_REACHED),
    );
    await wallet.client.subscribeToEvent(MavletEvent.NO_PERMISSIONS, (data) =>
      saveLog(data, MavletEvent.NO_PERMISSIONS),
    );

    await wallet.client.subscribeToEvent(MavletEvent.ACTIVE_ACCOUNT_SET, (data) => {
      saveLog(data, MavletEvent.ACTIVE_ACCOUNT_SET);
      store.updateUserAddress(data.address);
      store.updateNetworkType(data.network.type as SupportedNetworks);
    });

    await wallet.client.subscribeToEvent(MavletEvent.ACTIVE_TRANSPORT_SET, (data) =>
      saveLog(data, MavletEvent.ACTIVE_TRANSPORT_SET),
    );
    await wallet.client.subscribeToEvent(MavletEvent.SHOW_PREPARE, (data) =>
      saveLog(data, MavletEvent.SHOW_PREPARE),
    );
    await wallet.client.subscribeToEvent(MavletEvent.HIDE_UI, (data) =>
      saveLog(data, MavletEvent.HIDE_UI),
    );
    await wallet.client.subscribeToEvent(MavletEvent.PAIR_INIT, (data) =>
      saveLog(data, MavletEvent.PAIR_INIT),
    );
    await wallet.client.subscribeToEvent(MavletEvent.PAIR_SUCCESS, (data) =>
      saveLog(data, MavletEvent.PAIR_SUCCESS),
    );
    await wallet.client.subscribeToEvent(MavletEvent.CHANNEL_CLOSED, (data) =>
      saveLog(data, MavletEvent.CHANNEL_CLOSED),
    );
    await wallet.client.subscribeToEvent(MavletEvent.INTERNAL_ERROR, (data) =>
      saveLog(data, MavletEvent.INTERNAL_ERROR),
    );
    await wallet.client.subscribeToEvent(MavletEvent.UNKNOWN, (data) =>
      saveLog(data, MavletEvent.UNKNOWN),
    );
  }
</script>

<style lang="scss">
  #wallet-button {
    background: rgba(80, 227, 194, 0.25);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    justify-content: space-between;

    padding: 10px;
    margin: 10px 0px;

    &:hover {
      color: white;
    }

    @supports not (backdrop-filter: blur(4px)) {
      background: rgba(80, 227, 194, 0.9);
    }
  }

  .wallet-container {
    position: relative;

    .wallet-dialog {
      position: absolute;
      top: 100%;
      left: 40%;
      background-color: rgba(5, 130, 204, 0.9);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: white;
      padding: 20px 30px;
      z-index: 300;
      min-width: 400px;

      .wallet-dialog__title {
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: bold;
      }

      .wallet-menu__info {
        & > div {
          margin: 10px 0px;
        }
      }

      .wallet-menu__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: solid 2px white;
      }
    }
  }
</style>

<svelte:window
  on:click={() => {
    if (showDialog === true) {
      showDialog = false;
    }
  }}
/>

{#if $store.userAddress}
  <div class="wallet-container">
    <button
      class="wallet"
      id="wallet-button"
      on:click={() => {
        // this is required to delay the window click that closes the popup
        setTimeout(() => (showDialog = !showDialog), 100);
      }}
    >
      <span>
        <span class="material-icons-outlined"> person_outline </span>
        {shortenHash($store.userAddress)}
      </span>
      <span>
        {#if $store.userBalance}
          {formatTokenAmount($store.userBalance / 10 ** 6)} ṁ
        {:else}
          0 ṁ
        {/if}
      </span>
    </button>
    {#if showDialog}
      <div class="wallet-dialog" transition:fly={{ duration: 500, x: -500 }}>
        <div class="wallet-dialog__title">My wallet</div>
        <div class="wallet-menu__info">
          <div>Address: {shortenHash($store.userAddress)}</div>
          <div>
            {#if $store.userBalance}
              Balance: {formatTokenAmount($store.userBalance / 10 ** 6)} ṁ
            {/if}
          </div>
          <div>
            Connected to: {$store.networkType}
          </div>
          <div>
            Matrix node: {$store.matrixNode}
          </div>
          <div>
            Wallet: {connectedWallet}
          </div>
        </div>
        <div class="wallet-menu__actions">
          <button class="transparent full" on:click={disconnectWallet}>
            <span class="material-icons-outlined"> account_balance_wallet </span>
            &nbsp; Disconnect
          </button>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <button id="wallet-button" on:click={connectWallet}>
    <span class="material-icons-outlined"> person_off </span>
    No wallet connected
  </button>
{/if}
