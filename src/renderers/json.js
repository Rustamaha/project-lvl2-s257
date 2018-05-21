export default ast => {
  const rendererToJson = JSON.stringify(ast);
  return `${rendererToJson}\n`;
};
