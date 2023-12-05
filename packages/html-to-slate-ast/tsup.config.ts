import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/index.ts', 'src/client'],
  tsconfig: 'tsconfig.build.json',
  minify: !options.watch,
  splitting: true,
  sourcemap: true,
  dts: true,
  treeshake: true,
  clean: true,
  format: ['esm', 'cjs'],
}));
