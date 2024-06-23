import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/**/*.ts'],
    splitting: true,
    target: 'esnext',
    format: 'esm',
    dts: true,
    shims: true,
    treeshake: true,
    bundle: false,
  },
]);
