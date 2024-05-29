import path from 'path'
import fs from 'fs'

console.log('Generating deployer bytecode...')
function populateDeployer(src?: string, dst?: string): void {
  const wasmPath = src ?? path.join(__dirname, 'deployer.wasm')
  const wasmData = fs.readFileSync(wasmPath)

  const output = `export const deployer: Uint8Array = new Uint8Array([${[...wasmData]}]);\n`

  const outputDir =
    dst ?? path.join(__dirname, '../generated/deployer-bytecode.ts')

  fs.writeFileSync(outputDir, output)
}

populateDeployer()
