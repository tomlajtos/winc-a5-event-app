import {
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { validate, getErrMsg, isInvalidInput } from "../../../util/validate";
import { handleCheckboxChanges } from "../../../util/globalFunctions";

export const CheckboxGrControl = ({
  label,
  inputName,
  // defaultValue,
  isRequired,
  categories,
  categoryIds,
  setCategoryIds,
  errors,
  setErrors,
}) => {
  return (
    <FormControl
      as={"fieldset"}
      className="checkbox-group-control"
      isInvalid={isInvalidInput(errors, inputName)}
    >
      <Text as="legend" fontWeight="bolder" pb={1}>
        {label}
        {isRequired && (
          <Text as="span" pl={1} color="red.500">
            *
          </Text>
        )}
      </Text>
      <Stack
        spacing={[1, 5]}
        direction={["column", "row"]}
        className="checkbox-group"
      >
        {categories.map((category) => (
          <Checkbox
            id={category.id}
            key={category.id}
            name={inputName}
            isChecked={categoryIds.includes(category.id)}
            value={categoryIds}
            onChange={(e) => {
              handleCheckboxChanges(e, setCategoryIds);
              validate(errors, e.target, categoryIds, setErrors);
            }}
            onInvalid={(e) => e.preventDefault()}
          >
            {category.name}
          </Checkbox>
        ))}
      </Stack>
      <FormErrorMessage alignSelf="end" py={1}>
        {getErrMsg(errors, inputName)}
      </FormErrorMessage>
    </FormControl>
  );
};
