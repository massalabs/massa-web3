#!/bin/bash +x

# Loop through the packages in your workspace (adjust the path as needed)
for packageDir in packages/*; do
  if [ -d "$packageDir" ]; then
    packageJson="$packageDir/package.json"
    
    if [ -f "$packageJson" ]; then
      fileName="${packageDir}/powered-by.md"  # Define the report file name within each package directory

      echo "# Dependencies Report" > "$fileName"
      echo "" >> "$fileName"
      echo "The following is a list of all the dependencies for this package:" >> "$fileName"

      report=$(cd "$packageDir" && license-report)
      if [ -n "$report" ]; then
        for row in $(echo "${report}" | jq -r '.[] | @base64'); do
          _jq() {
            echo "${row}" | base64 --decode | jq -r ${1}
          }

          name=$(_jq '.name')
          url=$(_jq '.link')
          licenseType=$(_jq '.licenseType')
          licensePeriod=$(_jq '.licensePeriod')
          installedVersion=$(_jq '.installedVersion')
          author=$(_jq '.author')

          if [[ $author == *" <"* ]]; then
            author="[${author%% <*}](${author##*<}"
            author="${author%?}"    # remove the extra ">" at the end
            author="${author})"     # adding ")" at the end
          fi

          echo "## [${name}](${url})" >> "$fileName"
          echo "" >> "$fileName"
          echo "**License:** ${licenseType} - ${licensePeriod}" >> "$fileName"
          echo "" >> "$fileName"
          echo "**Used version:** ${installedVersion}" >> "$fileName"
          echo "" >> "$fileName"
          echo "**Many thanks to:** ${author}" >> "$fileName"
          echo "" >> "$fileName"
        done
      fi
    fi
  fi
done
