import { addBetterErrorProps } from "../util/error";

// TODO: learn & add jsDOC comments
export const handleHttpError = (response) => {
  if (!response.ok) {
    const isServerError = response.status >= 500;
    let errorMessage = "";
    switch (response.status) {
      case 404: {
        errorMessage = "Sorry, I don't have what you're looking for...";
        break;
      }
      default: {
        errorMessage = isServerError
          ? "There was an error while talking to the server..."
          : "It seems theat something was wrong with your request...,";
      }
    }
    const error = new Error(errorMessage, { cause: response });
    error.name = "Error";
    throw error;
  }
};

// TODO: learn & add jsDOC comments
export const getData = async (endpoint, setState, throwAsyncError) => {
  //example: (endpoint: "/categories", setState: setCategories)
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/${endpoint}`;
  try {
    const response = await fetch(url);
    handleHttpError(response);
    const data = await response.json();
    setState(data);
  } catch (e) {
    console.error(e);
    throwAsyncError(e);
  }
};

// TODO: learn & add jsDOC comments
export const getMultiData = (endpointArr, throwAsyncError) => {
  //example: (endpointArr: [[ "/categories",  setCategories],...], fn to handle async error)
  endpointArr.map((endpoint) =>
    getData(endpoint[0], endpoint[1], throwAsyncError),
  );
};

// TODO: learn & add jsDOC comments
export const getAllData = (endpoints, setState, throwAsyncError) => {
  //example: (endpoints: ["categories","users"], setState: setData)
  const baseUrl = "http://localhost:3003";
  const multiFetch = endpoints.map((endpoint) => {
    return () =>
      fetch(`${baseUrl}/${endpoint}`).then((response) => {
        handleHttpError(response);
        return response.json();
      });
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
      throwAsyncError(e);
    });
};

// TODO: learn & add jsDOC comments
export const fetchData = async (endpoint) => {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await fetch(url);
    handleHttpError(response);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
    throw addBetterErrorProps(e);
  }
};
