import vue from '@vitejs/plugin-vue'
import pugPlugin from "vite-plugin-pug"

const options = { pretty: true }
const locals = { name: "Pug" }

export default {
  plugins: [
    vue(),
    pugPlugin(options, locals),
  ],

  server: {
    port: 8080,

    proxy: {
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    }
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css',
    }
  },

  defineConfig: {
    plugins: [
      vue(),
      pugPlugin(options, locals),
    ],
    resolve: {
      alias: {
        "@": `${__dirname}/src`,
        vue: 'vue/dist/vue.esm-bundler.js',
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js',
        'balm-ui-css': 'balm-ui/dist/balm-ui.css',
      }
    },

    server: {
    }
  },
}
