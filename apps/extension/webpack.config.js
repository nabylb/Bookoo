const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup.ts',
    content: './src/content.ts',
    background: './src/background.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist')
        },
        { 
          from: path.resolve(__dirname, 'manifest.json'),
          to: path.resolve(__dirname, 'dist')
        }
      ],
    }),
  ],
};