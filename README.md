[![Build Status](https://travis-ci.org/Rustamaha/project-lvl2-s257.svg?branch=master)](https://travis-ci.org/Rustamaha/project-lvl2-s257)

<a href="https://codeclimate.com/github/codeclimate/codeclimate/maintainability"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability" /></a>

<a href="https://codeclimate.com/github/codeclimate/codeclimate/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage" /></a>

This cli utility compares two configuration files and shows their difference.

It takes three types of formats: ***ini, json, yaml (yml).***
The comparison output can be viewed in three types: ***default, json, plain.***
Make install.

    npm install -g gendiff-khudaibergenov-r
    gendiff -help
Example.
    
    gendiff -f plain file1.json file2.json
     Property 'timeout' was updated. From '50' to '20'
     Property 'proxy' was removed
     Property 'verbose' was added with value: true
     
    gendiff file1.json file2.json
     {
        host: hexlet.io
      - timeout: 50
      + timeout: 20
      - proxy: 123.234.53.22
      + verbose: true
     }
  
