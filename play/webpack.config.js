const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  plugins: [
    new MonacoWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      runtime: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.ttf$/,
        include: path.resolve(__dirname, '../node_modules/monaco-editor'),
        use: ['file-loader']
      }
    ]
  }
};
