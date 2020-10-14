const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const configEnv = process.env.CONFIG_ENV;

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        // target: 'https://confucius.jingshuxueyuan.com/',//正式环境
        // target: 'http://47.104.145.133:9100', //测试环境
        target: 'http://192.168.31.73:9100', //后端环境
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        feConfig: path.resolve('.', './src/feConfig/' + (configEnv || 'development')),
        Enums:path.resolve('.', './src/contants/enums')
      })
    ]
  }
};