#!/bin/bash +x

fileName="powered-by.md"
report=$(license-report)

echo "# Dependencies Report" > $fileName
echo "" >> $fileName
echo "The following is a list of all the dependencies of this project:" >> $fileName

#base64 encoding/decoding used to handle any potential special characters or escape sequences in the JSON data.

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


    echo "## [${name}](${url})" >> $fileName
    echo "" >> $fileName
    echo "**License:** ${licenseType} - ${licensePeriod}" >> $fileName
    echo "" >> $fileName
    echo "**Used version:** ${installedVersion}" >> $fileName
    echo "" >> $fileName
    echo "**Many thanks to:** ${author}" >> $fileName
    echo "" >> $fileName
done
