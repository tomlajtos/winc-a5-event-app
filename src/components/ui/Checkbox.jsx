import { Checkbox as CCheckbox } from "@chakra-ui/react";

export const Checkbox = (props) => {
  return (
    <CCheckbox
      colorScheme="purple"
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size="mlg"
      iconSize="12px"
      {...props}
    />
  );
};
