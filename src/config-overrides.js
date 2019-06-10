const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
      (process.env.NODE_ENV === 'production') ?
          new CopyWebpackPlugin([{from: 'src/audio'}]) :
          new CopyWebpackPlugin([{from: 'src/audio', to: 'dist'}])
  );

  return config;
};