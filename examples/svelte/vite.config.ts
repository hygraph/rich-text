import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@graphcms/rich-text-types': join(__dirname, '../../packages/types'),
      '@graphcms/rich-text-html-renderer': join(
        __dirname,
        '../../packages/html-renderer'
      ),
    },
  },
  plugins: [svelte()],
});
