import path from 'path'
import fs from 'fs'

const wasmPath = path.join(__dirname, 'deployer.wasm')
const outputDir = path.join(
  __dirname,
  '../src/experimental/generated/deployer-bytecode.ts'
)

const wasmData = fs.readFileSync(wasmPath)

const output = `export const deployer: Uint8Array = new Uint8Array([${[...wasmData]}]);\n`

fs.writeFileSync(outputDir, output)
