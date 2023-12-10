import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as CInput,
} from "@chakra-ui/react";
import { Input } from "../../ui/Input";
import { validate, getErrMsg, isInvalidInput } from "../../../util/validate";

export const TextInputControl = ({
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
      <Input
        type="text"
        name={inputName}
        defaultValue={defaultValue}
        onChange={(e) => validate(errors, e.target, categoryIds, setErrors)}
        onInvalid={(e) => e.preventDefault()}
      />
      <FormErrorMessage>{getErrMsg(errors, inputName)}</FormErrorMessage>
    </FormControl>
  );
};
