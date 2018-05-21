import { isObject, flattenDeep } from 'lodash';

const unchanged = data => data.type !== 'unchanged';

const plainBuilder = (data, path, fn) => {
  const objStringify1 = (obj) => isObject(obj) ? 'complex value' : `value: ${obj}`;
  const objStringify2 = (obj) => isObject(obj) ? 'complex value' : `${obj}`;
  const key = data.key;
  const newPathKey = path.concat(key).join('.');

  switch (data.type) {
    case 'added':
      return `Property '${newPathKey}' was added with ${objStringify1(data.file2Value)}`;
    case 'removed':
      return `Property '${newPathKey}' was removed`;
    case 'changed':
      return `Property '${newPathKey}' was updated. From '${objStringify2(data.file1Value)}' to '${objStringify2(data.file2Value)}'`;
    case 'inserted':
      return fn(data.children, path.concat(key));
  }
};

const rendererToPlain = ast => {
  const iter = (tree, pathKey) => {
    const result = tree
      .filter(unchanged)
      .map(data => plainBuilder(data, pathKey, iter))
      .join('\n');
    return result;
  };
  const result = iter(ast, []);
  return `${result}\n`;
};

export default rendererToPlain;
