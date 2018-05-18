import genDiff from '../src';
import fs from 'fs';
import path from 'path';


const pathFile = (format, fileName) => path.join('__tests__','__fixtures__',`${fileName}${format}`);

const pathResult = pathFile('.txt', 'result');
const expected = fs.readFileSync(pathResult, 'utf-8');

const beforeJson = pathFile('.json', 'before');
const afterJson = pathFile('.json', 'after');

const beforeYml = pathFile('.yml', 'before');
const afterYml = pathFile('.yml', 'after');

const beforeIni = pathFile('.ini', 'before');
const afterIni = pathFile('.ini', 'after');

test('JSON diff', () => {
  const actual = genDiff(beforeJson, afterJson);
  expect(actual).toBe(expected);
});

test('YML diff', () => {
  const actual = genDiff(beforeYml, afterYml);
  expect(actual).toBe(expected);
});

test('INI diff', () => {
  const actual = genDiff(beforeIni, afterIni);
  expect(actual).toBe(expected);
});
