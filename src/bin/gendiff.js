#!/usr/bin/env node

import program from 'commander';

import genDiff from '..';
import packageJson from '../../package.json';


program
  .version(packageJson.version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format: plain, json, standart')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, this.format);
    console.log(result);
  });

program.parse(process.argv);
