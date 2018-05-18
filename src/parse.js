import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': decode,
};

export default format => (data) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`unknown format: ${format}`);
  }
  return parser(data);
};
