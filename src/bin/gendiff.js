#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((prog) => {
    if (program.h) {
      console.log(program.h);
    }
    if (program.V) {
      console.log(program.V);
    }
    console.log(program.f);
  })
    .parse(process.argv);
