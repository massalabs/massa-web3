#!/bin/bash
set -ex
# cd ./packages/massa-web3
# npm publish --access public
# npm publish "@massalabs/massa-proto-cli"

npm dist-tag add "@massalabs/massa-web3@2.2.6" buildnet


# npm dist-tag rm "@massalabs/sc-project-initializer@0.5.0" testnet
# npm dist-tag rm "@massalabs/massa-sc-deployer@0.4.0" testnet

