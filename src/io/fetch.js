import { json as routerJson } from "react-router-dom";
import { log } from "../util/log";

// TODO: learn & add jsDOC comments
const handleHttpError = (response, routerJson) => {
  if (!response.ok) {
    // throw custom React-Router-json >> name, error, stack is for prettyError and ErrorUi
    console.log("handleHttpError > !ok response", response);
    throw routerJson(
      {
        name: "HTTP Error",
        message: "There was an error while talking to the server...",
        stack: `Error: HTTP error - ${response.status}\n  ${response.statusText} > ${response.url}\n  at (async) 'fetchData' in 'fetch.js' (url:${response.url})`,
        url: response.url,
      },
      {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      },
    );
  }
};

// TODO: learn & add jsDOC comments
const handleCatch = async (e) => {
  // throw custom Error if e is a RRouter JSON Response
  if (!e.ok) {
    const data = await e.json();
    throw new Error(data.message, {
      cause: {
        ...data,
        status: e.status,
        statusText: e.statusText,
        url: e.url,
      },
    });
  }
  // throw error if error is not a response
  throw new Error(e);
};

// TODO: learn & add jsDOC comments
export const getData = async (endpoint, setState) => {
  //example: (endpoint: "/categories", setState: setCategories)
  const baseUrl = "http://localhost:3003";
  const url = `${baseUrl}/${endpoint}`;
  try {
    const response = await fetch(url);
    handleHttpError(response, routerJson);
    let data = await response.json();
    setState(data);
  } catch (e) {
    await handleCatch(e);
  }
};

// TODO: learn & add jsDOC comments
export const getMultiData = (endpointArr) => {
  //example: (endpointArr: [{  path: "/categories", setState: setCategories}])
  endpointArr.map((endpoint) => getData(endpoint[0], endpoint[1]));
};

// TODO: learn & add jsDOC comments
export const getAllMultiData = (endpoints, setState) => {
  //example: (endpoints: ["categories","users"], setState: setCategories)
  const baseUrl = "http://localhost:3003";
  const multiFetch = endpoints.map((endpoint) => {
    return () => fetch(`${baseUrl}/${endpoint}`).then((data) => data.json());
  });
  Promise.all([...multiFetch.map((fetchFn) => fetchFn())])
    .then((args) => {
      setState(
        endpoints.reduce(
          (data, endpoint, index) => ({ ...data, [endpoint]: args[index] }),
          {},
        ),
      );
    })
    .catch((e) => {
      throw new Error(e);
    });
};

// TODO: learn & add jsDOC comments
export const fetchData = async (endpoint) => {
  const baseUrl = "http://localhost:3003";
  const url = `${baseUrl}/${endpoint}`;

  // using try/catch - this way it can chatch more then just http errors
  // still needs conditional react router `json` throw in `try` so it can be retreaved in `catch`
  // r.r. json is imported as rrjson because of the use of promise proto method .json()
  try {
    const response = await fetch(url);
    handleHttpError(response, routerJson);

    const json = await response.json();
    return json;
  } catch (e) {
    await handleCatch(e);
  }
};
