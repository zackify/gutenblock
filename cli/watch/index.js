const fs = require('fs');
const serve = require('webpack-serve');
const config = require('../../config/base.webpack.js');
const babelOptions = require('../../config/babel-options');

module.exports = () => {
  if (!fs.existsSync(process.cwd() + '/./src')) {
    return console.warn(
      'Please make sure you are in the gutenblock directory :)'
    );
  }

  serve({ config: config({ babelOptions }) });
};
