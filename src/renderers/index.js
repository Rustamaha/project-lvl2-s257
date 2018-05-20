import astRenderer from './astRenderer';
import plain from './plain';
import json from './json';

const renderers = {
  'plain': plain,
  'standart': astRenderer,
  'json': json,
};

export default (data, format) => {
  const renderer = renderers[format];
  return renderer(data);
};
//export default astRenderer;
