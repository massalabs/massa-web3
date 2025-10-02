#!/bin/bash

echo "Running proto_build script with Protobuf-ES..."

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

# Generate CommonJS version with gRPC client
echo "Generating CommonJS protobuf files with gRPC client..."
generate_proto_commonjs() {
    local proto_dir="$1"

    # exclude private api proto files
    protoc $(find "$proto_dir" -name '*.proto' -not -name '*private*') \
        --js_out=import_style=commonjs:src/generated/grpc \
        --proto_path="$DESTINATION/$TARGET_DIR/commons" \
        --proto_path="$DESTINATION/$TARGET_DIR/third_party" \
        --proto_path="$proto_dir" \
        --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/generated/grpc
}

# Generate CommonJS files
generate_proto_commonjs "$DESTINATION/$TARGET_DIR/third_party"
generate_proto_commonjs "$DESTINATION/$TARGET_DIR/commons"
generate_proto_commonjs "$DESTINATION/$TARGET_DIR/apis/massa/api/v1"

echo "Proto build completed successfully."

# Copy protobuf files to build directories
echo "Copying protobuf files to build directories..."

# Ensure build directories exist
mkdir -p dist/cmd/generated/grpc
mkdir -p dist/esm/generated/grpc

# Copy CommonJS protobuf files to CMD build (exclude esm directory)
echo "Copying CommonJS protobuf files to CMD build..."
rsync -av --exclude='esm/' src/generated/grpc/ dist/cmd/generated/grpc/

# Copy CommonJS protobuf files to ESM build (exclude esm directory)
echo "Copying CommonJS protobuf files to ESM build..."
rsync -av --exclude='esm/' src/generated/grpc/ dist/esm/generated/grpc/

echo "Protobuf files copied successfully!"

rm -rf "$DESTINATION/$TARGET_DIR"