import { Select as CSelect } from "@chakra-ui/react";

export const Select = (props) => {
  return (
    <CSelect
      borderColor="gray.500"
      focusBorderColor="purple.400"
      width="full"
      size={["sm", "md"]}
      rounded={["md", "lg"]}
      {...props}
    />
  );
};
