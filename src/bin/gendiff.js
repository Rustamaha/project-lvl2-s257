#!/usr/bin/env node

import program from 'commander';

import genDiff from '..';
import packageJson from '../../package.json';


program
  .version(packageJson.version)
  .arguments('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format: plain, json, standart')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, options.format));
  });

program.parse(process.argv);
