import { isObject, flatten } from 'lodash';

const setTab = spaces => ' '.repeat(spaces);

const rende = (data, tab) => {
  const tabs = setTab(tab);
  const innerTab = setTab(tab + 2);

  const objStringify = (obj) => {
    if (isObject(obj)) {
      const string = Object.keys(obj).map(key => `${setTab(tabs + 2)}  ${key}: ${obj[key]}`).join('\n');
      return `{\n${innerTab}${string}\n${innerTab}}`;
    }
    return `${obj}`;
  };

  switch (data.type) {
    case 'added':
      return `${tabs}+ ${data.key}: ${objStringify(data.file2Value)}`;
    case 'unchanged':
      return `${tabs}  ${data.key}: ${data.file1Value}`;
    case 'removed':
      return `${tabs}- ${data.key}: ${objStringify(data.file1Value)}`;
    case 'changed':
      return [`${tabs}- ${data.key}: ${objStringify(data.file1Value)}`, `${tabs}+ ${data.key}: ${objStringify(data.file2Value)}`].join('\n');
    case 'inserted':
      return `${tabs}  ${data.key}: {\n${data.children.map(c => rende(c, tab + 4)).join('\n')}\n${innerTab}}`;
    default:
      throw new Error(`unknown type: ${data.type}`);
  }
};


const astRenderer = (ast) => {
  const resultAst = ast.map(data => rende(data, 2));
  return `{\n${resultAst.join('\n')}\n}\n`;
};

export default astRenderer;
