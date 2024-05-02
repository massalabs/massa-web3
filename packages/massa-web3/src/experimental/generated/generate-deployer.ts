import path from "path";
import fs from "fs";

const wasmPath = path.join(__dirname, 'deployer.wasm');

const wasmData = fs.readFileSync(wasmPath);

const output = `export const deployer: Uint8Array = new Uint8Array([${[...wasmData]}]);\n`;

fs.writeFileSync(path.join(__dirname, 'deployer-bytecode.ts'), output);