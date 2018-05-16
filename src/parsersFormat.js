import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
};

export default format => (data) => {
  const parser = parsers[format];
  return parser(data);
};
