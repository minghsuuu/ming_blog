const path = require('path');
const fs = require('fs');

const appRoot = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appRoot, relativePath);
}

module.exports = {
  dotenv: resolveApp('.env'),
  appRoot,
  appDist: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackConfig: resolveApp('config/webpack.js'),
  resolveApp,
};
