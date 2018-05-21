#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';
import packageJson from '../../package.json';

program
  .version(packageJson.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);
    console.log(result);
  })
  .parse(process.argv);
