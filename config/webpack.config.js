const webpack = require('webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

module.exports = function webpackConfig(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const env = getClientEnvironment();
  return {
    mode: isEnvDevelopment ? 'development' : isEnvProduction && 'production',
    devtool: isEnvDevelopment
      ? 'cheap-module-source-map'
      : isEnvProduction && false,
    entry: paths.appIndexJs,
    output: {
      path: isEnvProduction ? paths.appDist : undefined,
      pathinfo: isEnvDevelopment,
      publicPath: '/',
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: paths.appSrc,
          use: [
            'babel-loader',
            isEnvDevelopment && 'eslint-loader',
          ].filter(Boolean),
        },
        {
          test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: './static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            isEnvProduction && {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isEnvDevelopment },
            },
            isEnvDevelopment && 'style-loader',
            'css-loader',
          ].filter(Boolean),
        },
      ],
    },
    resolve: {
      alias: {
        '@': paths.appSrc,
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        ...isEnvProduction ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        } : {},
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appRoot),
      new webpack.DefinePlugin(env.stringified),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvDevelopment
        && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      isEnvProduction
        && new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ].filter(Boolean),
  };
};
