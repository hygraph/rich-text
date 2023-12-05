import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.build.json',
  splitting: true,
  minify: !options.watch,
  sourcemap: true,
  dts: true,
  treeshake: true,
  clean: true,
  format: ['esm', 'cjs'],
}));
