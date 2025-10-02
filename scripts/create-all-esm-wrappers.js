#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Create ESM wrapper files for all protobuf files
 * This script generates ESM wrappers that import from CommonJS modules
 * and export both the proto namespace and individual classes
 */
function createAllESMWrappers() {
    const esmDir = path.join(__dirname, '..', 'src', 'generated', 'grpc', 'esm');
    
    console.log('Creating ESM wrapper files for all protobuf files...');
    createWrappersForDirectory(esmDir);
    console.log('ESM wrapper creation completed!');
}

function createWrappersForDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.warn(`Directory does not exist: ${dir}`);
        return;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const itemPath = path.join(dir, item);
        
        if (fs.statSync(itemPath).isDirectory()) {
            createWrappersForDirectory(itemPath);
        } else if (item.endsWith('.js')) {
            createWrapperForFile(itemPath);
        }
    }
}

function createWrapperForFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File does not exist: ${filePath}`);
        return;
    }
    
    // Calculate the relative path to the CommonJS version
    const relativePath = calculateRelativePath(filePath);
    
    // Determine the namespace structure based on the file path
    const namespace = determineNamespace(filePath);
    
    // Get the classes to export directly (based on common usage patterns)
    const directExports = getDirectExports(filePath);
    
    const wrapperContent = `// ESM wrapper for protobuf classes
// Import the CommonJS module using a relative path that works in both environments
import * as commonjsModule from '${relativePath}';

// Create a proto object that matches the expected structure
export const proto = ${namespace};

// Also export the classes directly for compatibility with existing imports
${directExports}
`;
    
    fs.writeFileSync(filePath, wrapperContent);
    
    // Create TypeScript declaration file
    createTypeScriptDeclaration(filePath, directExports);
}

function calculateRelativePath(filePath) {
    // Calculate the correct relative path from ESM to CommonJS
    const esmPath = filePath.replace('src/generated/grpc/esm/', 'dist/esm/generated/grpc/');
    const cmdPath = filePath.replace('src/generated/grpc/esm/', 'dist/cmd/generated/grpc/');
    
    // Count directory levels to determine number of ../
    const esmParts = esmPath.split('/');
    const cmdParts = cmdPath.split('/');
    
    // Find common prefix
    let commonLength = 0;
    for (let i = 0; i < Math.min(esmParts.length, cmdParts.length); i++) {
        if (esmParts[i] === cmdParts[i]) {
            commonLength = i + 1;
        } else {
            break;
        }
    }
    
    // Calculate relative path
    const upDirs = '../'.repeat(esmParts.length - commonLength);
    return upDirs + cmdParts.slice(commonLength).join('/');
}

function determineNamespace(filePath) {
    if (filePath.includes('google/protobuf/')) {
        return `{
  google: {
    protobuf: {
      wrappers: commonjsModule.default
    }
  }
}`;
    } else if (filePath.includes('massa/api/v1/') || filePath.includes('public_pb.js')) {
        return `{
  massa: {
    api: {
      v1: commonjsModule.default
    }
  }
}`;
    } else {
        return `{
  massa: {
    model: {
      v1: commonjsModule.default
    }
  }
}`;
    }
}

function getDirectExports(filePath) {
    // Define common exports based on file patterns
    const commonExports = {
        'public_pb.js': [
            'AsyncPoolChangesFilter', 'ExecutedDenounciationFilter', 'ExecutedOpsChangesFilter',
            'ExecutionEventFilter', 'LedgerChangesFilter', 'NewSlotExecutionOutputsFilter',
            'NewBlocksFilter', 'NewEndorsementsFilter', 'NewFilledBlocksFilter',
            'NewOperationsFilter', 'NewSlotABICallStacksFilter', 'NewSlotTransfersFilter',
            'NewStakersFilter', 'NewTransactionsThroughputFilter', 'NewBlocksServerRequest',
            'NewEndorsementsServerRequest', 'NewFilledBlocksServerRequest',
            'NewOperationsServerRequest', 'NewSlotExecutionOutputsServerRequest',
            'AddressBalanceCandidate', 'AddressBalanceFinal', 'AddressDatastoreKeysCandidate',
            'AddressDatastoreKeysFinal', 'ExecuteReadOnlyCallRequest', 'ExecutionQueryExecutionStatus',
            'ExecutionQueryRequestItem', 'GetBlocksRequest', 'GetDatastoreEntriesRequest',
            'GetDatastoreEntryFilter', 'GetEndorsementsRequest', 'GetNextBlockBestParentsRequest',
            'GetOperationABICallStacksRequest', 'GetOperationsRequest', 'GetScExecutionEventsRequest',
            'GetSelectorDrawsRequest', 'GetSlotABICallStacksRequest', 'GetSlotTransfersRequest',
            'GetStakersRequest', 'GetStatusRequest', 'GetTransactionsThroughputRequest',
            'OpExecutionStatusCandidate', 'QueryStateRequest', 'ScExecutionEventsFilter',
            'SearchBlocksFilter', 'SearchBlocksRequest', 'SearchEndorsementsFilter',
            'SearchEndorsementsRequest', 'SearchOperationsFilter', 'SearchOperationsRequest',
            'SelectorDrawsFilter', 'StakersFilter'
        ],
        'commons_pb.js': ['Empty'],
        'operation_pb.js': ['OperationIds', 'OpTypes'],
        'slot_pb.js': ['Slot', 'SlotRange'],
        'endorsement_pb.js': ['EndorsementIds'],
        'address_pb.js': ['Addresses'],
        'block_pb.js': ['BlockIds'],
        'datastore_pb.js': ['AddressKeyEntry'],
        'execution_pb.js': ['FunctionCall', 'ReadOnlyExecutionCall', 'ScExecutionEventStatus'],
        'amount_pb.js': ['NativeAmount'],
        'wrappers_pb.js': ['StringValue']
    };
    
    const fileName = path.basename(filePath);
    const exports = commonExports[fileName] || [];
    
    if (exports.length === 0) {
        return '// Add commonly used classes here as needed';
    }
    
    return exports.map(exp => `export const ${exp} = commonjsModule.default.${exp};`).join('\n');
}

function createTypeScriptDeclaration(filePath, directExports) {
    const tsFilePath = filePath.replace('.js', '.d.ts');
    const tsContent = `// ESM wrapper for protobuf classes
export declare const proto: any;
${directExports.includes('export const') ? directExports.replace(/export const (\w+) = .+;/g, 'export declare const $1: any;') : ''}
`;
    
    fs.writeFileSync(tsFilePath, tsContent);
}

// Run the wrapper creation
createAllESMWrappers();