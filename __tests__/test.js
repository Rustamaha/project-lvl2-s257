import genDiff from '../src';

const data = [
  '{\n',
  '\t   host: hexlet.io\n',
  '\t + timeout: 20\n',
  '\t - timeout: 50\n',
  '\t - proxy: 123.234.53.22\n',
  '\t + verbose: true\n',
  '}'
];
const expected = data.join('');

test('JSON diff', () => {
  const actual = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(actual).toBe(expected);
});

test('YAML diff', () => {
  const actual = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
  expect(actual).toBe(expected);
});
