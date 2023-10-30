import { createIdArrOnChange } from "./globalFunctions";

// TODO: add jsDOC comments
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

// TODO: add jsDOC comments
const setErrMsg = (errors, iN) => {
  const missingErrMsg = `Event ${formatInputName(iN)} is required.`;
  const invalidErrMsg = `Please provide a valid value for ${formatInputName(
    iN
  )}`;
  return errors.includes("valueMissing") && errors.length === 1
    ? missingErrMsg
    : invalidErrMsg;
};

// TODO: add jsDOC comments
const getErrorsFromValidState = (vS) => {
  const errors = [];
  for (let key in vS) {
    if (vS[key] && key !== "valid") {
      errors.push(key);
    }
  }
  return errors;
};

// // TODO: add jsDOC comments
// const createIdArrOnChange = (idArr, input) => {
//   let localIds = [...idArr];
//   console.log("%c idArr:", "background:orange;color:navy", localIds);
//   input.checked
//     ? (localIds = Array.from(new Set([Number(input.id), ...localIds])))
//     : (localIds = localIds
//         .filter((id) => id !== Number(input.id))
//         .map((id) => Number(id))
//         .sort((a, b) => a - b));
//   console.log("%c idArr:", "background:orange;color:navy", localIds);
//   return localIds;
// };

// TODO: add jsDOC comments
export const validate = (errorsMap, input, /*isChecked*/ idArr, setFn) => {
  console.log("%c validation START: ", "color:purple;background:#90CDF4", "\n");

  const vS = input.validity; // [v]alidity[S]tate
  const iN = input.name; //[i]nput[N]ame
  const eM = new Map(errorsMap); // [e]rrors[M]ap
  let isRequired = input.required;
  const errors = getErrorsFromValidState(vS);
  const cboxErrors = [];
  let isValid = !errors.length;

  // check if input is a checkbox and validate that first
  if (iN === "categoryIds") {
    console.log(
      "%c VALIDATING CHEKBOX",
      "color:yellow; font-weight:bold;background:blue"
    );

    // const localIsChecked = [...isChecked];
    // temp. hacky solution, to see how to get rid of isChecked in validation
    // const localIsChecked = [false, false, false];
    // idArr.map((elem) => (localIsChecked[Number(elem) - 1] = true));
    // localIsChecked[input.id - 1] = input.checked;

    // if (localIsChecked.includes(true)) {
    if (createIdArrOnChange(idArr, input).length) {
      console.log("%cCheckbox group ", "color:#38A95A", eM, cboxErrors);
      eM.has(iN)
        ? eM.delete(iN)
        : console.log("%cCheckbox group input is valid", "color:#38A169");

      setFn(eM);
    } else {
      cboxErrors.push("valueMissing");

      eM.set(iN, {
        errors: cboxErrors,
        message: setErrMsg(cboxErrors, iN),
        required: true,
      });

      setFn(eM);
    }
    console.log("%c validation END:", "color:white;background:red");
    return;
  }

  if (isValid) {
    if (eM.has(iN)) {
      console.log(
        `%c ${iN} valid? | in errors // exp: true > `,
        "color:#48BB78",
        isValid
      );
      console.log(
        "%c Removing from errorsMap",
        "color:orange;font-weight:bold"
      );
      eM.delete(iN);
    } else if (isValid) {
      // LOG:
      console.log("%c valid // exp: true > ", "color:#48BB78", isValid);
      console.log("%cvalidation END:", "color:white;background:red");
      return;
    }
  } else {
    if (eM.has(iN)) {
      // LOG:
      console.warn(
        `%c${iN} valid? | in errors // exp: false > `,
        "color:#FC8181",
        isValid,
        "| already in errorsMap"
      );
      if (
        eM.get(iN).errors.length === errors.length &&
        eM.get(iN).errors.every((err) => errors.includes(err))
      ) {
        console.warn("same error, input:", iN, eM.get(iN));
        setFn(eM);
        console.log("%cvalidation END:", "color:white;background:red");
        return;
      } else {
        // LOG:
        console.warn(
          "input valid? | in errors | new error type // exp: false >",
          isValid,
          "errors have changed"
        );
        eM.set(iN, {
          errors,
          message: setErrMsg(errors, iN),
          required: isRequired,
        });
      }
    } else {
      // LOG:
      console.warn(
        "input valid? | not in errors // exp: false >",
        isValid,
        "setting up inputErrors"
      );
      eM.set(iN, {
        errors,
        message: setErrMsg(errors, iN),
        required: isRequired,
      });
    }
  }
  console.log("%csetting new inputErrors state to", "color:pink", eM);
  setFn(eM);
  console.log("%cvalidation END:", "color:white;background:purple");
};

// NOTE: different validation approach based on intercepting fomdata on form-submit event
// INCOMPLETE > not in use
//
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
// const validateUrl = (url) => {
//   try {
//     url = new URL(url);
//     return url.protocol === "http:" || url.protocol === "https:";
//   } catch (e) {
//     return false;
//   }
// };
//
// export const getFormDataOnSubmit = (e) => {
//   console.log(e);
//   let elements = Array.from(e.target.elements);
//
//   let formData = elements
//     .filter((element) => element.attributes["name"])
//     .reduce((dataArr, element, index, arr) => {
//       const name = element.attributes["name"].value;
//       const value = element.value;
//       const hasMissingValue = element.value === "";
//       const isDuplicate =
//         index - 1 >= 0
//           ? arr[index - 1].attributes["name"].value === name
//           : false;
//       if (!isDuplicate) {
//         dataArr = [
//           {
//             name,
//             value,
//             hasMissingValue,
//           },
//           ...dataArr,
//         ];
//       }
//       return dataArr;
//     }, []);
//   return formData;
// };
//
// // function
// export const checkFormDataOnSubimt = (e) => {
//   const formDataArr = getFormDataOnSubmit(e);
//   console.log("formDataArr", formDataArr);
//   const isInvalidInput = {
//     title: false,
//     startTime: false,
//     endTime: false,
//     description: false,
//     categoryIds: false,
//     image: false,
//   };
//
//   const isMissingInput = {
//     title: false,
//     startTime: false,
//     endTime: false,
//     description: false,
//     categoryIds: false,
//     image: false,
//   };
//
//   const missingDataArr = formDataArr.filter((elem) => !elem.value);
//   console.log("missinDataArr", missingDataArr);
//
//   const invalidDataArr = formDataArr.filter(
//     (elem) =>
//       elem.name.toLowerCase().includes("time") ||
//       elem.name.toLowerCase().includes("image")
//   );
//   console.log("invalidDataArr", invalidDataArr);
//
//   const missingRequiredData = formDataArr.filter(
//     (elem) => elem.name !== "image" && !elem.value
//   );
//   console.log("missingRequiredData", missingRequiredData);
//
//   const invalidRequiredData = invalidDataArr.filter(
//     (elem) => elem.name !== "image" && !elem.value
//   );
//
//   missingDataArr.map(
//     (elem) => (isInvalidInput[elem.name] = elem.hasMissingValue)
//   );
//   // console.log(isInvalidInput);
//
//   if (missingRequiredData.length === 0 && missingDataArr.length > 0) {
//     return {
//       isRequiredOk: true,
//       isDataComplete: false,
//       dataWithError: missingDataArr,
//       invalid: isInvalidInput,
//     };
//   } else if (missingRequiredData.length > 0) {
//     return {
//       isRequiredOk: false,
//       isDataComplete: false,
//       dataWithError: missingDataArr,
//       invalid: isInvalidInput,
//     };
//   } else {
//     return {
//       isRequiredOk: true,
//       isDataComplete: true,
//       dataWithError: [],
//       invalid: isInvalidInput,
//     };
//   }
// };
