// protoc's commonjs output registers every generated message class on the
// process-wide `proto` global (proto.massa.api.v1.*), and generated methods
// look classes up there at call time. Any app that also generates the Massa
// protos (or loads another copy of massa-web3) then shares those globals with
// us: whichever copy loads last replaces the other one's classes, and requests
// fail to serialize as soon as the two copies differ, e.g. with
// "message.getDeferredCallQuote is not a function".
//
// This script patches each generated `*_pb.js` file so its classes are
// registered on a namespace object private to massa-web3 instead. It is run by
// proto_build.sh after protoc. (protoc's commonjs_strict mode is meant to do
// this, but its output is broken in protobuf-javascript 3.21.)

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const grpcDir = join(root, 'src', 'generated', 'grpc')
const namespaceFile = join(grpcDir, 'namespace.js')

await writeFile(
  namespaceFile,
  `// GENERATED CODE -- DO NOT EDIT! (see scripts/private-proto-namespace.mjs)
// Namespace massa-web3's generated message classes are registered on,
// instead of the process-wide \`proto\` global.
module.exports = { proto: {} };
`
)

const globalLookup =
  /^var global =\n(?: {4}.*\n)*? {4}Function\('return this'\)\(\);\n/m

const entries = await readdir(grpcDir, { recursive: true })
for (const entry of entries.filter((entry) => entry.endsWith('_pb.js'))) {
  const file = join(grpcDir, entry)
  const source = await readFile(file, 'utf8')
  if (!globalLookup.test(source)) {
    throw new Error(`${file}: global namespace lookup not found`)
  }
  const namespace = relative(dirname(file), namespaceFile).split(sep).join('/')
  await writeFile(
    file,
    source.replace(
      globalLookup,
      `var global = require('${namespace.startsWith('.') ? namespace : './' + namespace}');\nvar proto = global.proto;\n`
    )
  )
}
