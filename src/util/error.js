// TODO: learn & add jsDOC comments
const generatePrettyErrorObj = (error, cause) => {
  const stackLinesArr = error.stack.split("\n");
  const causeProps = {
    status: cause ? cause.status : "",
    statusText: cause ? cause.statusText : "",
    url: cause ? cause.url : "",
    data: cause ? cause.data : null,
  };
  return {
    name: error.name,
    message: error.message,
    stackLines: stackLinesArr,
    ...causeProps,
  };
};

// TODO: learn & add jsDOC comments
// returns an object with error props that are used in the ErrorUi component
export const prettifyError = (error) => {
  if (!error.cause) {
    return generatePrettyErrorObj(error);
  }
  return generatePrettyErrorObj(error, error.cause);
};
