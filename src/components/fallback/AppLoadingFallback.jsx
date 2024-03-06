// Chakra-ui imports
import { Box, Center } from "@chakra-ui/react";

export const AppLoadingFallback = () => {
  return (
    <Center
      minW="300px"
      flex="1"
      fontSize="6xl"
      align="center"
      bg="purple.900"
      color="teal.100"
    >
      <Box>{"Loading..."}</Box>
    </Center>
  );
};
