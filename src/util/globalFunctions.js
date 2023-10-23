// TODO: refactor get data to only return promisses as obj.prop values
// resolve the promisses in the loader function ?? maybe it is less confusing this way
export const getData = async (
  endpoints = [{ name: "categories", path: "/categories" }]
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
      }
    );

  const dataObj = endpoints.reduce((obj, endpoint) => {
    Object.assign(obj, { [endpoint.name]: "" });
    obj[endpoint.name] = getFn(endpoint);
    return obj;
  }, {});
  return dataObj;
};

// TODO: I'm note sure if I like this, think about a better solution
//
// helper function for React Router loader function
export const fetchData = async (
  endpoints = [{ name: "categories", path: "/categories" }]
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
      }
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

// Categories related checkbox handler and support functions
//
// function to create checkedItemMap from an Array of objects
// key: obj.id, value: initValue: boolean;
// this map can be used to track the checked state of checkbox group items
// obj.id and e.target.id has to be the same value and type
// i.e. event categories in nav menu filter options, and in new event form to set categories
export const initCheckedItemMap = (objArr, initValue = true) =>
  objArr.map((item) => [Number(item.id), initValue]);

export const setCheckedItemMap = (map, arr) => {
  const newMap = new Map([...map]);
  arr.map((item) => {
    // arr is an array of category ids
    // no need to check if newMap has `item`, since each category is represented in map as
    // [key: category id, value: boolian]
    newMap.set(item, !newMap.get(item));
  });
  return newMap;
};

// function to handle onChange event in a group of checkboxes
export const handleCheckboxChanges = (e, checkedMap, setFn, setFn2) => {
  const id = e.target.id;
  // create and mutate a local copy of checkedMap
  const newChecked = new Map([...checkedMap]);
  const chkd = newChecked.get(Number(id));
  newChecked.set(Number(id), !chkd);
  // set copy as new state for checkedMap
  setFn(new Map([...newChecked]));

  if (setFn2) {
    // create an array of checked id and set it as new state with setFn2
    setFn2(createCheckedIdsArr(newChecked));
  }
};

// generic function to create an array of checked checkbox Ids from a Map of {id,boolean} key - value pairs
export const createCheckedIdsArr = (checkedMap) =>
  Array.from(checkedMap).reduce(
    (ids, cat) => (cat[1] === true ? (ids = [...ids, cat[0]]) : ids),
    []
  );

// function to format date-time unti strings from single digit to double digit (i.e. 1 to 01)
const addZeroToDT = (unit) => (unit < 10 ? `0${unit}` : unit);

export const formatDateAndTime = (dateStr) => {
  const date = new Date(dateStr);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const shortDateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    // timeZoneName: "shortOffset",
  };

  const shortDate = date.toLocaleDateString("en-GB", shortDateOptions);
  const fullDate = date.toLocaleDateString("en-GB", dateOptions);
  const fullTime = date.toLocaleTimeString("en-GB", timeOptions);

  return {
    shortDate: shortDate,
    date: fullDate,
    time: fullTime,
  };
};

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
    hour
  )}:${addZeroToDT(minute)}`;
};
// functin to intercept formData on submission, for validation of required input
export const getFormDataOnSubmit = (e) => {
  console.log(e);
  let elements = Array.from(e.target.elements);
  let formData = elements
    .filter((element) => element.attributes["name"])
    .reduce((dataArr, element, index, arr) => {
      const name = element.attributes["name"].value;
      const value = element.value;
      const hasMissingValue = element.value === "";
      const isDuplicate =
        index - 1 >= 0
          ? arr[index - 1].attributes["name"].value === name
          : false;
      if (!isDuplicate) {
        dataArr = [
          {
            name,
            value,
            hasMissingValue,
          },
          ...dataArr,
        ];
      }
      return dataArr;
    }, []);
  return formData;
};

