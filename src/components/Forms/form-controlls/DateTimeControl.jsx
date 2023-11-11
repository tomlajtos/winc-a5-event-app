import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import { validate, getErrMsg, isInvalidInput } from "../../../util/validate";

export const DateTimeControl = ({
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
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      isRequired={isRequired}
      isInvalid={isInvalidInput(errors, inputName)}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <FormLabel margin={0} px={2}>
          {label}
        </FormLabel>
        <Input
          type="datetime-local"
          name={inputName}
          defaultValue={defaultValue}
          justifySelf="stretch"
          onChange={(e) => validate(errors, e.target, categoryIds, setErrors)}
          onInvalid={(e) => e.preventDefault()}
        />
      </Stack>
      <FormErrorMessage alignSelf="end" py={1}>
        {getErrMsg(errors, inputName)}
      </FormErrorMessage>
    </FormControl>
  );
};
