// Array of input names that are not required, to make custom required validation coherent accross all inputs
// mainly is necessary because of custom checkbox group in `CheckboxGrControl` where setting the required attr on the checkbox
// would make all 3 required, however only one is required at minimum
const notRequired = ["image"];

// Helper functions
// TODO: Learn & add jsDOC comments
const formatInputName = (inputName) => {
  let formattedInputName;
  switch (inputName) {
    case "startTime": {
      formattedInputName = "start time";
      break;
    }
    case "endTime": {
      formattedInputName = "end time";
      break;
    }
    case "createdBy": {
      formattedInputName = "user";
      break;
    }

    case "categoryIds": {
      formattedInputName = "category";
      break;
    }
    case "image": {
      formattedInputName = "image URL";
      break;
    }
    default: {
      formattedInputName = inputName;
    }
  }
  return formattedInputName;
};

// TODO: Learn & add jsDOC comments
const checkForMissingValue = (formEntry) =>
  (!formEntry[1] || formEntry[1].length === 0) &&
  !notRequired.includes(formEntry[0]);

// separate validation for checkbox group 'categoryIds'
// if no selection >>> value is [] >>> entry won't be added to formData
// TODO: Learn & add jsDOC comments
const checkForMissingCategoryIds = (formData, error) => {
  if (!formData.categoryIds) {
    generateErrorProps(error);
    generateErrorsPropEntries(["categoryIds"], error, "missing");
    // }
  }
};

// separate validation for start time and endt time order
// called at the end of validateFormDataInAction
// TODO: Learn & add jsDOC comments
const checkStartToEndMismatch = (formData, error) => {
  const numericStartTime = Date.parse(formData.startTime);
  const numericEndTime = Date.parse(formData.endTime);

  if (!error.errors?.startTime && !error.errors?.endTime) {
    if (numericStartTime > numericEndTime) {
      generateErrorProps(error);
      error.errors.startEndMismatch =
        "This app only works under normal* space-time conditions! (*in accordance with Einstein's General Relativity)";
      error.errors["startTime"] = "Please set this before the end-time...";
      error.errors["endTime"] = "...or this after the start-time. Thank you!";

      generateErrorProps(error);
    }
  }
};

// TODO: Learn & add jsDOC comments
const validateText = (formEntry) => {
  const name = formatInputName(formEntry[0]);
  const value = formEntry[1];
  const isEmpty = !value;
  const isString = typeof value === "string";
  const hasAlphaNumericChar = /\w+/gi.test(value);

  if (!isEmpty && (!isString || !hasAlphaNumericChar)) {
    return { isValid: false, errorPrompt: `Please provide a valid: ${name}` };
  }
  return { isValid: true };
};

// TODO: Learn & add jsDOC comments
const validateUrl = (formEntry) => {
  const [name, value] = formEntry;
  const formattedName = formatInputName(name);
  const errorPrompt = `Please provide a valid ${formattedName}`;

  if (value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:"
        ? { isValid: true }
        : { isValid: false, errorPrompt: errorPrompt };
    } catch (e) {
      return { isValid: false, errorPrompt: errorPrompt };
    }
  }
  // has no value, double check if it is not required
  // if it is not required it will pass through missing value check
  if (notRequired.includes(name)) {
    return { isValid: true };
  }
};

// TODO: Learn & add jsDOC comments
const validateDateTime = (formEntry, formIntent) => {
  const [name, value] = formEntry;
  const formattedName = formatInputName(name);
  const isDateString = new Date(value);
  const errorPrompt = `Please set a future date and time for ${formattedName}`;

  if (isDateString) {
    const numericEntryValue = Date.parse(value);
    const numericCurrentDate = Number(Date.now());
    if (formIntent === "add") {
      // compare input with current date time, with 5min grace period
      return numericEntryValue < numericCurrentDate - 5 * 60 * 1000
        ? {
            isValid: false,
            errorPrompt: errorPrompt,
          }
        : { isValid: true };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorPrompt: errorPrompt,
  };
};

// TODO: Learn & add jsDOC comments
const validateValue = (formEntry, formIntent) => {
  // createdBy and categoryIds are only checked for missing value
  // since those are select and checkbox inputs
  switch (formEntry[0]) {
    case "image": {
      return validateUrl(formEntry);
    }
    case "startTime":
    case "endTime": {
      return validateDateTime(formEntry, formIntent);
    }
    case "title":
    case "location":
    case "description": {
      return validateText(formEntry);
    }
    default: {
      return { isValid: true };
    }
  }
};

// TODO: Learn & add jsDOC comments
const generateErrorsPropEntries = (
  formEntry,
  error,
  inputErrorType,
  validationResult,
) => {
  const errorProp = error.errors;
  const inputName = formEntry[0];
  const formattedInputName = formatInputName(inputName);
  const missingPromptKeyWord = ["createdBy", "categoryIds"].includes(inputName)
    ? "select"
    : "provide";

  if (inputErrorType === "missing") {
    errorProp[inputName] =
      `Please ${missingPromptKeyWord} a ${formattedInputName}`;
  }
  if (inputErrorType === "invalid") {
    errorProp[inputName] = validationResult.errorPrompt;
  }
};

// TODO: Learn & add jsDOC comments
const generateErrorProps = (error) => {
  if (error.errorType === "" || error.message === "") {
    error.errors ? error.errors : (error.errors = {});
    error.errorType = "Input Error";
    error.message = "Please complete the required fields!";
  }
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
// Main validation function:
export const validateFormDataInAction = (formData, errorTemplate) => {
  const formEntries = Object.entries(formData);
  const formIntent = formData.intent;
  const error = { ...errorTemplate };

  // validate separately not in formEntries if missing
  checkForMissingCategoryIds(formData, error);

  formEntries.map((formEntry) => {
    // categoryIds was already checked, intent is not a user input
    if (!["intent", "categoryIds"].includes(formEntry[0])) {
      const isMissingValue = checkForMissingValue(formEntry);

      if (isMissingValue) {
        generateErrorProps(error);
        generateErrorsPropEntries(formEntry, error, "missing");
        // return early if missing
        return;
      }

      // not missing >> validate
      const valueValidationResult = validateValue(formEntry, formIntent);
      if (valueValidationResult.isValid) {
        // return early if valid value
        return;
      }

      // not valid >> generate error
      generateErrorProps(error);
      generateErrorsPropEntries(
        formEntry,
        error,
        "invalid",
        valueValidationResult,
      );
    }
  });

  checkStartToEndMismatch(formData, error);

  return error;
};

// no validation function for HTTP error,
// it is cought if response comes back with an error code in `action`
// helper function to generate an error object that is returned from the `action` in case of an error
// TODO: Learn & add jsDOC comments
export const generateHttpError = (errorTemplate, response, formData) => {
  const error = { ...errorTemplate };
  error.errorType = "HTTP Error";
  error.status = response.status;
  error.statusText = response.statusText;
  error.message = `${error.status} - ${error.statusText}`;
  error.errorComment = "This is not your fault. Please try again later.";
  error.data = formData;
  return error;
};
