"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
console.log('Generating deployer bytecode...');
function populateDeployer(src, dst) {
    const wasmPath = src ?? path_1.default.join(__dirname, 'deployer.wasm');
    const wasmData = fs_1.default.readFileSync(wasmPath);
    const output = `export const DEPLOYER_BYTECODE: Uint8Array = new Uint8Array([${[...wasmData]}]);\n`;
    const outputDir = dst ?? path_1.default.join(__dirname, '../generated/deployer-bytecode.ts');
    fs_1.default.writeFileSync(outputDir, output);
}
populateDeployer();
//# sourceMappingURL=generate-deployer.js.map