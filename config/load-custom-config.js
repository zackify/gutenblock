//Load custom babel and webpack config
const webpack = require('webpack');

module.exports = () => {
  let customConfig = {};
  try {
    customConfig = require(process.cwd() + '/gutenblock.config')(webpack);
    console.log('Using custom configuration');
  } catch (e) {
    console.log('Using default configuration');
  }
  return customConfig;
};
