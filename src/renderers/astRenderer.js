import { isObject } from 'lodash';

const setTab = spaces => ' '.repeat(spaces);

const rende = (data, tab) => {
  const tabs = setTab(tab);
  const innerTab = setTab(tab + 2);

  const decomposeAnObject = (obj) => {
    const decompose = Object.keys(obj)
      .map(key => `${setTab(2)}  ${key}: ${obj[key]}`).join('\n');
    return `{\n${innerTab}${decompose}\n${innerTab}}`;
  };

  switch (data.type) {
    case 'added':
      return `${tabs}+ ${data.key}: ${isObject(data.file2Value) ? decomposeAnObject(data.file2Value) : data.file2Value}`;
    case 'unchanged':
      return `${tabs}  ${data.key}: ${data.file1Value}`;
    case 'removed':
      return `${tabs}- ${data.key}: ${isObject(data.file1Value) ? decomposeAnObject(data.file1Value) : data.file1Value}`;
    case 'changed':
      return [`${tabs}- ${data.key}: ${isObject(data.file1Value) ? decomposeAnObject(data.file1Value) : data.file1Value}`, `${tabs}+ ${data.key}: ${isObject(data.file2Value) ? decomposeAnObject(data.file2Value) : data.file2Value}`].join('\n');
    case 'inserted':
      return `${tabs}  ${data.key}: {\n${data.children.map(c => rende(c, tab + 4)).join('\n')}\n${innerTab}}`;
    default:
      return 'type is incorrect';
  }
};


const astRenderer = (ast) => {
  const result = ast.map(data => rende(data, 2, 1)).join('\n');
  return `{\n${result}\n}\n`;
};

export default astRenderer;
