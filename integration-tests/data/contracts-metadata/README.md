<!-- SPDX-License-Identifier: Apache-2.0
     This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
     Original project: Taquito by ECAD Labs Inc. -->

Some Webmavryk integration tests depend on contracts metadata hosted externally in a GCP Cloud Storage bucket https://storage.googleapis.com/tzip-16/{contract_metadata_name}.json

This folder contains the required metadata files in case access to the bucket is lost and these files need to be re-uploaded.
