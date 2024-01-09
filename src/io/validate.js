import { createIdArrOnChange } from "./inputUtils.js";
import { log } from "../util/log.js";

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

// TODO: add jsDOC comments
export const getErrMsg = (errors, name) => {
  if (errors.has(name)) {
    const msg = errors.get(name).message;
    return msg;
  }
};

// TODO: add jsDOC comments
export const isInvalidInput = (errors, name) => {
  return errors.has(name);
};

// TODO: add jsDOC comments
export const validate = (errorsMap, input, /*isChecked*/ idArr, setFn) => {
  console.log("%c validation START: ", "color:white;background:green", "\n");
  console.log("%c input_name: ", "color:navy;background:#90CDF4", input.name);

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

    if (createIdArrOnChange(idArr, input).length) {
      console.log("%cCheckbox group errors:", "color:#38A95A", eM, cboxErrors);
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
      console.log("%c valid // exp: true > ", "color:#48BB78", isValid);
      console.log("%cvalidation END:", "color:white;background:red");
      return;
    }
  } else {
    if (eM.has(iN)) {
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
  console.log("%cvalidation END:", "color:white;background:red");
};

export const validateAll = (idArr, setFn) => {
  let errors = new Map();
  const elements = Array.from(
    document.querySelectorAll("form")[0].elements
  ).filter((elem) => elem.attributes["name"]);

  elements.forEach((input) =>
    validate(errors, input, idArr, (errMap) => (errors = new Map([...errMap])))
  );

  setFn(errors);

  return { isInvalid: errors.size, errors };
};
