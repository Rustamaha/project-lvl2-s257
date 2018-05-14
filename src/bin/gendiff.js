#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('../../package.json');

program
  .version(packageJSON.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, firstConfig) =>
    console.log(`firstConfig = ${firstConfig}, secondConfig = ${secondConfig}`))
  .parse(process.argv);

if (!program.args.length) program.help();
