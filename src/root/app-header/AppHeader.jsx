// React and RRouter imports
import React from "react";
// Chakra-ui imports
import { Box, Flex } from "@chakra-ui/react";
// Context imports
// Component imports
import { AppTitle } from "./AppTitle";
import { HeaderMenu } from "./header-menu/HeaderMenu";

import { log } from "../../util/Logger";

export const AppHeader = () => {
  log.comp("Header", "purple", "white");
  return (
    <Box bg="gray.800" position="sticky" top="0px" left="0px" zIndex="sticky">
      <Flex
        as="header"
        width="100%"
        maxW="1280px"
        marginX="auto"
        height="95px"
        pl={[4, 6, 8, 10, 4]}
        pr={[4, 6, 8, 8, 2]}
        py={6}
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
