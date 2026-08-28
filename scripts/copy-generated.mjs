// The protobuf-generated `*_pb.js` runtime files ship with hand-generated
// `*_pb.d.ts` siblings. They are kept out of the TypeScript program (see the
// `include` in tsconfig.json): with `allowJs`, tsc would compile each `.js` and
// emit an empty `export {}` declaration on top of the real one, stripping every
// gRPC type from the published package. Copy both verbatim into each build.

import { cp } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src', 'generated', 'grpc')

for (const target of ['esm', 'cmd']) {
  await cp(src, join(root, 'dist', target, 'generated', 'grpc'), {
    recursive: true,
    // PublicServiceClientPb.ts is real source and is compiled by tsc.
    filter: (path) => !path.endsWith('.ts') || path.endsWith('.d.ts'),
  })
}
