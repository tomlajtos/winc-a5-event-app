const getStackLineData = (line) => {
  const locationRegX = /((\d+)?\S?\d+)(?=\))/g;
  const nameRegX = /(\w+)\.?(\w+)(?=\s\()/g;
  const fileNameRegX = /([\w-_]+)\.(\w+)(?=\?)/g;
  const parenthBlockRegX = /\(.+[)}]/g;

  const [textObj] = line.match(nameRegX);
  const isAsync = line.includes("async") ? "(async)" : "";
  const fileName = line.match(fileNameRegX) ? line.match(fileNameRegX)[0] : "-";
  const parenthBlock = line.match(parenthBlockRegX);

  // console.log(
  //   "textObject:",
  //   textObj,
  //   "\nisAsync:",
  //   isAsync,
  //   "\nfileName:",
  //   fileName,
  //   "\nparenthBlock",
  //   parenthBlock,
  // );
  let [errLocation] = locationRegX.test(line)
    ? line.match(locationRegX)
    : line.match(parenthBlockRegX);
  console.log("errLocation:", errLocation);
  // const [lineNum, colNum] = errLocation.split(":");
  const fullLine = `at ${textObj} ${isAsync} of ${fileName} >> loc: ${errLocation}`;
  console.log("fullLine", fullLine);
  console.log("***");
  return {
    async: isAsync,
    textObject: textObj,
    fileName,
    location: errLocation,
    line: fullLine,
    // lineNum,
    // colNum,
    // line: fullLine
  };
};
// const getStackLineData = (stackLine) => {
//   console.log("getStackLineData > stackLine:\n", stackLine);
//   const splitLine = stackLine.split(" ").filter((str) => str.length > 0);
//   const splitLine2 = chewLine(stackLine);
//   // console.log("getStackLineData > splitLine:", splitLine);
//   console.log("getStackLineData > splitLine2:", splitLine2);
//
//   const fileName = splitLine.at(-2);
//   console.log("getStackLineData > fileName:", fileName);
//   const [lineNum] = splitLine.at(-1).match(/\d+(?=:\d+\))/g);
//   console.log("getStackLineData > lineNum:", lineNum);
//   const [colNum] = splitLine.at(-1).match(/\d+(?=\))/g);
//   console.log("getStackLineData > colNum:", colNum);
//   const prettyLine = `at ${fileName} >> (${lineNum}:${colNum})`;
//   console.log("getStackLineData > prettyLine:", prettyLine);
//   return { fileName, lineNum, colNum, line: prettyLine };
// };

export const pretifyError = (error) => {
  console.log("prettifyError > error:", error, { error });
  const stackLinesArr = error.stack.split("\n").slice(1);
  console.log("prettifyError > stackLinesArr:", stackLinesArr);

  const stackLineObjects = stackLinesArr.map((line) => {
    console.log("stackLineObjects > line:\n", line);
    console.log("stackLineObjects > getSteckLineData:", getStackLineData(line));
    return getStackLineData(line);
  });
  console.log("stackLineObjects arr:", stackLineObjects);
  return {
    name: error.name,
    message: error.message,
    stackLines: stackLineObjects,
  };
};

export const testError = {
  name: "Tesat Error",
  message: "This is a rest error",
  stack:
    "prettifyError > error: Error: Catch this you SOB...\nat fetchData (fetch.js?t=1704450514773:44:11)\nat async callLoaderOrAction (react-router-dom.js?v=b81d899d:2632:16)\nat async Promise.all (:3001/event/index 0)\nat async callLoadersAndMaybeResolveData (react-router-dom.js?v=b81d899d:1985:19)\nat async handleLoaders (react-router-dom.js?v=b81d899d:1645:9)\nat async startNavigation (react-router-dom.js?v=b81d899d:1502:9)\nat async startRedirectNavigation (react-router-dom.js?v=b81d899d:1975:7) {error: Error: Catch this you SOB...\nat fetchData (http://localhost:3001/src/util/fetch.js?t=1704450514…}",
};
