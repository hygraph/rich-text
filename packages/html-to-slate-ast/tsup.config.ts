import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/index.ts', 'src/client.ts'],
  tsconfig: 'tsconfig.build.json',
  minify: !options.watch,
  sourcemap: true,
  dts: true,
  treeshake: true,
  clean: true,
  format: ['esm', 'cjs'],
}));
