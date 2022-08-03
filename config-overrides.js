const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src'),
    '@views': resolve('src/views'),
    '@components': resolve('src/components'),
    '@routes': resolve('src/routes'),
    '@actions': resolve('src/actions'),
    '@store': resolve('src/store'),
    '@utils': resolve('src/utils'),
    '@images': resolve('src/images')
  };
  return config;
};
