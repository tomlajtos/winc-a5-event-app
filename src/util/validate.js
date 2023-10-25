const formatInputName = (iN) => {
  switch (iN) {
    case "startTime": {
      return "start time";
    }
    case "endTime": {
      return "end time";
    }
    case "categoryIds": {
      return "category ";
    }
    default: {
      return iN;
    }
  }
};

const setErrMsg = (errors, iN) => {
  const missingErrMsg = `Please provide an ${formatInputName(iN)}.`;
  const invalidErrMsg = `Please provide a valid value for ${formatInputName(
    iN
  )}`;
  return errors.includes("valueMissing") ? missingErrMsg : invalidErrMsg;
};

const getErrorsFromValidState = (vS) => {
  const errors = [];
  for (let key in vS) {
    if (vS[key] && key !== "valid") {
      errors.push(key);
    }
    // } else if (vS[key]) {
    //   isValid = true;
    // }
  }
  return errors;
};

// TODO: tidy up, checkbox validation needs fixing too

export const validate = (errorsMap, input, setFn) => {
  // FIX: set correct e.target.required value based on checked value
  console.log("%cR", "color:red", input.required);

  const vS = input.validity; // [v]alidity[S]tate
  // LOG:
  console.log("%cvalidation START:", "color:green", "\n");
  console.log(
    "state\n",
    vS,
    "\ninput:\n",
    input.name,
    "\nvalue\n",
    input.value
  );
  const iN = input.name; //[i]nput[N]ame
  const eM = new Map(errorsMap); // [e]rrors[M]ap
  let isRequired = iN === "image" ? false : true;
  const errors = getErrorsFromValidState(vS);
  let isValid = !errors.length;
  // LOG:
  console.log("in validate, initial:", eM);

  // LOG:
  console.log("errors:", errors);
  console.log("valid:", isValid);

  if (isValid && eM.has(iN)) {
    // NOTE: this might not be necessary
    // LOG:
    console.log(
      iN,
      "valid",
      isValid,
      "%cremoving from errorsMap",
      "color:orange"
    );
    eM.delete(iN);
  } else if (isValid) {
    // LOG:
    console.log("valid", isValid);
    return;
  } else if (!isValid && eM.has(iN)) {
    // LOG:
    console.log(
      "valid",
      isValid,
      iN,
      "%calready in inputErrors",
      "color:orange"
    );
    // if (iN === "categoryIds" && input.value.length > 0) {
    // LOG:
    // console.log(iN, ">", input.value);
    // eM.delete(iN);
    // } else if (
    if (
      (eM.get(iN).errors.length === errors.length,
      eM.get(iN).every((err) => errors.includes(err)))
    ) {
      // LOG:
      console.log(eM.get(iN).errors, "===", errors);
      console.log(
        "%cinput errors still the same, nothing to change",
        "color:orange"
      );
      setFn(eM);
      return;
    } else {
      // LOG:
      console.log("valid", isValid, "%cerrors have changed", "color:orange");
      eM.set(iN, {
        errors,
        message: setErrMsg(errors, iN),
        required: isRequired,
      });
    }
  } else if (!isValid) {
    if (iN === "categoryIds" && input.value.length > 0) {
      // LOG:
      console.log(iN, ">", input.value);
      eM.delete(iN);
      setFn(eM);
      input.required = false;
      return;
    } // LOG:
    console.log("valid", isValid, "%csetting up inputErrors", "color:orange");
    eM.set(iN, {
      errors,
      message: setErrMsg(errors, iN),
      required: isRequired,
    });
  }
  // LOG:
  console.log("%csetting new inputErrors state to", "color:orange", eM);
  setFn(eM);
  console.log("%cvalidation END:", "color:red");
};

// NOTE: different validation approach based on intercepting fomdata on form-submit event
// INCOMPLETE > not in use

// FOR the Form component:
//
// onSubmit={(e) => {
//   const checkFormResult = checkFormDataOnSubimt(e);
//   console.log("on submit outer:", checkFormResult);
//   if (checkFormResult.isDataComplete) {
//     onClose();
//   } else if (checkFormResult.isRequiredOk) {
//     onClose();
//   } else {
//     e.preventDefault();
//     checkFormResult();
//     // setInputError();
//   }
// }}

// Validation functions:
//
// functin to intercept formData on submission, for validation of required input
const validateUrl = (url) => {
  try {
    url = new URL(url);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (e) {
    return false;
  }
};

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

// function
export const checkFormDataOnSubimt = (e) => {
  const formDataArr = getFormDataOnSubmit(e);
  console.log("formDataArr", formDataArr);
  const isInvalidInput = {
    title: false,
    startTime: false,
    endTime: false,
    description: false,
    categoryIds: false,
    image: false,
  };

  const isMissingInput = {
    title: false,
    startTime: false,
    endTime: false,
    description: false,
    categoryIds: false,
    image: false,
  };

  const missingDataArr = formDataArr.filter((elem) => !elem.value);
  console.log("missinDataArr", missingDataArr);

  const invalidDataArr = formDataArr.filter(
    (elem) =>
      elem.name.toLowerCase().includes("time") ||
      elem.name.toLowerCase().includes("image")
  );
  console.log("invalidDataArr", invalidDataArr);

  const missingRequiredData = formDataArr.filter(
    (elem) => elem.name !== "image" && !elem.value
  );
  console.log("missingRequiredData", missingRequiredData);

  const invalidRequiredData = invalidDataArr.filter(
    (elem) => elem.name !== "image" && !elem.value
  );

  missingDataArr.map(
    (elem) => (isInvalidInput[elem.name] = elem.hasMissingValue)
  );
  // console.log(isInvalidInput);

  if (missingRequiredData.length === 0 && missingDataArr.length > 0) {
    return {
      isRequiredOk: true,
      isDataComplete: false,
      dataWithError: missingDataArr,
      invalid: isInvalidInput,
    };
  } else if (missingRequiredData.length > 0) {
    return {
      isRequiredOk: false,
      isDataComplete: false,
      dataWithError: missingDataArr,
      invalid: isInvalidInput,
    };
  } else {
    return {
      isRequiredOk: true,
      isDataComplete: true,
      dataWithError: [],
      invalid: isInvalidInput,
    };
  }
};
