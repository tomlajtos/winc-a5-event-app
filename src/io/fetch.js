import { json as rrjson } from "react-router-dom";
import { log } from "../util/log";
// TODO: thrown errors are ignored, only component level error is picked up by error boundaries and React Router
// find a solution if possible

// TODO: add jsDOC comments
// TODO: use less complicated fetching for single resource only
export const getData = async (endpointPath, setState) => {
  //example: ( e.Path: "/categories", setState: setCategories )
  const baseUrl = "http://localhost:3003";
  const response = await fetch(`${baseUrl}${endpointPath}`);
  if (response.ok) {
    let data = await response.json();
    setState(data);
  } else {
    log.error("Error @getData>promise:", response);
    throw new Error(`${response.status}:(${response.statusText})`);
  }
};

// TODO: add jsDOC comments
export const getMultiData = (endpointArr) => {
  //example: [{  path: "/categories", setState: setCategories}]
  endpointArr.map((endpoint) => getData(endpoint.path, endpoint.setState));
};

export const fetchData = async (endpoint) => {
  const baseUrl = "http://localhost:3003";
  const url = `${baseUrl}${endpoint}`;

  // using try/catch - this way it can chatch more then just http errors
  // still needs conditional react router `json` throw in `try` so it can be retreaved in `catch`
  // r.r. json is imported as rrjson because of the use of promise proto method .json()
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // name, error, stack is for prettyError and ErrorUi
      throw rrjson(
        {
          name: "Fetch error",
          message: "There was an error while talking to the server...",
          stack: `Error: HTTP error - ${response.status}\n  ${response.statusText} > ${response.url}\n  at fetchData(async) fetch.js (url:${response.url})`,
          url: response.url,
        },
        {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        },
      );
    }

    const json = await response.json();
    log.value("json fetch", json);
    return json;
  } catch (e) {
    const data = await e.json();

    throw rrjson(
      {
        name: data.name,
        message: data.message,
        stack: e.stack,
        resStack: data.stack,
        url: data.url,
      },
      { status: e.status, statusText: e.statusText, url: e.url },
    );
  }
};
