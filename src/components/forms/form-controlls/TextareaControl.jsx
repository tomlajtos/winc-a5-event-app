// React and React Router imports
import { FormControl, FormLabel, Text } from "@chakra-ui/react";
// Component imports
import { Textarea } from "../../ui/Textarea";

export const TextareaControl = ({
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

      <Textarea
        name={inputName}
        defaultValue={defaultValue}
        placeholder={`Please write a short ${inputName}...`}
        borderColor={errors && errors[inputName] ? "red.500" : "gray.500"}
        resize="none"
        overflowY="auto"
      />
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
