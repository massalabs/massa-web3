const fs = require('fs');
const path = require('path');

const wasmPath = path.join(__dirname,'deployer.wasm');

const wasmData = fs.readFileSync(wasmPath);

const base64WasmData = wasmData.toString('base64');

const byteArray = Uint8Array.from(Buffer.from(base64WasmData, 'base64'));

const byteString = Array.from(byteArray).join(',');

const output = `export const deployer: Uint8Array = new Uint8Array([${byteString}]);\n`;

fs.writeFileSync(path.join(__dirname, 'deployer-bytecode.ts'), output);

console.log('Wasm bytecode written to deployer-bytecode.ts');