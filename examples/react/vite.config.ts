import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@graphcms/rich-text-types': join(__dirname, '../../packages/types'),
      '@graphcms/rich-text-react-renderer': join(
        __dirname,
        '../../packages/react-renderer'
      ),
    },
  },
  plugins: [react()],
});
