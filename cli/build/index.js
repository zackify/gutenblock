const fs = require('fs');
const webpack = require('webpack');
const config = require('../../config/base.webpack.js');
const babelOptions = require('../../config/babel-options');

module.exports = () => {
  if (!fs.existsSync(process.cwd() + '/./src')) {
    return console.warn(
      'Please make sure you are in the gutenblock directory :)'
    );
  }
  let customConfig = config({ babelOptions, production: true });
  delete customConfig.serve;

  console.log('Building...');

  webpack(customConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err);
    }
    console.log('Done!');
  });
};
