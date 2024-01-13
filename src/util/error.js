import { log } from "./log";

export const transformError = (error) => {
  console.warn("transforming error");

  const { message, name, status, statusText, stack, url, data } = error;

  const newError = new Error("new");

  // order in newProps arr matters when creating a new Error!
  const newProps = [
    ["name", name ? name : data ? data.name : "Error (fallback value)"],
    [
      "status",
      status
        ? status
        : data
          ? data.status
          : "Unknown error status (fallback value)",
    ],
    [
      "statusText",
      statusText
        ? statusText
        : data
          ? data.statusText
          : "The error status has no description (fallback value)",
    ],
    [
      "message",
      message
        ? message
        : data
          ? data.message
          : "Something went wrong (fallback value)",
    ],
    [
      "stack",
      stack && /\\n/.test(stack)
        ? stack
        : data
          ? data.resStack || data.stack
          : `${error.name}: ${error.statusText} - ${error.status}\n  This error does not provide any details.`,
    ],
    ["url", url ? url : data ? data.url : ""],
    ["data", data ? data : {}],
  ];

  newProps.map((prop) => (newError[prop[0]] = prop[1]));
  return newError;
};

export const prettifyError = (error) => {
  const stackLinesArr = error.stack.split("\n");

  // not a valid Error object
  const prettyErrorObj = {
    name: error.name,
    status: error.status,
    statusText: error.statusText,
    message: error.message,
    stackLines: stackLinesArr,
    data: error.data,
  };

  return prettyErrorObj;
};

export const testError = {
  name: "Test Error",
  message: "This is a test error",
  stack:
    "prettifyError > error: Error: Catch me if you can...\nat fetchData (fetch.js?t=1704450514773:44:11)\nat async callLoaderOrAction (react-router-dom.js?v=b81d899d:2632:16)\nat async Promise.all (:3001/event/index 0)\nat async callLoadersAndMaybeResolveData (react-router-dom.js?v=b81d899d:1985:19)\nat async handleLoaders (react-router-dom.js?v=b81d899d:1645:9)\nat async startNavigation (react-router-dom.js?v=b81d899d:1502:9)\nat async startRedirectNavigation (react-router-dom.js?v=b81d899d:1975:7) {error: Error: Catch this you SOB...\nat fetchData (http://localhost:3001/src/util/fetch.js?t=1704450514…}",
};

// deprecated code
//
// const getStackLineData = (line) => {
//   const locationRegX = /((\d+)?\S?\d+)(?=\))/g;
//   const nameRegX = /(\w+)\.?(\w+)(?=\s\()/g;
//   const fileNameRegX = /([\w-_]+)\.(\w+)(?=\?)/g;
//   const parenthBlockRegX = /\(.+[)}]/g;
//
//   const [textObj] = line.match(nameRegX) || ["unknown"];
//   const isAsync = line.includes("async") ? "(async)" : "";
//   const fileName = line.match(fileNameRegX)
//     ? line.match(fileNameRegX)[0]
//     : "unknown file";
//
//   const [errLocation] =
//     locationRegX.test(line) && line.match(locationRegX)[0] !== 0
//       ? line.match(locationRegX)
//       : line.match(parenthBlockRegX) || ["unknown location"];
//   const fullLine = `at ${textObj} ${isAsync} of ${fileName} >> loc: ${errLocation}`;
//   return {
//     async: isAsync,
//     textObject: textObj,
//     fileName,
//     location: errLocation,
//     line: fullLine,
//   };
// };

// const arrayFromStackLines = (error) => {
//   let stack = "";
//   if (error.stack) {
//     stack = error.stack;
//     console.log("error has a stack prop", error.stack);
//   } else if (error.data) {
//     stack = error.data.stack;
//     console.log(error.data.stack);
//   } else {
//     stack =""
//   }
//   log.value("STACK", stack);
//   return stack.split("\n");
// };
