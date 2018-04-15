var ncp = require('ncp').ncp;

module.exports = () => {
  console.log('Creating blocks folder...');

  ncp(__dirname + '/../../plugin', `${process.cwd()}/blocks`, err => {
    if (err) {
      return console.error(err);
    }

    require('child_process').execSync(
      `cd ${process.cwd()}/blocks && npm install`,
      { stdio: [0, 1, 2] }
    );
  });
};
