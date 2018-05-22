const isUnchanged = data => data.type !== 'unchanged';

const buildPlain = (data, path, fn) => {
  const addedStringify = obj => (obj instanceof Object ? 'complex value' : `value: ${obj}`);
  const changedStringify = obj => (obj instanceof Object ? 'complex value' : `${obj}`);
  const {
    key,
    type,
    newValue,
    oldValue,
    children,
  } = data;
  const keyString = path.concat(key).join('.');

  switch (type) {
    case 'added':
      return `Property '${keyString}' was added with ${addedStringify(newValue)}`;
    case 'removed':
      return `Property '${keyString}' was removed`;
    case 'changed':
      return `Property '${keyString}' was updated. From '${changedStringify(oldValue)}' to '${changedStringify(newValue)}'`;
    case 'inserted':
      return fn(children, path.concat(key));
    default:
      throw new Error(`unknown type: ${type}`);
  }
};

const renderToPlain = (ast) => {
  const iter = (tree, pathKey) => {
    const result = (tree)
      .filter(isUnchanged)
      .map(data => buildPlain(data, pathKey, iter))
      .join('\n');
    return result;
  };
  const result = iter(ast, []);
  return `${result}`;
};

export default renderToPlain;
