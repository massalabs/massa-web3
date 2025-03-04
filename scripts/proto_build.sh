#!/bin/bash

echo "Running proto_build script..."

# rm -rf tmp/proto

#Variables
REPO_URL="https://github.com/massalabs/massa-proto" 
TARGET_DIR="proto"  
DESTINATION="tmp" 
BRANCH="improve_datastore_keys_query"  

# mkdir -p "$DESTINATION"
# cd "$DESTINATION" || exit 1 

# git init
# git remote add origin "$REPO_URL"
# git config core.sparseCheckout true

# echo "$TARGET_DIR/" > .git/info/sparse-checkout  

# git pull origin "$BRANCH"

# rm -rf .git

# echo "Target dir : '$TARGET_DIR' downloaded in '$DESTINATION/$TARGET_DIR'."

# if [ ! -d "$TARGET_DIR" ] || [ ! -f "$TARGET_DIR/apis/massa/api/v1/public.proto" ]; then
#   echo "Error: Required files are missing in 'tmp/$TARGET_DIR'."
#   exit 1
# fi


protoc --ts_out=src/generated/grpc \
        --proto_path="$DESTINATION"/proto \
        --proto_path="$DESTINATION"/proto/commons \
        --proto_path="$DESTINATION"/proto/third_party \
         "$DESTINATION"/proto/apis/massa/api/v1/public.proto

proto_dir="tmp/proto/commons"

protoc $(find "${proto_dir}" -name '*.proto') \
        --proto_path="${proto_dir}" \
        --proto_path=tmp/proto/commons \
        --proto_path=tmp/proto/third_party \
        --ts_out=src/generated/grpc

# rm -rf tmp/proto