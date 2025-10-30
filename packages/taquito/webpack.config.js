/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');
var { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
var WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  mode: 'production',
  entry: "./dist/lib/taquito.js",
  output: {
    library: 'taquito',
    libraryTarget: 'umd',
    path: __dirname,
    filename: pkg.unpkg,
    crossOriginLoading: 'anonymous'
  },
  resolve: {
    fallback: {
      fs: false,
      stream: require.resolve("stream-browserify")
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new SubresourceIntegrityPlugin({
      hashFuncNames: ['sha384'],
      enabled: true
    }),
    new WebpackAssetsManifest({ integrity: true })
  ]
}
