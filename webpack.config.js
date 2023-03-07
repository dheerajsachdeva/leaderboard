const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    static: './dist',
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
  })],
  mode: 'development',
  optimization: { runtimeChunk: 'single' },
};