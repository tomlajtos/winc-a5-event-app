// TODO: learn & add jsDOC comments
const generatePrettyErrorObj = (error) => {
  const stackLinesArr = error.stack.split("\n");
  return {
    name: error.name,
    status: error.status,
    statusText: error.statusText,
    message: error.message,
    stackLines: stackLinesArr,
    data: error.data,
  };
};

// TODO: learn & add jsDOC comments
// returns an object with error props that are used in the ErrorUi component
export const prettifyError = (error) => {
  if (!error.cause) {
    return generatePrettyErrorObj(error);
  }
  const customError = error.cause;
  return generatePrettyErrorObj(customError);
};
