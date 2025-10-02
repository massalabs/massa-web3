#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Copy protobuf files to the appropriate build directories
 */
function copyProtobufFiles() {
    const srcDir = path.join(__dirname, '..', 'src', 'generated', 'grpc');
    const esmSrcDir = path.join(srcDir, 'esm');
    const cmdDistDir = path.join(__dirname, '..', 'dist', 'cmd', 'generated', 'grpc');
    const esmDistDir = path.join(__dirname, '..', 'dist', 'esm', 'generated', 'grpc');

    // Ensure directories exist
    [cmdDistDir, esmDistDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    // Copy CommonJS protobuf files to CMD build
    console.log('Copying CommonJS protobuf files to CMD build...');
    copyDirectory(srcDir, cmdDistDir, (file) => !file.includes('esm'));

    // Copy ESM protobuf files to ESM build
    console.log('Copying ESM protobuf files to ESM build...');
    if (fs.existsSync(esmSrcDir)) {
        copyDirectory(esmSrcDir, esmDistDir);
    } else {
        console.warn('ESM protobuf files not found. Run the proto build script first.');
    }

    console.log('Protobuf files copied successfully!');
}

function copyDirectory(src, dest, filter = () => true) {
    if (!fs.existsSync(src)) {
        console.warn(`Source directory does not exist: ${src}`);
        return;
    }

    const items = fs.readdirSync(src);
    
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (filter(item)) {
            if (fs.statSync(srcPath).isDirectory()) {
                if (!fs.existsSync(destPath)) {
                    fs.mkdirSync(destPath, { recursive: true });
                }
                copyDirectory(srcPath, destPath, filter);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

// Run the script
copyProtobufFiles();
