import fs from 'fs';
import { find, union, isObject } from 'lodash';
import path from 'path';
import getParser from './parse';
import render from './renderers';

const propertyAction = [
  {
    type: 'inserted',
    check: (arg1, arg2) => isObject(arg1) && isObject(arg2),
    process: (arg1, arg2, func) => ({ children: func(arg1, arg2) }),
  },
  {
    type: 'added',
    check: (arg1, arg2) => arg2 && !arg1,
    process: (arg1, arg2) => ({ newValue: arg2 }),
  },
  {
    type: 'removed',
    check: (arg1, arg2) => arg1 && !arg2,
    process: arg1 => ({ oldValue: arg1 }),
  },
  {
    type: 'unchanged',
    check: (arg1, arg2) => arg1 === arg2,
    process: arg1 => ({ oldValue: arg1 }),
  },
  {
    type: 'changed',
    check: (arg1, arg2) => (arg1 && arg2) && arg1 !== arg2,
    process: (arg1, arg2) => ({ oldValue: arg1, newValue: arg2 }),
  },
];

const getPropertyAction = (arg1, arg2) => find(propertyAction, ({ check }) => check(arg1, arg2));

const buildAst = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);
  const keys = union(objKeys1, objKeys2);
  return keys.map((key) => {
    const arg1 = object1[key];
    const arg2 = object2[key];
    const { process, type } = getPropertyAction(arg1, arg2);
    return { key, type, ...process(arg1, arg2, buildAst) };
  });
};

const getContent = (pathString) => {
  const content = fs.readFileSync(pathString, 'utf-8');
  const ext = path.extname(pathString);
  const obj = getParser(ext)(content);
  return obj;
};

export default (path1, path2, format = '-standart') => {
  const objBefore = getContent(path1);
  const objAfter = getContent(path2);
  const ast = buildAst(objBefore, objAfter);
  return render(ast, format);
};
