import { useState } from "react";
import { useStaticData } from "../../../context/StaticDataContext";
import {
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Checkbox } from "../../ui/Checkbox";

export const HackyCheckboxGrControl = ({
  grTitle,
  showAsRequired,
  inputName,
  defaultValue,
  errors,
}) => {
  const [value, setValue] = useState(defaultValue);
  const { categories } = useStaticData();

  return (
    <FormControl as="fieldset" name={inputName}>
      <FormLabel as="legend" fontWeight="bolder" pb={1}>
        {grTitle}
        {showAsRequired && (
          <Text as="span" pl={1} color="red.500">
            *
          </Text>
        )}
      </FormLabel>
      <CheckboxGroup
        defaultValue={value}
        name={inputName}
        onChange={(e) => setValue(e)}
        value={value}
      >
        <Stack direction="row" spacing={[4, 4]}>
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              id={category.id}
              name={inputName}
              value={`${category.id}`}
              borderColor="gray.500"
              focusBorderColor="purple.400"
              iconSize="12px"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      {/**
       * !!! HACKY AF SOLUTION to submit checkbox group data:
       * Although it is hacky, it is still a simple solution that utilises chackra ui checkbox group
       * The below hidden checkbox serves as an emitter for the checkbox gr value, and it is always in a `checked` state.
       * I was not able to find a solution to submit data from within chakra checkbox group without yet another library like 'react-form-hook',
       * but it is possible that I'm overlooking an obvious solution for this...
       * There is another, maybe less confusing, solution in CheckboxGrControl component.
       * I am not sure wether this solution raises any concerns, but it certainly works and it is simple, so it saves a few lines of code, maybe :).
       */}
      <Checkbox
        display="none"
        id="group-values"
        name={inputName}
        value={value}
        isChecked={true}
      />
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
