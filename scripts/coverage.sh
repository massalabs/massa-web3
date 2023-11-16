#!/bin/bash

echo "Running coverage script..."
echo "Coverage: $COVERAGE"
echo "Project: $PROJECT"

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

declare -A project_map
project_map=( ["massa-web3"]=9 ["web3-utils"]=18 ) 

line_number=${project_map[$PROJECT]}

# If no line number found, exit the script
if [ -z "$line_number" ]; then
    echo "Project '$PROJECT' not found in the map."
    exit 1
fi

echo "Line number: $line_number"
# Extract the current coverage badge from the specified line
coverageLine=$(sed -n "${line_number}p" $filename)

# Regex to match the coverage percentage
regex="!\[check-code-coverage\]\(https://img.shields.io/badge/coverage-([0-9]+([.][0-9]+)?)%25-[^)]+\)"

echo "Coverage line: $coverageLine"


if [[ $coverageLine =~ $regex ]]; then
    oldCoverage="${BASH_REMATCH[1]}"
    echo "Coverage for $PROJECT is $oldCoverage%"
else
    echo "No coverage found for $PROJECT."
    exit 1
fi

# Determine the color for the badge based on the coverage
color=$(determine_color $COVERAGE)

# Update the coverage badge if the difference in coverage is greater than or equal to 1%
if (( $(echo "$COVERAGE != $oldCoverage" | bc -l) )); then
    echo "Updating badge for $PROJECT."
    newLine="![check-code-coverage](https://img.shields.io/badge/coverage-$COVERAGE%25-$color)"
    sed -i "${line_number}s#.*#${newLine}#" $filename
    echo "Updated badge for $PROJECT."
    coverageLine=$(sed -n "${line_number}p" $filename)
    
    echo "Coverage line: $coverageLine"
else
    echo "Coverage for $PROJECT has not changed. Skipping update."
fi