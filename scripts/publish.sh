#!/bin/bash
set -e

npm ci
npm run build

PACKAGE_NAME=$(cat package.json | jq -r '.name')
PUBLISH_VERSION=$(cat package.json | jq -r '.version')
echo publishing ${PACKAGE_NAME}@$PUBLISH_VERSION

BRANCH=${GITHUB_REF##*/}
TAG=""
if [[ "$BRANCH" == "buildnet" ]]; then
  TAG="--tag buildnet"
fi

npm publish --access public $TAG