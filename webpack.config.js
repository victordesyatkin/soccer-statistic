const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProduction = mode === "production";
  const isDevelopment = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    let plugins = [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
        meta: {
          viewport: "initial-scale=1.0, width=device-width",
          "msapplication-TileColor": "#da532c",
          "theme-color": "#ffffff",
        },
      }),
      new Dotenv(),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: "src/assets/favicons",
      //       to: "assets/favicons",
      //     },
      //   ],
      // }),
    ];
    if (isDevelopment) {
      plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
      ]);
    }
    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].[hash].css",
        })
      );
    }
    return plugins;
  };

  return {
    mode: isProduction ? "production" : isDevelopment && "development",

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            "resolve-url-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      hot: true,
      open: true,
      watchContentBase: true,
    },
  };
};
