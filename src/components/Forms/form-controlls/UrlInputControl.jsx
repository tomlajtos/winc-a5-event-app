import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { validate, getErrMsg, isInvalidInput } from "../../../util/validate";

export const UrlInputControl = ({
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
        type="url"
        name={inputName}
        defaultValue={defaultValue}
        placeholder="https://eventimagesource.com/eventimage"
        onChange={(e) => validate(errors, e.target, categoryIds, setErrors)}
        onInvalid={(e) => e.preventDefault()}
      />
      <FormErrorMessage>{getErrMsg(errors, inputName)}</FormErrorMessage>
    </FormControl>
  );
};
