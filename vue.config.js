module.exports = {
  runtimeCompiler: true,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('balm-ui-plus', 'balm-ui/dist/balm-ui-plus.js')
      .set('balm-ui-css', 'balm-ui/dist/balm-ui.css')

    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        // modify the options...
        return options
      })
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      },
    }
  }
}
