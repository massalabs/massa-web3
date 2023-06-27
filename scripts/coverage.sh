#!/bin/bash

color="red"

if [ "$(echo "$COVERAGE >= 80" | bc -l)" -eq 1 ]; then
    color="green"
elif [ "$(echo "$COVERAGE >= 70" | bc -l)" -eq 1 ]; then
    color="orange"
fi

filename="README.md"

coverageLine=$(sed -n '3p' $filename)

regex="coverage-([0-9]+([.][0-9]+)?)%"

if [[ $coverageLine =~ $regex ]]; then
    oldCoverage="${BASH_REMATCH[1]}"
    echo "Coverage is $COVERAGE%"
else
    echo "No coverage found"
fi

if [ -z "$oldCoverage" ] || [ "$(echo "$COVERAGE - $oldCoverage >= 1" | bc -l)" -eq 1 ] || [ "$(echo "$oldCoverage - $COVERAGE >= 1" | bc -l)" -eq 1 ]; then
    echo "Updating badge"
    newLine="![check-code-coverage](https://img.shields.io/badge/coverage-$COVERAGE%25-$color)"
    sed -i "3s#.*#${newLine}#" $filename
fi