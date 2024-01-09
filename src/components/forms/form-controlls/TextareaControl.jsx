import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Textarea } from "../../ui/Textarea";
import { validate, getErrMsg, isInvalidInput } from "../../../io/validate";

export const TextareaControl = ({
  label,
  inputName,
  defaultValue,
  isRequired,
  categoryIds,
  errors,
  setErrors,
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalidInput(errors, inputName)}
    >
      <FormLabel fontWeight="bolder">{label}</FormLabel>
      <Textarea
        name={inputName}
        defaultValue={defaultValue}
        placeholder={`Please write a short ${inputName}...`}
        resize="none"
        overflowY="auto"
        onChange={(e) => validate(errors, e.target, categoryIds, setErrors)}
        onInvalid={(e) => e.preventDefault()}
      />
      <FormErrorMessage>{getErrMsg(errors, inputName)}</FormErrorMessage>
    </FormControl>
  );
};
