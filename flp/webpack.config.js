const path = require('path');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const babelSettings = JSON.parse(readFileSync('.babelrc'));

module.exports = {
  entry: {
    appruntime: './src/index.js'
  },

  output: {
    filename: 'appruntime.js',
    libraryExport: 'default',
    library: 'AppRuntime',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelSettings
        }
      }
    ]
  }/*,

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'luigi-client.d.ts',
        to: '.'
      },{
        from: 'src/luigi-element.js',
        to: '.'
      }
    ])
  ]*/
};
