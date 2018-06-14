const setTab = spaces => ' '.repeat(spaces);

const rende = (data, tab) => {
  const tabs = setTab(tab);
  const innerTab = setTab(tab + 2);

  const stringify = (obj) => {
    if (obj instanceof Object) {
      const string = Object.keys(obj).map(key => `${setTab(tabs + 2)}  ${key}: ${obj[key]}`).join('\n');
      return `{\n${innerTab}${string}\n${innerTab}}`;
    }
    return `${obj}`;
  };

  switch (data.type) {
    case 'added':
      return `${tabs}+ ${data.key}: ${stringify(data.newValue)}`;
    case 'unchanged':
      return `${tabs}  ${data.key}: ${data.oldValue}`;
    case 'removed':
      return `${tabs}- ${data.key}: ${stringify(data.oldValue)}`;
    case 'changed':
      return [`${tabs}- ${data.key}: ${stringify(data.oldValue)}`, `${tabs}+ ${data.key}: ${stringify(data.newValue)}`].join('\n');
    case 'inserted':
      return `${tabs}  ${data.key}: {\n${data.children.map(c => rende(c, tab + 4)).join('\n')}\n${innerTab}}`;
    default:
      throw new Error(`unknown type: ${data.type}`);
  }
};

const formatLines = data => `{\n${data.join('\n')}\n}`;

const astRenderer = ast => ast.map(data => rende(data, 2));

export default tree => formatLines(astRenderer(tree));
