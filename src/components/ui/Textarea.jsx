// Chakra-ui imports
import { Textarea as ChakraTextarea } from "@chakra-ui/react";

export const Textarea = (props) => {
  return (
    <ChakraTextarea
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size="md"
      width="full"
      {...props}
    />
  );
};
