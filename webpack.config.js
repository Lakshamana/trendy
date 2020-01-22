const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64]'
              },
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin],
  devServer: {
    contentBase: join(__dirname, './public'),
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true
  }
}
