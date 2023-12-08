// TODO: add jsDOC comments
// TODO: use less complicated fetching for single resource only
export const getData = async (endpointPath, setCallback) => {
  const baseUrl = "http://localhost:3003";
  const promise = await fetch(`${baseUrl}${endpointPath}`);
  // console.log(promise);
  if (promise.ok) {
    let data = await promise.json();
    // console.log("data in getData", data);
    setCallback(data);
  } else {
    console.warn(promise);
    throw new Error(`${promise.status} (${promise.statusText})`);
  }
};

};

// TODO: Revisit: I'm note sure if I like this
// TODO: add jsDOC comments
// helper function for React Router loader function
// can take multiple endpoint objects >>  TODO: don't know if this is needed though...
export const fetchData = async (
  endpoints = [{ name: "categories", path: "/categories" }],
) => {
  const baseUrl = "http://localhost:3003";
  // reduce can't handle async
  const fetchD = async (endpoint) =>
    await fetch(`${baseUrl}${endpoint.path}`).then((r) =>
      // r.json());

      // /* ?for error? */
      {
        if (r.ok) {
          return r.json();
        } else {
          console.warn(r);
          throw new Error(`${r.status} (${r.statusText})`);
        }
      },
    );

  const dataObj = endpoints.reduce((obj, endpoint) => {
    Object.assign(obj, { [endpoint.name]: "" });
    obj[endpoint.name] = fetchD(endpoint);
    return obj;
  }, {});

  // re-assign dataObj key values with their awaited self, as they are resolved Promise objects
  for (let key in dataObj) {
    dataObj[key] = await dataObj[key];
  }
  return dataObj;
};
