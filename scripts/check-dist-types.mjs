// Guards the published type surface against two regressions that are invisible
// to `tsc --noEmit` on the source tree, because both only appear in `dist`:
//
//   1. A `baseUrl`-relative import (e.g. `from 'src/generated'`) type-checks
//      locally but is emitted verbatim into the `.d.ts`, where consumers cannot
//      resolve it.
//   2. With `allowJs`, compiling the protobuf-generated `*_pb.js` files makes
//      tsc emit an empty `export {}` declaration over the hand-generated
//      `*_pb.d.ts` sibling, silently stripping every gRPC type from the package.
//
// Run against a freshly built `dist/`. Exits non-zero with a report on failure.

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { mkdir, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const BUILDS = ['esm', 'cmd']

const failures = []
const fail = (check, detail) => failures.push({ check, detail })

function walk(dir, predicate) {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...walk(full, predicate))
    else if (predicate(full)) found.push(full)
  }
  return found
}

const exists = (p) => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

if (!exists(join(dist, 'esm', 'index.d.ts'))) {
  console.error('dist/ is missing or incomplete — run `npm run build` first.')
  process.exit(1)
}

const declarations = walk(dist, (p) => p.endsWith('.d.ts'))

// Matches `from '…'`, `import '…'`, and inline `import('…')` type references.
const SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)['"]([^'"]+)['"]/g

// Anything a leaked internal specifier could start with: `src` itself, plus
// every top-level directory under it (`client/http`, `generated/grpc`, …).
const internalRoots = new Set([
  'src',
  'dist',
  'test',
  ...readdirSync(join(root, 'src'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name),
])

// --- Check 1: every specifier in a shipped declaration must be resolvable. ---
for (const file of declarations) {
  const source = readFileSync(file, 'utf8')
  for (const [, specifier] of source.matchAll(SPECIFIER)) {
    const where = `${relative(root, file)} -> '${specifier}'`

    if (!specifier.startsWith('.')) {
      if (internalRoots.has(specifier.split('/')[0])) {
        fail('internal path emitted as a bare specifier', where)
      }
      continue
    }

    const target = resolve(dirname(file), specifier)
    const resolved =
      exists(`${target}.d.ts`) ||
      exists(join(target, 'index.d.ts')) ||
      exists(target)
    if (!resolved) fail('unresolved relative path in declaration', where)
  }
}

// --- Check 2: copied protobuf declarations must survive the build intact. ---
const grpcSrc = join(root, 'src', 'generated', 'grpc')
for (const file of walk(grpcSrc, (p) => p.endsWith('.d.ts') || p.endsWith('.js'))) {
  const rel = relative(grpcSrc, file)
  for (const build of BUILDS) {
    const shipped = join(dist, build, 'generated', 'grpc', rel)
    if (!exists(shipped)) {
      fail('generated file missing from build', `dist/${build}/…/${rel}`)
    } else if (!readFileSync(shipped).equals(readFileSync(file))) {
      const size = statSync(shipped).size
      fail(
        'generated file altered by the build',
        `dist/${build}/…/${rel} (${size} bytes vs ${statSync(file).size} in src)`
      )
    }
  }
}

// --- Check 3: a real consumer type-checks under each resolution mode. ---
// `skipLibCheck: false` is the point: it is what surfaces broken paths and
// hollowed-out declarations inside the shipped `.d.ts` files.
const MODES = { node16: 'node16', nodenext: 'nodenext', bundler: 'esnext' }
const tsc = join(root, 'node_modules', '.bin', 'tsc')
const consumer = mkdtempSync(join(tmpdir(), 'massa-web3-dist-check-'))

try {
  await mkdir(join(consumer, 'node_modules', '@massalabs'), { recursive: true })
  await symlink(root, join(consumer, 'node_modules', '@massalabs', 'massa-web3'))
  await writeFile(
    join(consumer, 'package.json'),
    JSON.stringify({ name: 'dist-check', version: '1.0.0', type: 'module' })
  )
  // `import *` pulls the whole public surface into the program, so every
  // reachable declaration gets checked without naming individual exports.
  await writeFile(
    join(consumer, 'index.ts'),
    [
      "import * as web3 from '@massalabs/massa-web3'",
      "import type { PublicServiceClient } from '@massalabs/massa-web3'",
      'type _Client = PublicServiceClient',
      'export const exported = Object.keys(web3).length',
      '',
    ].join('\n')
  )

  for (const [moduleResolution, module] of Object.entries(MODES)) {
    const config = join(consumer, `tsconfig.${moduleResolution}.json`)
    await writeFile(
      config,
      JSON.stringify({
        compilerOptions: {
          target: 'ESNext',
          module,
          moduleResolution,
          noEmit: true,
          skipLibCheck: false,
          types: [],
        },
        files: ['index.ts'],
      })
    )

    try {
      execFileSync(tsc, ['-p', config], { stdio: 'pipe', encoding: 'utf8' })
    } catch (error) {
      const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim()
      // Paths are absolute and go through the symlink; trim to the package.
      const report = output
        .split('\n')
        .map((line) => line.replace(`${root}${sep}`, ''))
        .slice(0, 15)
        .join('\n    ')
      fail(`consumer type-check (moduleResolution: ${moduleResolution})`, `\n    ${report}`)
    }
  }
} finally {
  rmSync(consumer, { recursive: true, force: true })
}

if (failures.length) {
  console.error(`\nPublished types are broken (${failures.length} problem(s)):\n`)
  for (const { check, detail } of failures) console.error(`  [${check}] ${detail}`)
  console.error('')
  process.exit(1)
}

console.log(
  `Published types OK — ${declarations.length} declaration files, ` +
    `consumer type-checks clean under ${Object.keys(MODES).join(', ')}.`
)
