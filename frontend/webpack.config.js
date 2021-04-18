/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, 'src/app.tsx'),
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          use: [
            {
              loader: 'source-map-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.(csv|tsv)$/,
          use: ['csv-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      alias: {
        '@api': path.resolve(__dirname, 'src/data/api'),
        '@styled': path.resolve(__dirname, 'src/styled'),
        '@component': path.resolve(__dirname, 'src/components'),
        '@stlib': path.resolve(__dirname, 'src/st-lib'),
        '@assets': path.resolve(__dirname, 'assets'),
        '@store': path.resolve(__dirname, 'src/data/store'),
        '@alltypes': path.resolve(__dirname, 'src/types'),
        '@settings': path.resolve(__dirname, 'src/settings'),
      },
    },
    devtool: 'eval-source-map',
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(`${env.API_URL}`),
      }),
    ],
  }
}
