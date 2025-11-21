#!/bin/bash
# SPDX-License-Identifier: Apache-2.0
# This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
# Original project: Taquito by ECAD Labs Inc.


# Generate Mavbox bootstrap accounts
mavbox_docker_image="${1}"

# Set environment variables
export RUN_"${testnet_uppercase}"_WITH_SECRET_KEY=true
export SECRET_KEY="${secret_key}"
export MAVRYK_RPC_"${testnet_uppercase}"="http://localhost:20000"
export POLLING_INTERVAL_MILLISECONDS=100
export RPC_CACHE_MILLISECONDS=0
export MAVRYK_BAKER=mv1Hox9jGJg3uSmsv9NTvuK7rMHh25cq44nv

alice=$(docker run --rm "${mavbox_docker_image}" mavbox key alice)
bob=$(docker run --rm "${mavbox_docker_image}" mavbox key bob)
charlie=$(docker run --rm "${mavbox_docker_image}" mavbox key charlie)
dave=$(docker run --rm "${mavbox_docker_image}" mavbox key dave)

export "alice=${alice}"
export "bob=${bob}"
export "charlie=${charlie}"
export "dave=${dave}"

# Provision Mavbox container
protocol="${2}"
testnet="${3}"
testnet_uppercase="${4}"
secret_key="edsk3S8mG2sSBmSRbikAcZVLCz4SrCq4DjmsQRic6MGktqNFijfrS2"

docker run \
  --rm \
  --name baking-sandbox \
  --detach \
  -p 20000:20000 \
  "${mavbox_docker_image}" \
  mavbox mini-net \
  --root /tmp/mini-box --size 1 \
  --set-history-mode N000:archive \
  --number-of-b 1 \
  --balance-of-bootstrap-accounts mav:100_000_000 \
  --time-b 1 \
  --add-bootstrap-account="${alice}@2_000_000_000_000" \
  --add-bootstrap-account="${bob}@2_000_000_000_000" \
  --add-bootstrap-account="${charlie}@2_000_000_000_000" \
  --add-bootstrap-account="${dave}@2_000_000_000_000" \
  --no-daemons-for=dave \
  --until-level 200_000_000 \
  --protocol-kind "${protocol}"