import { useState } from "react";
import { FormControl, Stack, Text } from "@chakra-ui/react";
import { Checkbox } from "../../ui/Checkbox";
import { useStaticData } from "../../../context/StaticDataContext";
import { handleCheckboxGroupChange } from "../../../io/inputUtils";

export const CheckboxGrControl = ({
  grTitle,
  inputName,
  showAsRequired,
  defaultValue,
  errors,
}) => {
  const { categories } = useStaticData();
  const [groupValue, setGroupValue] = useState(defaultValue);

  return (
    <FormControl as={"fieldset"} className="checkbox-group-control">
      <Text as="legend" fontWeight="bolder" pb={1}>
        {grTitle}
        {showAsRequired && (
          <Text as="span" pl={1} color="red.500">
            *
          </Text>
        )}
      </Text>
      <Stack
        spacing={[1, 4]}
        direction={["column", "row"]}
        className="checkbox-group"
      >
        {categories.map((category, index) => (
          <Checkbox
            key={`${index}.${category.id}`}
            id={category.id}
            name={inputName}
            isChecked={groupValue.includes(`${category.id}`)}
            value={groupValue}
            borderColor={errors && errors[inputName] ? "red.500" : "gray.500"}
            onChange={(e) => {
              handleCheckboxGroupChange(groupValue, e.target.id, setGroupValue);
            }}
          >
            {category.name}
          </Checkbox>
        ))}
      </Stack>
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
