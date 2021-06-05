const {webpackConfigs} = require('./src/base/config/webpackConfig');
const {entries} = require("./entries");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log('ENV: ', process.env.NODE_ENV);

module.exports = {
  entry: Object.keys(entries)
    .reduce((entryAcc, key) => ({...entryAcc, [key]: ['regenerator-runtime/runtime', entries[key]]}), {}),
  optimization: {
    runtimeChunk: 'single', // tells webpack to split all common dep into a single bundle
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: "app.[hash].bundle.js"
        },
      },
    },
  },
  output: {
    filename: '[name].[hash].js', // https://webpack.js.org/guides/caching/#output-filenames
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', 'json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...Object.keys(entries).map((entryKey) => (
      new HtmlWebpackPlugin({
        template: "template.html",
        filename: `${entryKey}.html`,
        chunks: [entryKey]
      })
    )),
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    index: 'index.html',
    host: webpackConfigs.host,
    port: webpackConfigs.port,
    compress: true,
    disableHostCheck: true, 
    hot: true,
    writeToDisk: process.env.NODE_ENV === 'production',
    open: true,
    inline: true,
    progress: true,
  }
}
