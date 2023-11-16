#!/bin/bash
set -ex
# cd ./packages/sc-deployer
# npm publish --access public
# npm publish "@massalabs/massa-proto-cli"
# npm publish "@massalabs/massa-sc-deployer" 

npm dist-tag add "@massalabs/massa-web3@2.2.6" buildnet
# npm dist-tag add "@massalabs/massa-web3@2.2.2" latest
# npm dist-tag add "@massalabs/massa-sc-deployer@1.1.1" latest

# npm dist-tag rm "@massalabs/sc-project-initializer@0.5.0" testnet
# npm dist-tag rm "@massalabs/massa-sc-deployer@0.4.0" testnet

