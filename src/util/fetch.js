// TODO: add jsDOC comments
// can take multiple endpoint objects
// can take multiple endpoint objects >>  TODO: don't know if this is needed though...
export const getData = async (
  endpoints = [{ name: "categories", path: "/categories" }],
) => {
  const baseUrl = "http://localhost:3003";
  const fetchData = async (endpoint) =>
    await fetch(`${baseUrl}${endpoint.path}`).then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        console.warn(r);
        throw new Error(`${r.status} (${r.statusText})`);
      }
    });

  const dataObj = endpoints.reduce((obj, endpoint) => {
    Object.assign(obj, { [endpoint.name]: "" });
    obj[endpoint.name] = fetchData(endpoint);
    return obj;
  }, {});
  return dataObj;
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
