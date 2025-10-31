<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

# Webmavryk Test dApp

![Built with Webmavryk][logo]

A minimal end-to-end testing setup for developing Mavryk DApps with Webmavryk and Beacon to manage signing and wallet operations.
## Getting Started
#### Initial setup
1. Clone the Webmavryk repository: `git clone git@github.com:mavryk-network/webmavryk.git`
1. Change your current working directory to the newly cloned one: `cd webmavryk`
1. Install dependencies: `npm clean-install`
1. Build Webmavryk: `npm run build`
1. Change your current working directory to the test dapp: `cd apps/webmavryk-test-dapp`
1. Start the development or production server as shown below

#### Start development server
1. `npm run dev`
1. Open `http://localhost:3030` in your browser to preview application.

#### Start production server
1. `npm run build && npm run preview`
1. Open `http://localhost:4173` in your browser to preview application.
