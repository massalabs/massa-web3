#!/bin/bash

echo "Running coverage script..."
echo "Coverage: $COVERAGE"
echo "Project: massa-web3"

# Define the color based on coverage threshold
determine_color() {
    local coverage=$1

    if (( $(echo "$coverage >= 80" | bc -l) )); then
        echo "green"
    elif (( $(echo "$coverage >= 70" | bc -l) )); then
        echo "orange"
    else
        echo "red"
    fi
}

filename="README.md"
line_number=9  # Hardcoding the line number for massa-web3

echo "Line number: $line_number"

# Extract the current coverage badge from the specified line
coverageLine=$(sed -n "${line_number}p" $filename)

# Regex to match the coverage percentage
regex="!\[check-code-coverage\]\(https://img.shields.io/badge/coverage-([0-9]+([.][0-9]+)?)%25-[^)]+\)"

echo "Coverage line: $coverageLine"

if [[ $coverageLine =~ $regex ]]; then
    oldCoverage="${BASH_REMATCH[1]}"
    echo "Coverage for massa-web3 is $oldCoverage%"
else
    echo "No coverage found for massa-web3."
    exit 1
fi

# Determine the color for the badge based on the coverage
color=$(determine_color $COVERAGE)

# Update the coverage badge if the difference in coverage is greater than or equal to 1%
if (( $(echo "$COVERAGE != $oldCoverage" | bc -l) )); then
    echo "Updating badge for massa-web3."
    newLine="![check-code-coverage](https://img.shields.io/badge/coverage-$COVERAGE%25-$color)"
    sed -i "${line_number}s#.*#${newLine}#" $filename
    echo "Updated badge for massa-web3."
    coverageLine=$(sed -n "${line_number}p" $filename)
    
    echo "Coverage line: $coverageLine"
else
    echo "Coverage for massa-web3 has not changed. Skipping update."
fi