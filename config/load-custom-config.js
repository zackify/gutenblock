//Load custom babel and webpack config

module.exports = () => {
  let customConfig = {};
  try {
    customConfig = require(process.cwd() + '/gutenblock.config');
    console.log('Using custom configuration');
  } catch (e) {
    console.log('Using default configuration');
  }
  return customConfig;
};
