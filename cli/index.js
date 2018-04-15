#! /usr/bin/env node
const init = require('./init');
const watch = require('./watch');
const build = require('./build');

const tasks = {
  init,
  watch,
  build,
};
const start = () => {
  let command = process.argv[2];

  if (!command || !tasks[command])
    return console.log('Please choose a command: init, watch, or build');

  tasks[command]();
};

start();
