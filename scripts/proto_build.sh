#!/bin/bash

echo "Running proto_build script..."

#Variables
REPO_URL="https://github.com/massalabs/massa-proto" 
TARGET_DIR="proto"  
DESTINATION="tmp" 
BRANCH="main"  

rm -rf "$DESTINATION/$TARGET_DIR"

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

rm -rf src/generated/grpc
mkdir -p src/generated/grpc

generate_proto() {
    local proto_dir="$1"
    local output_dir="$2"
    local js_import_style="$3"

    # exclude private api proto files
    protoc $(find "$proto_dir" -name '*.proto' -not -name '*private*') \
        --js_out=import_style=$js_import_style:$output_dir \
        --proto_path="$DESTINATION/$TARGET_DIR/commons" \
        --proto_path="$DESTINATION/$TARGET_DIR/third_party" \
        --proto_path="$proto_dir" \
        --grpc-web_out=import_style=typescript,mode=grpcwebtext:$output_dir
}

# Generate CommonJS version (for backward compatibility)
echo "Generating CommonJS protobuf files..."
generate_proto "$DESTINATION/$TARGET_DIR/third_party" "src/generated/grpc" "commonjs"
generate_proto "$DESTINATION/$TARGET_DIR/commons" "src/generated/grpc" "commonjs"
generate_proto "$DESTINATION/$TARGET_DIR/apis/massa/api/v1" "src/generated/grpc" "commonjs"

# Generate ESM version
echo "Generating ESM protobuf files..."
mkdir -p src/generated/grpc/esm
generate_proto "$DESTINATION/$TARGET_DIR/third_party" "src/generated/grpc/esm" "es6"
generate_proto "$DESTINATION/$TARGET_DIR/commons" "src/generated/grpc/esm" "es6"
generate_proto "$DESTINATION/$TARGET_DIR/apis/massa/api/v1" "src/generated/grpc/esm" "es6"

# Note: ESM files will be handled by wrapper files during build

echo "Proto build completed successfully."

rm -rf "$DESTINATION/$TARGET_DIR"