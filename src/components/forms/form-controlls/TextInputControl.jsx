// React and React Router imports
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export const TextInputControl = ({
  label,
  inputName,
  defaultValue,
  errors,
  showAsRequired,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight="bolder">
        {label}
        {showAsRequired && (
          <Text as="span" pl={1} color="red.500">
            *
          </Text>
        )}
      </FormLabel>

      <Input
        type="text"
        name={inputName}
        defaultValue={defaultValue}
        borderColor={errors && errors[inputName] ? "red.500" : "gray.500"}
      />
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
