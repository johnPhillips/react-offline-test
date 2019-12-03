const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const host = 'localhost';
const port = 8080;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port,
    host,
    contentBase: '/src'
  }
});

