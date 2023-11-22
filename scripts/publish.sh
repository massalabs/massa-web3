#!/bin/bash
set -e

# Check if Node.js and npm are installed
if ! [ -x "$(command -v node)" ] || ! [ -x "$(command -v npm)" ]; then
  echo "Node.js and npm are required to run this script."
  exit 1
fi

npm ci
npm run build

ref=$1
echo "Publishing packages for reference: $ref"
TAG=""

if [[ "$ref" == *"buildnet"* ]]; then
  TAG="--tag buildnet"
fi

for packageDir in packages/*; do
  if [ -d "$packageDir" ]; then
    PACKAGE_NAME=$(cat "$packageDir/package.json" | jq -r '.name')
    PUBLISH_VERSION=$(cat "$packageDir/package.json" | jq -r '.version')

    # Check if the package name is in the reference
    if [[ "$ref" == *"$PACKAGE_NAME"* ]]; then
      # Check if the package version is already published
      if [[ "$ref" == "buildnet" ]]; then
        CURRENT_VERSION=$(npm view "$PACKAGE_NAME@buildnet" version 2>/dev/null || true)
      else
        CURRENT_VERSION=$(npm view "$PACKAGE_NAME" version 2>/dev/null || true)
      fi

      if [ "$CURRENT_VERSION" == "$PUBLISH_VERSION" ]; then
        echo "${PACKAGE_NAME}@${PUBLISH_VERSION} is already published. Skipping."
      else
        echo "Publishing ${PACKAGE_NAME}@${PUBLISH_VERSION}"
        npm publish --workspace="$PACKAGE_NAME" "$TAG"
      fi
    else
      echo "Skipping ${PACKAGE_NAME}"
    fi
  fi
done
