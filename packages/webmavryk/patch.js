/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
const angularWebpackConfig =
  '../../@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

if (fs.existsSync(angularWebpackConfig)) {
  // Patch Angular webpack config to include necessary core Node modules in a bundle
  fs.readFile(angularWebpackConfig, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

    console.log('Patching angular webpack config');

    fs.writeFile(angularWebpackConfig, result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
}
