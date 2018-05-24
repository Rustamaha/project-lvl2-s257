import astRenderer from './astRenderer';
import rendererToPlain from './plain';
import rendererToJson from './json';

const renderers = {
  plain: rendererToPlain,
  standart: astRenderer,
  json: rendererToJson,
};

export default (data, format) => {
  const renderer = renderers[format];
  return renderer(data);
};
