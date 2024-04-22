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
    react({ tsDecorators: true }),
    VitePWA({
      includeAssets: ['/favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#027ffe',
        background_color: '#1C1C1E',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: '/icon512_maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: '/icon512_rounded.png',
            type: 'image/png',
          },
        ],
        orientation: 'portrait',
        display: 'standalone',
        lang: 'pt-BR',
        name: 'workout',
        short_name: 'workout',
        start_url: '/',
      },
    }),
  ],
});
