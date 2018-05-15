import genDiff from '../src';

test('JSON diff of two files', () => {
  const actual = genDiff('_tests_/_fixtures_/before.json', '_tests_/_fixtures_/after.json');
  const data = [
    '{\n',
    '\t   host: hexlet.io\n',
    '\t + timeout: 20\n',
    '\t - timeout: 50\n',
    '\t - proxy: 123.234.53.22\n',
    '\t + verbose: true\n',
    '   }'
  ];
  const expected = data.join('');
  expect(actual).toBe(expected);
});
