/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'favicon.ico', 'apple-touch-icon.png', 'privacy.html', 'og-image.png'],
      workbox: { navigateFallbackDenylist: [/privacy\.html$/] },
      manifest: {
        id: 'brew-journal',
        name: 'Brew Journal',
        short_name: 'Brews',
        description: 'A private, offline coffee journal. Log a brew in 20 seconds and get a plain-English dial-in hint.',
        lang: 'en-GB',
        dir: 'ltr',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#2A1810',
        background_color: '#F5EBDA',
        categories: ['food', 'lifestyle', 'productivity'],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
        shortcuts: [
          { name: 'New brew', short_name: 'Brew', url: './#/brew/new', icons: [{ src: 'icon-192.png', sizes: '192x192' }] },
          { name: 'Bean shelf', short_name: 'Beans', url: './#/beans', icons: [{ src: 'icon-192.png', sizes: '192x192' }] },
        ],
        screenshots: [
          { src: 'screenshots/narrow-home.png', sizes: '780x1688', type: 'image/png', form_factor: 'narrow', label: 'Today: your last brew and open beans' },
          { src: 'screenshots/narrow-hint.png', sizes: '780x1688', type: 'image/png', form_factor: 'narrow', label: 'A plain-English dial-in hint after each brew' },
          { src: 'screenshots/narrow-bean.png', sizes: '780x1688', type: 'image/png', form_factor: 'narrow', label: 'Taste over time for each bean' },
          { src: 'screenshots/wide-bean.png', sizes: '1440x900', type: 'image/png', form_factor: 'wide', label: 'Bean detail on desktop' },
        ],
      },
    }),
  ],
  test: { environment: 'jsdom' },
})
