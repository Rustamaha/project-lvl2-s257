import fs from 'fs';
import { find, union, isObject } from 'lodash';
import path from 'path';
import getParse from './parse';
import getRenderer from './renderers';

const propertyAction = [
  {
    type: 'inserted',
    check: (arg1, arg2) => isObject(arg1) && isObject(arg2),
    process: (arg1, arg2, func) => ({ children: func(arg1, arg2) }),
  },
  {
    type: 'added',
    check: (arg1, arg2) => arg2 && !arg1,
    process: (arg1, arg2) => ({ file2Value: arg2 }),
  },
  {
    type: 'removed',
    check: (arg1, arg2) => arg1 && !arg2,
    process: (arg1, arg2) => ({ file1Value: arg1 }),
  },
  {
    type: 'unchanged',
    check: (arg1, arg2) => arg1 === arg2,
    process: arg1 => ({ file1Value: arg1 }),
  },
  {
    type: 'changed',
    check: (arg1, arg2) => (arg1 && arg2) && arg1 !== arg2,
    process: (arg1, arg2) => ({ file1Value: arg1, file2Value: arg2 }),
  },
];

export default (path1, path2, format = 'standart') => {
  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);
  const obj1 = getParse(ext1)(content1);
  const obj2 = getParse(ext2)(content2);

  const getPropertyAction = (arg1, arg2) => find(propertyAction, ({ check }) => check(arg1, arg2));

  const parse = (object1, object2) => {
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);
    const keys = union(objKeys1, objKeys2);
    return keys.map((key) => {
      const arg1 = object1[key];
      const arg2 = object2[key];
      const { process, type } = getPropertyAction(arg1, arg2);
      return { key, type, ...process(arg1, arg2, parse) };
    });
  };
  const ast = parse(obj1, obj2);
  return getRenderer(ast, format);
};
