import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore'
// https://vitejs.dev/config/
export default defineConfig({
  // base: '/mangosteen-fe/dist/',
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    svgstore()
  ],
  server: {
    // host: '0.0.0.0',
    proxy: {
      '/api/v1': {
        target: 'http://192.168.1.103:3000'
        // target: 'http://localhost:3000'
        // changeOrigin: true,
        // secure: false
        // rewrite: (path) => path.replace(/^\/api\/v1/, '')
      }
    }
  }
})
