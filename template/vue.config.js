module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  transpileDependencies: ['@vue/reactivity'],
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'button-primary-background-color': '#54abb2',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: 'true; @import "~@/assets/css/vantui.less";'
          }
        }
      }
    }
  },
  pwa: {
    name: 'name',
    themeColor: '#54abb2',
    msTileColor: '#444',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '1.0.0',
    /*
    * 俩个选择:
    * 第一个 GenerateSW ，
    *   此为默认值，
    *   每次build都会自动生成一个service-worker文件，
    *   拥有一些简单的默认配置
    * 第二个 InjectManifest ，
    *   自定义 service-user-worker 文件的位置（通过 workboxOptions 来配置 sw 文件的位置），
    *   自己对 sw 进行配置。
    * */
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js', // 自定义sw文件的位置
      importWorkboxFrom: 'disabled' // 是否要引入线上的service-worker文件，我们只需要自己定义的文件，不需要谷歌提供的sw文件
    }
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}
