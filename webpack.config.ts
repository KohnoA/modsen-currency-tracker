import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import 'webpack-dev-server';

interface EnvVariables {
  mode?: 'production' | 'development';
}

export default ({ mode }: EnvVariables): webpack.Configuration => {
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: './src/index.tsx',
    devtool: isDev ? 'inline-source-map' : false,

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
      },
    },

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[name]__[local]' : '[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
            },
          },
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      isDev && new ReactRefreshWebpackPlugin({ overlay: false }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public', 'manifest.json'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ].filter(Boolean),
  };
};