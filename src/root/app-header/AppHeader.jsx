// Chakra-ui imports
import { Box, Flex } from "@chakra-ui/react";
// Component imports
import { AppTitle } from "./AppTitle";
import { HeaderMenu } from "./header-menu/HeaderMenu";

export const AppHeader = () => {
  return (
    <Box bg="gray.800" position="sticky" top="0px" left="0px" zIndex="sticky">
      <Flex
        className="app-header"
        as="header"
        width="100%"
        maxW="1280px"
        marginX="auto"
        height={["64px", "72px", "80px"]}
        pl={[2, 4, 6, null, 2]}
        pr={[2, 4, 6, null, 0]}
        direction="row"
        gap={2}
        align="center"
        justifyContent="space-between"
      >
        <AppTitle title="EventApp" />
        <HeaderMenu />
      </Flex>
    </Box>
  );
};
