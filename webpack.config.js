const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const filename = (ext) =>
      isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

  const plugins = () => {
    const base = [
      new FaviconsWebpackPlugin('./favicon.png'),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }

    return base;
  };

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    devServer: {
      hot: true,
      open: true,
    },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: plugins(),
    entry: {
      main: './index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
