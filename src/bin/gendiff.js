#!/usr/bin/env node

import genDiff from '..';

const program = require('commander');
const packageJSON = require('../../package.json');

program
  .version(packageJSON.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => console.log(genDiff(firstConfig, secondConfig), options.format))
  .parse(process.argv);
