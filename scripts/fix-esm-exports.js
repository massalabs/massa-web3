#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix ESM exports in CommonJS protobuf files
 * This adds proper ESM exports to make the files work in ESM environments
 */
function fixESMExports() {
    const esmDistDir = path.join(__dirname, '..', 'dist', 'esm', 'generated', 'grpc');
    
    if (!fs.existsSync(esmDistDir)) {
        console.log('ESM dist directory not found, skipping export fixes');
        return;
    }

    console.log('Fixing ESM exports in protobuf files...');
    
    // List of files to process
    const filesToProcess = [
        'public_pb.js',
        'massa/model/v1/commons_pb.js',
        'massa/model/v1/execution_pb.js',
        'massa/model/v1/slot_pb.js',
        'massa/model/v1/operation_pb.js',
        'massa/model/v1/block_pb.js',
        'massa/model/v1/address_pb.js',
        'massa/model/v1/amount_pb.js',
        'massa/model/v1/datastore_pb.js',
        'massa/model/v1/denunciation_pb.js',
        'massa/model/v1/draw_pb.js',
        'massa/model/v1/endorsement_pb.js',
        'massa/model/v1/node_pb.js',
        'massa/model/v1/staker_pb.js',
        'massa/model/v1/stats_pb.js',
        'massa/model/v1/time_pb.js',
        'massa/model/v1/versioning_pb.js',
        'google/api/annotations_pb.js',
        'google/api/http_pb.js',
        'google/protobuf/wrappers_pb.js'
    ];

    filesToProcess.forEach(file => {
        const filePath = path.join(esmDistDir, file);
        if (fs.existsSync(filePath)) {
            fixFileExports(filePath);
        }
    });

    console.log('ESM exports fixed successfully');
}

function fixFileExports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all goog.exportSymbol calls and extract the class names
    const exportSymbols = content.match(/goog\.exportSymbol\('proto\.([^']+)', null, global\);/g);
    if (!exportSymbols) return;
    
    const exports = new Set(); // Use Set to avoid duplicates
    const declarations = new Set(); // For variable declarations
    
    exportSymbols.forEach(symbol => {
        const match = symbol.match(/goog\.exportSymbol\('proto\.([^']+)', null, global\);/);
        if (match) {
            const fullName = match[1];
            const parts = fullName.split('.');
            const className = parts[parts.length - 1];
            
            // Create unique variable name to avoid conflicts
            // For nested classes like FilterCase, use the parent class name as prefix
            let uniqueName = className;
            if (parts.length > 1) {
                const parentClass = parts[parts.length - 2];
                uniqueName = `${parentClass}_${className}`;
            }
            
            // Create variable declaration and export
            const protoPath = 'proto.' + fullName;
            declarations.add(`const ${uniqueName} = ${protoPath};`);
            
            // Only export the main class name, not nested classes to avoid conflicts
            if (parts.length === 1 || !className.includes('Case')) {
                exports.add(`export { ${uniqueName} as ${className} };`);
            }
        }
    });
    
    // Add declarations and exports at the end of the file
    if (exports.size > 0) {
        content += '\n\n// ESM exports\n' + Array.from(declarations).join('\n') + '\n' + Array.from(exports).join('\n') + '\n';
        fs.writeFileSync(filePath, content);
    }
}

// Run the fix
fixESMExports();
