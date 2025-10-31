/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  title: 'Webmavryk',
  tagline: 'A TypeScript library suite for development on the Mavryk blockchain.',
  favicon: 'img/favicon.svg',
  url: 'https://webmavryk.mavryk.org',
  baseUrl: '/',
  projectName: 'webmavryk',
  organizationName: 'ecadlabs',
  markdown: {
    mermaid: true,
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js',
      async: true,
    }
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Baloo+Tammudu|Open+Sans:400,600,800&display=swap',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css',
  ],
  customFields: {
    repoUrl: 'https://github.com/mavryk-network/webmavryk',
    description:
      'A TypeScript library suite made available as a set of npm packages aiming to make building on top of Mavryk easier and more enjoyable.',
  },
  themes: [require.resolve('@docusaurus/theme-live-codeblock'), '@docusaurus/theme-mermaid'],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      // The following value has been deprecated and will need to be re-implemented when dark mode is implemented
      // switchConfig: {
      // 	darkIcon: '🌙',
      // 	darkIconStyle: {
      // 		marginLeft: '2px',
      // 	},
      // 	// Unicode icons such as '\u2600' will work
      // 	// Unicode with 5 chars require brackets: '\u{1F602}'
      // 	lightIcon: '\u{1F602}',
      // 	lightIconStyle: {
      // 		marginLeft: '1px',
      // 	},
      // },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'Webmavryk Logo',
        src: 'img/webmavryk_header.svg',
      },
      items: [
        {
          type: 'search',
          position: 'right'
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          className: 'header-link',
        },
        { to: 'docs/version', label: 'Release Notes', position: 'right', className: 'header-link' },
        {
          type: 'doc',
          docId: 'quick_start',
          label: ' Get Started',
          position: 'right',
          className: 'header-link button_link',
        },
        {
          href: 'https://discord.gg/BDBYA4ASf2',
          position: 'right',
          className: 'header-link header-discord-link',
          'aria-label': 'Discord',
        },
        {
          href: 'https://x.com/mavrykdynamics',
          position: 'right',
          className: 'header-link header-twitter-link',
          'aria-label': 'X',
        },
        {
          href: 'https://github.com/mavryk-network/webmavryk',
          position: 'right',
          className: 'header-link header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Contact',
          items: [
            {
              label: 'Report Issues',
              to: 'https://github.com/mavryk-network/webmavryk/issues/new/choose',
            },
            {
              label: 'Contribute',
              to: 'https://github.com/mavryk-network/webmavryk/blob/master/CONTRIBUTING.md',
            },
          ],
        },

        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Exchange',
            //   to: 'https://tezos.stackexchange.com/questions/tagged/webmavryk',
            // },
            {
              label: 'Discord',
              to: 'https://discord.gg/JgvVdWV7BN',
            },
            {
              label: 'X',
              to: 'https://x.com/mavrykdynamics',
            },
            {
              label: 'Code of Conduct',
              to: 'https://github.com/mavryk-network/webmavryk/blob/master/code-of-conduct.md',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/mavryk-network/webmavryk',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/quick_start',
            },
            {
              label: 'TypeDoc Reference',
              to: 'https://webmavryk.mavryk.org/typedoc',
            },
          ],
        },
        {
          items: [
            {
              html: `image`,
            },
            {
              html: `
									<p class='footerDescription'>
									Developing On Mavryk Can Be Delicious!
									</p>
								  `,
            },
            {
              html: `
									<a class='footerButton' href='https://github.com/mavryk-network/webmavryk'>
										GITHUB
									</a>
								  `,
            },
            {
              html: `form`,
            },
          ],
        },
      ],
    },
    algolia: {
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      indexName: 'webmavryk',
      appId: process.env.ALGOLIA_APPLICATION_ID,
      contextualSearch: false,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('./src/css/tables.scss'),
            require.resolve('./src/css/admonitions.scss'),
            require.resolve('./src/css/codeBlock.scss'),
            require.resolve('./src/css/tabs.scss'),
          ],
        },
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // includeCurrentVersion: true,
        },
        gtag: {
          trackingID: 'UA-148358030-1',
        },
      },
    ],
  ],
  plugins:
    [
      require.resolve('./plugins/webpack5plugin/index.js'),
      'docusaurus-plugin-sass',
      [
        'docusaurus-plugin-dotenv',
        {
          path: "./.env",
          systemvars: true
        }
      ]
    ],

};
