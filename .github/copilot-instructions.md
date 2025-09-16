## Copilot Repository Instructions: massa-web3

### Project Overview
- **Purpose**: TypeScript SDK to interact with the Massa blockchain from Node.js and browsers.
- **Capabilities**: Query chain state, call smart contracts, send operations, listen to events, manage accounts/keys.
- **Targets**: Node 18+ and modern browsers. Distributed as ESM and CommonJS builds.
- **License**: MIT.

### Folder Structure
- **`src/`**: Library source code (TypeScript).
  - **`account/`**: Account management utilities.
  - **`basicElements/`**: Core types, args, address, MAS units, serializers, storage, keys, signatures.
  - **`client/`**: JSON-RPC client, HTTP connector, formatting, retry, public API, types.
  - **`contracts-wrappers/`**: High-level wrappers (e.g., tokens, MNS, multicall, deweb indexer).
  - **`crypto/`**: Ed25519, blake3, base58, cross-browser crypto helpers, varint versioning, password sealing.
  - **`deweb/`**: DeWeb helpers (keys, metadata, redirection, serializers).
  - **`errors/`**: Typed error classes.
  - **`events/`**: Events polling utilities.
  - **`generated/`**: Auto-generated client types (do not edit by hand).
  - **`operation/`**: Operation building and signing.
  - **`provider/`**: Network/provider abstractions.
  - **`smartContracts/`**: SC call/build helpers.
  - **`utils/`**: Misc utilities.
- **`dist/esm`**: ESM build output.
- **`dist/cmd`**: CommonJS build output.
- **`test/`**: Jest tests.
  - **`unit/`** and **`integration/`**; some browser-compat tests use Puppeteer.
- **`scripts/`**: Build/generation scripts (OpenRPC typings, deployer generation, proto, publish helpers).
- **`docs/documentation/html/`**: Generated TypeDoc site.

### Build and Distribution
- **Toolchain**: TypeScript 5, Node 18+.
- **Outputs**: ESM (`dist/esm`) and CommonJS (`dist/cmd`). Keep browser compatibility in shared code.
- **Key scripts** (see `package.json`):
  - `npm run build` → clean + ESM + CJS builds.
  - `npm run check-types` → type-check only.
  - `npm run fmt` / `fmt:check` → ESLint + Prettier fixes/checks.
  - `npm run test`, `test:integration`, `test:browser`, `test:all`, `test:cov`.
  - `npm run doc` → generate TypeDoc.
  - `npm run generate` → runs generation tasks (OpenRPC typings, test interfaces, deployer wasm wrapper).

### Libraries and Frameworks
- **Core**: TypeScript, Jest, ts-jest, Typedoc.
- **Runtime deps**: `@noble/ed25519`, `@noble/hashes`, `bs58check`, `eventemitter3`, `grpc-web` + `google-protobuf`, `lodash.isequal`, `secure-random`, `varint`.
- **Dev tooling**: ESLint (`@typescript-eslint`, `eslint-config-google`, `eslint-config-prettier`), Prettier 3, Husky, Puppeteer, ts-interface-builder.
- **Generated types**: From Massa node OpenRPC spec (see `generate:types` script). Do not edit `src/generated/` manually.

### Coding Standards and Conventions
- **TypeScript**: Strict mode, `esModuleInterop` enabled; write explicit types for exported APIs.
- **API surface**: Export public API from `src/index.ts`. Avoid breaking changes; prefer additive changes.
- **Code style**: Use ESLint + Prettier. Run `npm run fmt` before committing.
- **Naming**: Descriptive, full words; functions as verbs, variables as nouns.
- **Control flow**: Prefer early returns; meaningful error handling; do not swallow errors.
- **Browser compatibility**: Avoid Node-only APIs in shared modules; use `crypto/cross-browser.ts` helpers.
- **Generated code**: Do not hand-edit files under `src/generated/`; re-run generation scripts instead.

### Testing
- **Unit tests**: Place in `test/unit`, file pattern `*.spec.ts`.
- **Integration tests**: Place in `test/integration`.
- **Browser tests**: Use `jest-puppeteer` via `npm run test:browser`.
- **Commands**: `npm run test`, `npm run test:integration`, `npm run test:all`, `npm run test:cov`.
- **Coverage**: Unit tests measured; generated and dist files excluded.

### Documentation
- **User docs**: See `README.md` and external docs (`docs.massa.net`).
- **API docs**: Generate with `npm run doc` (output under `docs/documentation/html`).
- **OpenRPC**: Regenerate client types when bumping Massa node RPC version (`npm run generate:types`).

### Contribution Notes (for Copilot assistance)
- Prefer localized changes within relevant `src/*` sub-packages; update tests accordingly.
- If changing RPC shapes or provider logic, also update `src/generated` via scripts and adjust tests.
- When touching cryptography, prefer existing helpers; maintain cross-browser behavior.
- Use typed errors from `src/errors` to signal failure modes.
- Keep examples and docs in sync when modifying public API. Update TypeDoc comments where useful.
