// TODO: learn & add jsDOC comments
const formatStackLine = (line) => {
  if (/\(http.+\)/.test(line)) {
    const pStart = line.indexOf("(") + 1;
    const lineFront = line.slice(0, pStart - 1);
    const errorLocation = line.slice(pStart, -1);
    const shortErrorLocArr = errorLocation
      .split(":")
      .filter((str) => !str.includes("http") && !str.includes("//"));
    const errorPosition = shortErrorLocArr.slice(-2).join(":");
    const filePath = shortErrorLocArr[0].match(/\/[\w-/_(.)]+/gi);
    return `${lineFront} (...${filePath}: ${errorPosition})`;
  }
  return line;
};

// TODO: learn & add jsDOC comments
const generatePrettyErrorObj = (error, cause) => {
  const stackLinesArr = error.stack
    .split("\n")
    .filter((line) => !line.toLowerCase().includes("node_modules"))
    .map((line) => formatStackLine(line));
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
