import { Checkbox as CCheckbox } from "@chakra-ui/react";

export const Checkbox = (props) => {
  return (
    <CCheckbox
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size={"lg"}
      colorScheme="purple"
      {...props}
    />
  );
};
