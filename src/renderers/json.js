export default ast => {
  const renderToJson = JSON.stringify(ast);
  return `${renderToJson}\n`;
};
