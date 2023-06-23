#!/bin/bash
set -e

npm ci
npm run build

PACKAGE_NAME=$(cat package.json | jq -r '.name')
PUBLISH_VERSION=$(cat package.json | jq -r '.version')
echo "Publishing ${PACKAGE_NAME}@$PUBLISH_VERSION"

ref=$1
TAG=""
if [[ "$ref" == *"buildnet"* ]]; then
  TAG="--tag buildnet"
fi

npm publish --access public $TAG