#!/bin/bash

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

# Indexed arrays for projects and their corresponding line numbers
projects=("massa-web3" "web3-utils")
lines=(9 18)

# Get line number for the given project
get_line_number() {
    local project=$1
    local i=0
    for p in "${projects[@]}"; do
        if [ "$p" == "$project" ]; then
            echo "${lines[$i]}"
            return
        fi
        ((i++))
    done
    echo ""
}

line_number=$(get_line_number $PROJECT)

# If no line number found, exit the script
if [ -z "$line_number" ]; then
    echo "Project '$PROJECT' not found in the map."
    exit 1
fi

# If no line number found, exit the script
if [ -z "$line_number" ]; then
    echo "Project '$PROJECT' not found in the map."
    exit 1
fi

# Extract the current coverage badge from the specified line
coverageLine=$(sed -n "${line_number}p" $filename)

# Regex to match the coverage percentage
regex="${PROJECT}:\s*([0-9]+([.][0-9]+)?)%"

if [[ $coverageLine =~ $regex ]]; then
    oldCoverage="${BASH_REMATCH[1]}"
    echo "Coverage for $PROJECT is $COVERAGE%"
else
    echo "No coverage found for $PROJECT."
fi

# Determine the color for the badge based on the coverage
color=$(determine_color $COVERAGE)

# Update the coverage badge if the difference in coverage is greater than or equal to 1%
if [ -z "$oldCoverage" ] || (( $(echo "$COVERAGE - $oldCoverage >= 1" | bc -l) )) || (( $(echo "$oldCoverage - $COVERAGE >= 1" | bc -l) )); then
    echo "Updating badge for $PROJECT."
    newLine="![check-code-coverage](https://img.shields.io/badge/coverage-$COVERAGE%25-$color)"
    sed -i "${line_number}s#.*#${newLine}#" $filename

fi