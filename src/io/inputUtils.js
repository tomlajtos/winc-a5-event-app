// Categories related checkbox handler and support functions
// TODO: add jsDOC comments
export const createCategoryIdsArr = (categories) => {
  return categories.map((category) => Number(category.id));
};

// TODO: learn & add jsDOC comments
// superseded version of checkbox change handler for checkbox groups
export const handleCheckboxChanges = (e, setFn) => {
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
  setFn(value);
};

// TODO: learn & add jsDOC comments
// new current version of checkbox change handler for checkbox groups
export const handleCheckboxGroupChange = (grValue, inputValue, setFn) => {
  let newGrValue = [...grValue];
  if (!newGrValue.includes(inputValue)) {
    newGrValue = Array.from(new Set([inputValue, ...newGrValue]));
  } else {
    newGrValue = newGrValue.filter((q) => q !== inputValue);
  }
  setFn(newGrValue);
  console.log("new final", newGrValue);
};

// TODO: add jsDOC comments
export const handleFilterChange = (filters, inputValue, setFn) => {
  let newFilters = [...filters];
  if (!newFilters.includes(inputValue)) {
    newFilters = Array.from(new Set([Number(inputValue), ...newFilters]));
  } else {
    newFilters = newFilters.filter((q) => q !== Number(inputValue));
  }
  setFn(newFilters);
};
