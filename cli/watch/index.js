const fs = require('fs');
const serve = require('webpack-serve');
const { spawn } = require('child_process');
const config = require('../../config/base.webpack');
const loadCustomConfig = require('../../config/load-custom-config');

module.exports = () => {
  if (!fs.existsSync(process.cwd() + '/./src')) {
    return console.warn(
      'Please make sure you are in the gutenblock directory :)'
    );
  }
  serve({ config: config({ customConfig: loadCustomConfig() }) });
  if (process.argv[3] !== 'docker') return;

  const docker = spawn(`docker-compose`, [
    '-f',
    `${__dirname}/docker-compose.yml`,
    '--project-directory',
    process.cwd(),
    'up',
  ]);

  docker.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  docker.stderr.on('data', function(data) {
    console.error(data.toString());
  });
};
