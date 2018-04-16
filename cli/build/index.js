const fs = require('fs');
const webpack = require('webpack');
const config = require('../../config/base.webpack');
const loadCustomConfig = require('../../config/load-custom-config');

module.exports = () => {
  if (!fs.existsSync(process.cwd() + '/./src')) {
    return console.warn(
      'Please make sure you are in the gutenblock directory :)'
    );
  }
  let customConfig = config({
    customConfig: loadCustomConfig(),
    production: true,
  });

  console.log('Building...');

  webpack(customConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err);
    }
    console.log('Done!');
  });
};
