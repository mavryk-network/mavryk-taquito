/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import { defineConfig } from "vite";
import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isBuild = command === "build";
  return defineConfig({
    plugins: [svelte()],
    define: {
    },
    build: {
      target: "es2020",
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    server: {
      port: 3030
    },
    resolve: {
      alias: {
        // dedupe @mavrykdynamics/mavlet-sdk
        // I almost have no idea why it needs `cjs` on dev and `esm` on build, but this is how it works 🤷‍♂️
        "@mavrykdynamics/mavlet-dapp": path.resolve(
          path.resolve(),
          // "./src/walletmavlet.dapp.min.js"
          `../../node_modules/@mavrykdynamics/mavlet-dapp/dist/${isBuild ? "esm" : "cjs"
          }/index.js`
          // `../../node_modules/@mavrykdynamics/mavlet-dapp/dist/walletmavlet.dapp.min.js`
        ),
        "@mavrykdynamics/mavlet-sdk": path.resolve(
          path.resolve(),
          `../../node_modules/@mavrykdynamics/mavlet-sdk/dist/${isBuild ? "esm" : "cjs"
          }/index.js`
        ),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        "stream": "vite-compatible-readable-stream"
      },
      preserveSymlinks: true
    }
  });
};
