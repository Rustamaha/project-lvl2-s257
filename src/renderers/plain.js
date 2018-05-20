import { isObject, flattenDeep } from 'lodash';

const decomposeAnObject1 = (obj) => isObject(obj) ? 'complex value' : `value: ${obj}`;
const decomposeAnObject2 = (obj) => isObject(obj) ? 'complex value' : `${obj}`;

const plainFormat = (data, key) => {
  const newPathKey = key ? `${key}.${data.key}` : `${data.key}`;
  switch (data.type) {
    case 'added':
      return `Property '${newPathKey}' was added with ${decomposeAnObject1(data.file2Value)}`;
    case 'removed':
      return `Property '${newPathKey}' was removed`;
    case 'changed':
      return `Property '${newPathKey}' was updated. From '${decomposeAnObject2(data.file1Value)}' to '${decomposeAnObject2(data.file2Value)}'`;
    case 'unchanged':
      return null;
    case 'inserted':
      return data.children.map(c => plainFormat(c, newPathKey));
  }
};

const rendererToPlain = ast => `${flattenDeep(ast.map(data =>
  plainFormat(data, ''))).filter(k => k !== null).join('\n')}\n`;

export default rendererToPlain;
