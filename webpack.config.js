const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { join } = require('path')

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
})

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: join(__dirname, './public'),
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true
  }
}
