// Array of input names that are not required, to make custom required validation coherent accross all inputs
// mainly is necessary because of custom checkbox group in `CheckboxGrControl` where setting the required attr on the checkbox
// would make all 3 required, however only one is required at minimum

const notRequiredInputs = ["image"];

// Helper functions
// TODO: Learn & add jsDOC comments
const generateErrorMessage = (inputName, missing) => {
  switch (inputName) {
    case "startTime": {
      return missing
        ? "Please type/select a start time!"
        : "Please type/select a valid start time!";
    }
    case "endTime": {
      return missing
        ? "Please type/select an end time!"
        : "Please type/select a valid end time!";
    }
    case "categoryIds": {
      return "Plese select at least one category";
    }
    case "createdBy": {
      return "Please select a user from the list!";
    }
    case "image": {
      return missing
        ? "Please provide an image URL!"
        : "Please provide a valid URL for the image!";
    }
    default: {
      return missing
        ? `Please type in an ${inputName}!`
        : `Please provide a valid ${inputName}!`;
    }
  }
};

// TODO: Learn & add jsDOC comments
const hasMissingValue = (formEntry) =>
  (!formEntry[1] || formEntry[1].length === 0) &&
  !notRequiredInputs.includes(formEntry[0]);

// separate validation for checkbox group 'categoryIds'
// if no selection >>> value is [] >>> entry won't be added to formData
// TODO: Learn & add jsDOC comments
const validateCategoryIds = (formData, error) => {
  if (!formData.categoryIds) {
    const entry = ["categoryIds", ""];
    generateErrorPropEntries(entry, hasMissingValue(entry), error);
    if (!error.errorType || !error.message) {
      generateErrorProps(error);
    }
  }
};

// separate validation for start time and endt time order
// called at the end of validateFormDataInAction
// TODO: Learn & add jsDOC comments
const validateStartToEndMismatch = (formData, error) => {
  const numericStartTime = Date.parse(formData.startTime);
  const numericEndTime = Date.parse(formData.endTime);

  if (!error.error?.startTime && !error.error?.endTime) {
    if (numericStartTime > numericEndTime) {
      error.error.startEndMismatch =
        "This app only works under normal* space-time conditions! (*in accordance with Einstein's General Relativity)";
      error.error["startTime"] = "Please set this before the end-time...";
      error.error["endTime"] = "...or this after the start-time. Thank you!";

      if (!error.errorType || !error.message) {
        generateErrorProps(error);
      }
    }
  }
};

// TODO: Learn & add jsDOC comments
const isInvalidText = (entryValue) => {
  const isEmpty = entryValue.length < 1;
  const isString = typeof entryValue === "string";
  const hasAlphaNumericChar = /\w+/gi.test(entryValue);
  return !isEmpty && (!isString || !hasAlphaNumericChar);
};

// TODO: Learn & add jsDOC comments
const isInvalidUrl = (entryValue) => {
  if (entryValue) {
    try {
      const url = new URL(entryValue);
      return url ? url.protocol === "http:" : url.protocol !== "https:";
    } catch (e) {
      return true;
    }
  }
  return false;
};

// TODO: Learn & add jsDOC comments
const isInvalidDateTime = (entryValue) => entryValue && !new Date(entryValue);

// TODO: Learn & add jsDOC comments
const hasInvalidValue = (formEntry) => {
  switch (formEntry[0]) {
    case "image": {
      return isInvalidUrl(formEntry[1]);
    }
    case "startTime":
    case "endTime": {
      return isInvalidDateTime(formEntry[1]);
    }
    default: {
      return isInvalidText(formEntry[1]);
    }
  }
};

// TODO: Learn & add jsDOC comments
const generateErrorPropEntries = (formEntry, missing, error) => {
  error.error[formEntry[0]] = generateErrorMessage(formEntry[0], missing);
};

// TODO: Learn & add jsDOC comments
const generateErrorProps = (error) => {
  error.errorType = "Input Error";
  error.message = "Please complete the required fields!";
};

// NOTE: (to self,mostly)
// previous method validated data during form-render while new approach validates data in router action,
// before updated/created event rendered
// previous method combined built in input validation methods with custom validation method (for checkbox group of event categories)
// ---
// new method:
// validates new/edit event form data in router `action(s)` after form submit, but before fetch
// The `action` returns an error object if missing/invalid input or HTTP error occurs

// TODO: Learn & add jsDOC comments
export const validateFormDataInAction = (formData, errorTemplate) => {
  const formEntries = Object.entries(formData);
  console.log("entries", formEntries);

  const error = { ...errorTemplate };
  error.error ? error.error : (error.error = {});

  validateCategoryIds(formData, error);

  formEntries.map((formEntry) => {
    const missingValue = hasMissingValue(formEntry);
    const invalidValue = hasInvalidValue(formEntry);

    if (missingValue) {
      generateErrorPropEntries(formEntry, missingValue, error);
      if (!error.errorType || !error.message) {
        generateErrorProps(error);
      }
    }

    if (invalidValue) {
      generateErrorPropEntries(formEntry, missingValue, error);
      if (!error.errorType || !error.message) {
        generateErrorProps(error);
      }
    }
  });
  validateStartToEndMismatch(formData, error);
  return error;
};

// no validation function for HTTP error,
// it is cought if response comes back with an error code in `action`
// helper function to generate an error object that is returned from the `action` in case of an error
// TODO: Learn & add jsDOC comments
export const generateHttpError = (error, response, formData) => {
  error.errorType = "HTTP Error";
  error.status = response.status;
  error.statusText = response.statusText;
  error.message = `${error.status} - ${error.statusText}`;
  error.errorComment = "This is not your fault. Please try again later.";
  error.data = formData;
  return error;
};
