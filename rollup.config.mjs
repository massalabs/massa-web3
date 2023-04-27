import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

function getConfig(opts) {
  if (opts == null) {
    opts = {};
  }

  const file = `./dist/massa${opts.suffix || ''}.js`;
  const exportConditions = ['default', 'module', 'import'];
  const mainFields = ['module', 'main'];
  if (opts.browser) {
    mainFields.unshift('browser');
  }

  return {
    input: './lib.esm/index.js',
    output: {
      file,
      banner:
        "const __$G = (typeof globalThis !== 'undefined' ? globalThis: typeof window !== 'undefined' ? window: typeof global !== 'undefined' ? global: typeof self !== 'undefined' ? self: {});",
      name: opts.name || undefined,
      format: opts.format || 'esm',
      sourcemap: true,
      globals: {
        varint: 'varint',
        axios: 'axios',
      },
    },
    context: '__$G',
    treeshake: true,
    plugins: [
      nodePolyfills({ sourceMap: true, fs: true }),
      nodeResolve({
        exportConditions,
        mainFields,
        modulesOnly: true,
        preferBuiltins: false,
      }),
    ],
    external: ['varint', 'axios'],
  };
}

export default [
  getConfig({ browser: true }),
  getConfig({ browser: true, suffix: '.umd', format: 'umd', name: 'massa' }),
];
