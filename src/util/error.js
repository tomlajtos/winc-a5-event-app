// TODO: learn & add jsDOC comments
const formatStackLine = (line) => {
  if (/\(http.+\)/.test(line)) {
    // test for string wrapped in parenthesis that starts with 'http'
    const parenthesisStart = line.indexOf("(") + 1;
    // get substring up until the part in parenthesis if there is any
    const lineFront = line.slice(0, parenthesisStart - 1);
    // get the substring wrapped in parenthesis
    const errorLocation = line.slice(parenthesisStart, -1);
    // remove the first part of the url with host and port num
    const filteredErrorLocationParts = errorLocation
      .split(":")
      .filter((str) => !str.includes("http") && !str.includes("//"));

    // get the last two items of the array (line num : col num)
    const errorPosition = filteredErrorLocationParts.slice(-2).join(":");
    // match strings that start with '/' and can only have alpha-numeric characters and '-',
    // '/','_','.'
    const filePath = filteredErrorLocationParts[0].match(/\/[\w-/_(.)]+/gi);
    // return the new trimmed down string
    return `${lineFront} (...${filePath}: ${errorPosition})`;
  }
  return line;
};

// TODO: learn & add jsDOC comments
const generatePrettyErrorObj = (error, cause) => {
  // get rid of stacklines with "node_modules", and remove unnecessary parts of each line
  const stackLinesArr = error.stack
    .split("\n")
    .filter((line) => !line.toLowerCase().includes("node_modules"))
    .map((line) => formatStackLine(line));

  // get data for error options > cause obj.
  const causeProps = {
    status: cause ? cause.status : "",
    statusText: cause ? cause.statusText : "",
    url: cause ? cause.url : "",
    data: cause ? cause.data : null,
  };

  // return an object that has all the props an Error obj can have
  // no need for a new Error obj
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
