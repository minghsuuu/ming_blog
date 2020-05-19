process.env.NODE_ENV = 'development';
require('./env');

const paths = require('./paths');
const webpackConfig = require('./webpack.config.js');

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const devServer = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  transportMode: 'ws',
  injectClient: false,
  publicPath: '/',
  watchOptions: {
    ignored: ['node_modules/**'],
  },
  host,
  port,
  open: true,
  overlay: false,
  historyApiFallback: true,
};

module.exports = {
  ...webpackConfig('development'),
  devServer,
};
