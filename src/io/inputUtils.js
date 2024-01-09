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
export const createCategoryIdsArr = (categories) => {
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
