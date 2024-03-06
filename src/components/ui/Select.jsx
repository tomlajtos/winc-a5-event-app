// Chakra-ui imports
import { Select as ChakraSelect } from "@chakra-ui/react";

export const Select = (props) => {
  return (
    <ChakraSelect
      borderColor="gray.500"
      focusBorderColor="purple.400"
      width="full"
      size={["sm", "md"]}
      rounded={["md", "lg"]}
      {...props}
    />
  );
};
