#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('../../package.json');

program
  .version(packageJSON.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((program) => {
    if (program.h) {
      console.log(program.help);
    }
    if (program.V) {
      console.log(program.version);
    }
    console.log(program.format);
  })
  .parse(process.argv);
