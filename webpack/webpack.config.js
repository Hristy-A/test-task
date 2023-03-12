const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  if (envVars.analyze) {
    config.plugins = [
      ...config.plugins,
      new BundleAnalyzerPlugin(),
    ]
  }
  return config;
};
