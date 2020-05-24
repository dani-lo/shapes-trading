/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@styled': path.resolve(__dirname, 'src/styled'),
      '@widget': path.resolve(__dirname, 'src/components/widget'),
      '@stlib': path.resolve(__dirname, 'src/st-lib'),
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
