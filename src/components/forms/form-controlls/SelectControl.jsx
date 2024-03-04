import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { Select } from "../../ui/Select";
import { useStaticData } from "../../../context/StaticDataContext";

export const SelectControl = ({
  label,
  inputName,
  defaultValue,
  errors,
  showAsRequired,
}) => {
  const { users } = useStaticData();

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
      <Select
        name={inputName}
        placeholder="Select a user"
        borderColor={errors && errors[inputName] ? "red.500" : "gray.500"}
        defaultValue={defaultValue}
      >
        <option name="createdBy">{"Phantom of the EventApp"}</option>
        {users?.map((user) => (
          <option key={user.id} name="createdBy" value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
