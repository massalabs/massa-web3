#!/bin/bash

color="red"

if [ "$COVERAGE" -ge 80 ]; then
    color="green"
elif [ "$COVERAGE" -ge 70 ]; then
    color="orange"
fi

filename="README.md"

coverageLine=$(sed -n '3p' $filename)

regex="coverage-([0-9]+)%"

if [[ $coverageLine =~ $regex ]]; then
    oldCoverage="${BASH_REMATCH[1]}"
    echo "Coverage is $COVERAGE%"
else
    echo "No coverage found"
fi

if [ "$oldCoverage" != "$COVERAGE" ] || [ -z "$oldCoverage" ]; then
    echo "Updating badge"
    newLine="![check-code-coverage](https://img.shields.io/badge/coverage-$COVERAGE%25-$color)"
    sed -i "3s#.*#${newLine}#" $filename
fi