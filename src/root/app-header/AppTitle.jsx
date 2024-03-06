// Chakra-ui imports
import { Heading } from "@chakra-ui/react";

export const AppTitle = ({ title }) => {
  return (
    <Heading
      as="h1"
      // NOTE: if lineH. is not defined, Chakra-ui will change it on the sm/md breakpoint > causing shift-glitch
      fontSize={["2rem", "2.5rem", "3rem"]}
      lineHeight="100%"
      width="fit-content"
      color="purple.200"
      fontWeight="light"
      fontFamily="mono"
      flex={1}
      verticalAlign="top"
    >
      {title}
    </Heading>
  );
};
