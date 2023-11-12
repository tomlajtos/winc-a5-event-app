import { Input as CInput } from "@chakra-ui/react";

export const Input = (props) => {
  return (
    <CInput
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size={["sm", "md"]}
      rounded={["md", "lg"]}
      width="full"
      {...props}
    />
  );
};
