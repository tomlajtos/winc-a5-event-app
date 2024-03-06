// Chakra-ui imports
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";

export const Checkbox = (props) => {
  return (
    <ChakraCheckbox
      colorScheme="purple"
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size={["lg", "mlg"]}
      iconSize="12px"
      {...props}
    />
  );
};
