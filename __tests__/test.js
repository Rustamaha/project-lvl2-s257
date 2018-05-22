import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const buildPathForFixture = (format, fileName) => path.join('__tests__', '__fixtures__', `${fileName}${format}`);

const pathResult = buildPathForFixture('.txt', 'result');
const pathResultTree = buildPathForFixture('.txt', 'resultTree');
const plainResult = buildPathForFixture('.txt', 'plain');
const jsonResult = buildPathForFixture('.txt', 'json');

const beforeJson = buildPathForFixture('.json', 'before');
const afterJson = buildPathForFixture('.json', 'after');

const beforeYml = buildPathForFixture('.yml', 'before');
const afterYml = buildPathForFixture('.yml', 'after');

const beforeIni = buildPathForFixture('.ini', 'before');
const afterIni = buildPathForFixture('.ini', 'after');

const beforeTreeJson = buildPathForFixture('.json', 'beforeTree');
const afterTreeJson = buildPathForFixture('.json', 'afterTree');

const beforeTreeIni = buildPathForFixture('.ini', 'beforeTree');
const afterTreeIni = buildPathForFixture('.ini', 'afterTree');

const beforeTreeYml = buildPathForFixture('.yml', 'beforeTree');
const afterTreeYml = buildPathForFixture('.yml', 'afterTree');

describe('compare files', () => {
  test('JSON diff', () => {
    const actual = genDiff(beforeJson, afterJson);
    const expected1 = fs.readFileSync(pathResult, 'utf-8');
    expect(actual).toBe(expected1);
  });

  test('YML diff', () => {
    const actual = genDiff(beforeYml, afterYml);
    const expected1 = fs.readFileSync(pathResult, 'utf-8');
    expect(actual).toBe(expected1);
  });

  test('INI diff', () => {
    const actual = genDiff(beforeIni, afterIni);
    const expected = fs.readFileSync(pathResult, 'utf-8');
    expect(actual).toBe(expected);
  });
});

describe('compare treeFiles', () => {
  test('JSONtree diff', () => {
    const actual = genDiff(beforeTreeJson, afterTreeJson);
    const expected = fs.readFileSync(pathResultTree, 'utf-8');
    expect(actual).toBe(expected);
  });

  test('YMLtree diff', () => {
    const actual = genDiff(beforeTreeYml, afterTreeYml);
    const expected = fs.readFileSync(pathResultTree, 'utf-8');
    expect(actual).toBe(expected);
  });

  test('INItree diff', () => {
    const actual = genDiff(beforeTreeIni, afterTreeIni);
    const expected = fs.readFileSync(pathResultTree, 'utf-8');
    expect(actual).toBe(expected);
  });
});

describe('compare files to plain and json formats', () => {
  test('plain format', () => {
    const actual = genDiff(beforeTreeJson, afterTreeJson, '-plain');
    const expected = fs.readFileSync(plainResult, 'utf-8');
    expect(actual).toBe(expected);
  });

  test('json format', () => {
    const actual = genDiff(beforeTreeJson, afterTreeJson, '-json');
    const expected = fs.readFileSync(jsonResult, 'utf-8');
    expect(actual).toBe(expected);
  });
});
