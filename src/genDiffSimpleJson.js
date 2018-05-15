import fs from 'fs';
import { has } from 'lodash';

export default (path1, path2) => {
  const content1 = fs.readFileSync(path1);
  const content2 = fs.readFileSync(path2);
  const obj1 = JSON.parse(content1);
  const obj2 = JSON.parse(content2);
  const keysObj1 = Object.keys(obj1);
  const mapped = keysObj1.map(key => {
    if (has(obj2, key)) {
      return obj1[key] !== obj2[key]
        ? `\t + ${key}: ${obj2[key]}\n\t - ${key}: ${obj1[key]}\n` : `\t   ${key}: ${obj1[key]}\n`;
    }
    const filteredKeysObj2 = Object.keys(obj2).filter(k => !keysObj1.includes(k));
    const [keyObj2] = filteredKeysObj2;
    return `\t - ${key}: ${obj1[key]}\n\t + ${keyObj2}: ${obj2[keyObj2]}\n`;
  });
  const strMapped = mapped.join('');
  return `{\n${strMapped}   }`;
};
