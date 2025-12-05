/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    "webmavryk_mavlet_wallet": ['./src/webmavryk-mavlet-wallet.ts']
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules'],
    fallback: {
      fs: false,
      stream: require.resolve("stream-browserify")
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: ['[name]'],
    libraryTarget: "var"
  },
  plugins: [
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ]
};