import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathFile = (format, fileName) => path.join('__tests__', '__fixtures__', `${fileName}${format}`);

const pathResult = pathFile('.txt', 'result');
const pathResultTree = pathFile('.txt', 'resultTree');
const expected1 = fs.readFileSync(pathResult, 'utf-8');
const expected2 = fs.readFileSync(pathResultTree, 'utf-8');

const beforeJson = pathFile('.json', 'before');
const afterJson = pathFile('.json', 'after');

const beforeYml = pathFile('.yml', 'before');
const afterYml = pathFile('.yml', 'after');

const beforeIni = pathFile('.ini', 'before');
const afterIni = pathFile('.ini', 'after');

const beforeTreeJson = pathFile('.json', 'beforeTree');
const afterTreeJson = pathFile('.json', 'afterTree');

const beforeTreeIni = pathFile('.ini', 'beforeTree');
const afterTreeIni = pathFile('.ini', 'afterTree');

const beforeTreeYml = pathFile('.yml', 'beforeTree');
const afterTreeYml = pathFile('.yml', 'afterTree');

describe('compare files', () => {
  test('JSON diff', () => {
    const actual = genDiff(beforeJson, afterJson);
    expect(actual).toBe(expected1);
  });

  test('YML diff', () => {
    const actual = genDiff(beforeYml, afterYml);
    expect(actual).toBe(expected1);
  });

  test('INI diff', () => {
    const actual = genDiff(beforeIni, afterIni);
    expect(actual).toBe(expected1);
  });
});

describe('compare treeFiles', () => {
  test('JSONtree diff', () => {
    const actual = genDiff(beforeTreeJson, afterTreeJson);
    expect(actual).toBe(expected2);
  });

  test('YMLtree diff', () => {
    const actual = genDiff(beforeTreeYml, afterTreeYml);
    expect(actual).toBe(expected2);
  });

  test('INItree diff', () => {
    const actual = genDiff(beforeTreeIni, afterTreeIni);
    expect(actual).toBe(expected2);
  });
});
