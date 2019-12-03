const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  target: 'web',
  entry: {
      app: ['./index.js']
    },
  output: {
      filename: '[name]-[hash:6].bundle.js',
      path: path.join(__dirname, './build/www')
    },
  resolve: {
      mainFields: ['browser', 'module', 'main'],
      extensions: ['.js', '.json', '.jsx']
    },
  module: {
      rules: [
            {
                    test: /\.js(x?)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                  },
            {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                  },
            {
                    test: /\.(png|jpg|gif)$/,
                    use: 'file-loader?name=img/[name]-[hash:6].[ext]'
                  }
          ]
    },
  plugins: [
      new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
          }),
      new MiniCssExtractPlugin({
            filename: '[name]-[hash:6].css',
            chunkFilename: '[id].css',
            debug: true
          })
    ]
};

