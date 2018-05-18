import fs from 'fs';
import { has, union } from 'lodash';
import path from 'path';
import parse from './parse';

export default (path1, path2) => {
  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);
  const obj1 = parse(ext1)(content1);
  const obj2 = parse(ext2)(content2);
  const objKeys1 = Object.keys(obj1);
  const objKeys2 = Object.keys(obj2);
  const unitedKeys = union(objKeys1, objKeys2);
  const setTab = spaces => ' '.repeat(spaces);
  const tab = setTab(4);
  const mapped = unitedKeys.map((key) => {
    const sameValues = obj1[key] === obj2[key];
    if (has(obj1, key) && has(obj2, key) && !sameValues) {
      return [`${tab}+ ${key}: ${obj2[key]}`, `${tab}- ${key}: ${obj1[key]}`].join('\n');
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return `${tab}- ${key}: ${obj1[key]}`;
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return `${tab}+ ${key}: ${obj2[key]}`;
    }
    return `${tab}  ${key}: ${obj1[key]}`;
  });
  const strMapped = mapped.join('\n');
  return `{\n${strMapped}\n}\n`;
};
