import genDiff from '../src';
import fs from 'fs';

const fixtureDir = '__tests__/__fixtures__/';
const result = `${fixtureDir}result.txt`;

const beforeJson = `${fixtureDir}before.json`;
const afterJson = `${fixtureDir}after.json`;

const beforeYml = `${fixtureDir}before.yml`;
const afterYml = `${fixtureDir}after.yml`;

test('JSON diff', () => {
  const actual = genDiff(beforeJson, afterJson);
  expect(actual).toBe(fs.readFileSync(result, 'utf8'));
});

test('YML diff', () => {
  const actual = genDiff(beforeYml, afterYml);
  expect(actual).toBe(fs.readFileSync(result, 'utf8'));
});
