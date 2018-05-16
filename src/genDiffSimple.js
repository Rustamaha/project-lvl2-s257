import fs from 'fs';
import { has, union } from 'lodash';
import path from 'path';
import parser from './parsersFormat';

export default (path1, path2) => {
  const content1 = fs.readFileSync(path1);
  const content2 = fs.readFileSync(path2);
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);
  console.log(ext1);
  const data1 = parser(ext1)(content1);
  const data2 = parser(ext2)(content2);
  const objKeys1 = Object.keys(data1);
  const objKeys2 = Object.keys(data2);
  const unitedKeys = union(objKeys1, objKeys2);
  const mapped = unitedKeys.map((key, index) => {
    const predicate = obj1[key] === obj2[key];
    if (has(obj1, key) && has(obj2, key) && !predicate) {
      return `\t + ${key}: ${obj2[key]}\n\t - ${key}: ${obj1[key]}\n`;
    }
    if (predicate) {
      return `\t   ${key}: ${obj1[key]}\n`;
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return `\t - ${key}: ${obj1[key]}\n`;
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return `\t + ${key}: ${obj2[key]}\n`;
    }
  });
  const strMapped = mapped.join('');
  return `{\n${strMapped}}`;
};
