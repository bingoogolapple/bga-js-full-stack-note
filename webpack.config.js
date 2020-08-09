const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

console.log('NODE_ENV', process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool:
    process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  target: 'electron-main',
  entry: './src-ele/main.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'electron.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'src-ele/tsconfig.json')
      })
    ]
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ }]
  },
  node: {
    __dirname: false
  }
}
