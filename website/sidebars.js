/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure

  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'quick_start',
        'tutorial',
        'operation_flow',
        'rpc_nodes',
        'web3js_webmavryk',
      ],
    },
    {
      type: 'category',
      label: 'Webmavryk Providers',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'prepare',
        'estimate',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'making_transfers',
        'originate',
        'consensus_key',
        'global_constant',
        'increase_paid_storage',
        'set_delegate',
        'smart_rollups',
        'proposal_and_ballot',
        'failing_noop',
        'staking',
      ]
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'smartcontracts',
        'contract_call_parameters',
        'fa2_parameters',
        'manager_lambda',
        'multisig_doc',
      ],
    },
    {
      type: 'category',
      label: 'Wallets',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'mavletwallet-singleton',
        'wallets',
        'transaction_limits',
      ],
    },
    {
      type: 'category',
      label: 'Michelson',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'maps_bigmaps',
        'michelsonmap',
        'tickets',
      ],
    },
    {
      type: 'category',
      label: 'Views',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'lambda_view',
        'on_chain_views',
      ],
    },
    {
      type: 'category',
      label: 'Contract and Token Metadata',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'tzip12',
        'metadata-tzip16',
      ],
    },
    {
      type: 'category',
      label: 'Signers',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'signing',
        'inmemory_signer',
        'ledger_signer'
      ],
    },
    {
      type: 'category',
      label: 'Packages',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'rpc_package',
        'michelson_encoder',
        'contracts-library',
        'timelock',
        'webmavryk_utils',
        {
          type: 'category',
          label: 'Sapling',
          collapsed: false,
          collapsible: false,
          items: ['sapling', 'sapling_in_memory_spending_key', 'sapling_in_memory_viewing_key'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced Scenarios',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'ophash_before_injecting',
        'drain_account',
        'complex_parameters',
        'confirmation_event_stream',
        'liquidity_baking',
        'storage_annotations',
        'tezos_domains',
      ],
    },
    {
      type: 'category',
      label: 'Modules customization',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: ['forger', 'rpc-cache', 'cancel_http_requests'],
    },
    {
      type: 'category',
      label: 'Running integration tests',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: ['ledger_integration_test', 'rpc_nodes_integration_test'],
    },
    {
      type: 'category',
      label: 'Dapp Development',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'package_bundle',
        'dapp_template',
        'dapp_prelaunch',

      ],
    },
    {
      type: 'category',
      label: 'Webmavryk Public API',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'wallet_API',
        'batch_API',
      ]
    },
    {
      type: 'category',
      label: 'Misc',
      className: 'sidebarHeader',
      collapsed: false,
      collapsible: false,
      items: [
        'tutorial_links',
      ],
    },


    {
      type: 'link',
      label: 'TypeDoc Reference',
      href: 'https://webmavryk.mavryk.org/typedoc',
    },
  ],
};

module.exports = sidebars;
