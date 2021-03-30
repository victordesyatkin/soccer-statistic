/* eslint-disable import/no-extraneous-dependencies */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = (env: unknown, args: { mode?: string } = {}) => {
  const { mode } = args;

  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  console.log('isProduction : ', isProduction);
  console.log('isDevelopment : ', isDevelopment);
  console.log('mode : ', mode);

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        meta: {
          viewport: 'initial-scale=1.0, width=device-width',
          'msapplication-TileColor': '#da532c',
        },
        files: {
          manifest: 'assets/favicon/site.webmanifest',
        },
      }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/favicon',
            to: 'assets/favicon',
          },
        ],
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].css?version=[contenthash]',
          chunkFilename: '[id].css?version=[contenthash]',
        }),
      isProduction &&
        new ForkTsCheckerWebpackPlugin({
          async: false,
        }),
      isProduction &&
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
      // isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean);
    return plugins.filter(Boolean);
  };

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    entry: {
      main: './src/index.tsx',
    },
    output: {
      filename: '[name].js?version=[contenthash]',
      chunkFilename: '[id].[contenthash].js?version=[contenthash]',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
          include: /fonts/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './assets/fonts/',
                name: '[name].[ext]?version=[contenthash]',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          exclude: /(fonts|favicon)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './assets/images/',
                name: '[name].[ext]?version=[contenthash]',
              },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      hot: true,
      open: true,
      compress: true,
      watchContentBase: true,
      contentBase: path.join(__dirname, 'dist'),
    },
    target: isDevelopment ? 'web' : 'browserslist',
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
