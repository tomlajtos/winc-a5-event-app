import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Text,
} from "@chakra-ui/react";

export const HackyCheckboxGrControl = ({ error, requiredInput }) => {
  const { categories } = useRouteLoaderData("root");
  const event = useRouteLoaderData("event");
  const [value, setValue] = useState(event.categoryIds.map((id) => `${id}`));
  console.log(value);

  return (
    <FormControl as="fieldset" name="categoryIds">
      <FormLabel as="legend" fontWeight="bolder" pb={1}>
        Categories
        {requiredInput && (
          <Text as="span" pl={1} color="red.500">
            *
          </Text>
        )}
      </FormLabel>
      <CheckboxGroup
        colorScheme="purple"
        defaultValue={value}
        name="categoryIds"
        onChange={(e) => setValue(e.length > 1 ? e.sort((a, b) => a - b) : e)}
        value={value}
      >
        <Stack direction="row" spacing={[4, 4]}>
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              name="categoryIds"
              value={`${category.id}`}
              borderColor="gray.500"
              focusBorderColor="purple.400"
              size="mlg"
              iconSize="12px"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      {/**
       * !!! HACKY AF SOLUTION to submit checkbox group data:
       * Although it is hacky, it is still the simplest solution that utilises chackra ui checkbox group
       * The below hidden checkbox serves as an emiter for the checkbox gr value, and it is always in a `checked` state.
       * I was not able to find a solution to submit data from chakra checkbox group without yet another library like 'react-form-hook',
       * but it is possible that I'm overlooking an obvious solution for this...
       * There is another solution in CheckboxGrControl component that works but it is more complex and uses a custom group of checkbox with
       * custom state management.
       * I am not sure wether this solution raises any concerns, but it certainly works and it is simple, so it saves a few lines of code.
       */}
      <Checkbox
        display="none"
        name="categoryIds"
        value={value}
        isChecked={true}
      />
      {error?.categoryIds && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
