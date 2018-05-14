#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('../../package.json');

program
  .version(packageJSON.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(`firstConfig = ${firstConfig}, secondConfig = ${secondConfig}`))
  .parse(process.argv);

if (program.h || program.help) program.help();
