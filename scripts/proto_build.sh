#!/bin/bash

echo "Running proto_build script..."

#Variables
REPO_URL="https://github.com/massalabs/massa-proto" 
TARGET_DIR="proto"  
DESTINATION="tmp" 
BRANCH="main"  

rm -rf tmp/proto

mkdir -p "$DESTINATION"
cd "$DESTINATION" || exit 1 

git init
git remote add origin "$REPO_URL"
git config core.sparseCheckout true

echo "$TARGET_DIR/" > .git/info/sparse-checkout  

git pull origin "$BRANCH"

rm -rf .git

echo "Target dir : '$TARGET_DIR' downloaded in '$DESTINATION/$TARGET_DIR'."

# Wait for files to be present
max_attempts=10
attempt=1
while [ ! -d "$TARGET_DIR" ] || [ ! -f "$TARGET_DIR/apis/massa/api/v1/public.proto" ]; do
    if [ $attempt -ge $max_attempts ]; then
        echo "Error: Required files are still missing in 'tmp/$TARGET_DIR' after $max_attempts attempts."
        exit 1
    fi
    echo "Waiting for files to be available... Attempt $attempt/$max_attempts"
    sleep 1
    attempt=$((attempt + 1))
done

echo "Files are now available, proceeding with protoc commands..."

cd .. || exit 1

protoc --ts_out=src/generated/grpc \
        --ts_opt=optimize_code_size \
        --proto_path="$DESTINATION/$TARGET_DIR" \
        --proto_path="$DESTINATION/$TARGET_DIR/commons" \
        --proto_path="$DESTINATION/$TARGET_DIR/third_party" \
         "$DESTINATION/$TARGET_DIR/apis/massa/api/v1/public.proto"

proto_dir="$DESTINATION/$TARGET_DIR/commons"

protoc $(find "${proto_dir}" -name '*.proto') \
        --ts_opt=optimize_code_size \
        --proto_path="${proto_dir}" \
        --proto_path="$DESTINATION/$TARGET_DIR/commons" \
        --proto_path="$DESTINATION/$TARGET_DIR/third_party" \
        --ts_out=src/generated/grpc

echo "Proto build completed successfully."

rm -rf tmp/proto