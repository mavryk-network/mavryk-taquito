/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const readmePath = './README.md';

const manifest = require('./manifest.json')
const package = require('./package.json')

const integrityRegex = /integrity="(.*)"/;
const versionRegex = /@mavrykdynamics\/webmavryk@(.+)\/dist/

if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath).toString('utf8');

  readme = readme.replace(integrityRegex, `integrity="${manifest['main.js'].integrity}"`)
  readme = readme.replace(versionRegex, `@mavrykdynamics/webmavryk@${package.version}/dist`)

  fs.writeFileSync(readmePath, readme);
}
