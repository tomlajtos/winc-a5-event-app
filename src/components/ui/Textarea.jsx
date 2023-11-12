import { Textarea as CTextarea } from "@chakra-ui/react";

export const Textarea = (props) => {
  return (
    <CTextarea
      borderColor="gray.500"
      focusBorderColor="purple.400"
      size={"md"}
      width="full"
      {...props}
    />
  );
};
