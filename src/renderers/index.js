import astRenderer from './astRenderer';
import plain from './plain';

const renderers = {
  'plain': plain,
  'standart': astRenderer,
};

export default (data, format) => {
  const renderer = renderers[format];
  return renderer(data);
};
//export default astRenderer;
