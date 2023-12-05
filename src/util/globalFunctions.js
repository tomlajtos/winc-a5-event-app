// TODO: add jsDOC comments

export const getData = async (
  endpoints = [{ name: "categories", path: "/categories" }],
) => {
  // const baseUrl = "http://localhost:3003";
  // const events = await fetch(`${baseUrl}/${endpoint}`);
  // if (!events.ok) {
  //   console.warn(events);
  //   throw new Error(`${events.status} (${events.statusText})`);
  // }
  // return {
  //   events: await events.json(),
  // };
  const baseUrl = "http://localhost:3003";
  // reduce can't handle async
  const getFn = async (endpoint) =>
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
    obj[endpoint.name] = getFn(endpoint);
    return obj;
  }, {});
  return dataObj;
};

// TODO: Revisit: I'm note sure if I like this
// TODO: add jsDOC comments
// helper function for React Router loader function
export const fetchData = async (
  endpoints = [{ name: "categories", path: "/categories" }],
) => {
  const baseUrl = "http://localhost:3003";
  // reduce can't handle async
  const getFn = async (endpoint) =>
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
    obj[endpoint.name] = getFn(endpoint);
    return obj;
  }, {});

  // re-assign dataObj key values with their awaited self, as they are resolved Promise objects
  for (let key in dataObj) {
    dataObj[key] = await dataObj[key];
  }
  return dataObj;
};

/*--------------------------------------------------------------------------------*/

// Categories related checkbox handler and support functions
// TODO: add jsDOC comments
export const initCheckedStateArr = (template, initValue = true) => {
  const arr = [];
  for (let i of template) {
    arr.push(initValue);
  }
  return arr;
};

// TODO: add jsDOC comments
export const initCategoryIdsArr = (categories) => {
  return categories.map((category) => Number(category.id));
};

// TODO: add jsDOC comments
export const createCheckedStateArr = (template, values) => {
  const state = initCheckedStateArr(template, false);
  values.map((e) => (state[Number(e) - 1] = true));

  return state;
};

// TODO: add jsDOC comments
export const createIdArrOnChange = (idArr, input) => {
  let localIds = [...idArr];

  input.checked
    ? (localIds = Array.from(new Set([Number(input.id), ...localIds])))
    : (localIds = localIds.filter((id) => id !== Number(input.id)));

  return localIds;
};

// TODO: add jsDOC comments
export const handleCheckboxChanges = (e, setFn2) => {
  console.log("%ccheckbox onChange", "color:#D53F8C;background:white");

  const id = e.target.id;
  let value = e.target.value.length ? e.target.value.split(",") : [];

  e.target.checked
    ? (value = [id, ...value].map((v) => Number(v)))
    : (value = value
        .filter((id) => Number(id) !== Number(e.target.id))
        .sort((a, b) => Number(a) - Number(b))
        .map((v) => Number(v)));

  e.target.value = value;

  // set the array of category IDs as the new checkedIds
  if (setFn2) {
    setFn2(value);
  }
};

// // TODO: add jsDOC comments
// // generic function to create an array of checked checkbox Ids from a Map of {id,boolean} key - value pairs
// export const createCheckedIdsArr = (checkedMap) =>
//   Array.from(checkedMap).reduce(
//     (ids, cat) => (cat[1] === true ? (ids = [...ids, cat[0]]) : ids),
//     []
//   );

/*--------------------------------------------------------------------------------*/

// TODO: add jsDOC comments
//
// function to format date-time unti strings from single digit to double digit (i.e. 1 to 01)
const addZeroToDT = (unit) => (unit < 10 ? `0${unit}` : unit);

// TODO: add jsDOC comments
export const formatDateAndTime = (dateStr) => {
  const date = new Date(dateStr);
  const longDateOpt = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const shortDateOpt = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const numericDateOpt = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const timeOpt = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    // timeZoneName: "shortOffset",
  };

  const numericDate = date.toLocaleDateString("en-GB", numericDateOpt);
  const shortDate = date.toLocaleString("en-GB", shortDateOpt);
  const longDate = date.toLocaleDateString("en-GB", longDateOpt);
  const time = date.toLocaleTimeString("en-GB", timeOpt);

  return {
    numericDate: numericDate,
    longDate: longDate,
    date: shortDate,
    time: time,
  };
};

// TODO: add jsDOC comments
//
// function to generate date-time str compatible with <input type=datetime-local>
// str to be used as default value for input element
export const generateDateTimeStr = (dateStr, dur) => {
  const xtraHr = (dur?.h ?? 0) * (60 * 60 * 1000);
  const xtraMin = (dur?.m ?? 0) * (60 * 1000);
  const timeStamp = new Date(dateStr).getTime() + xtraHr + xtraMin;

  const year = new Date(timeStamp).getFullYear();
  const month = new Date(timeStamp).getMonth() + 1;
  let day = new Date(timeStamp).getDate();
  let hour = new Date(timeStamp).getHours();
  let minute = new Date(timeStamp).getMinutes();

  return `${year}-${addZeroToDT(month)}-${addZeroToDT(day)}T${addZeroToDT(
    hour,
  )}:${addZeroToDT(minute)}`;
};
