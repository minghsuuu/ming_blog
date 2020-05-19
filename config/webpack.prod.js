process.env.NODE_ENV = 'production';
require('./env');

const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig('production'),
};
