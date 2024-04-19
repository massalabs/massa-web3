#!/bin/bash
set -e

npm ci
npm run build

TAG=next

npm version --workspaces --preid $TAG --no-git-tag-version --no-commit-hooks premajor
#Use timestamp as package suffix
TIME=$(date -u +%Y%m%d%H%M%S)
sed -i "/version/s/$TAG.0/$TAG.$TIME/g" packages/*/package.json

npm publish --ws --access public --tag $TAG
