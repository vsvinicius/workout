import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      external: ['dayjs/locale/pt-BR'],
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      includeAssets: ['public/favicon.svg'],
      manifest: {
        theme_color: '#8936FF',
        background_color: '#2EC6FE',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'public/icon512_maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'public/icon512_rounded.png',
            type: 'image/png',
          },
        ],
        orientation: 'any',
        display: 'standalone',
        lang: 'pt-BR',
        name: 'workout',
        short_name: 'workout',
        start_url: '/',
      },
    }),
  ],
});
