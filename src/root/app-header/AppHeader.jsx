// React and RRouter imports
import React from "react";
// Chakra-ui imports
import { Flex } from "@chakra-ui/react";
// Context imports
// Component imports
import { AppTitle } from "./AppTitle";
import { HeaderMenu } from "./header-menu/HeaderMenu";

import { log } from "../../util/Logger";

export const AppHeader = () => {
  log.comp("Header", "purple", "white");
  return (
    <Flex
      as="header"
      width="full"
      height="95px"
      pl={[4, null, 6, 10, 12]}
      pr={[4, null, 6, 8, 10]}
      py={6}
      direction="row"
      gap={2}
      background="gray.800"
      align="center"
      justifyContent="space-between"
    >
      <AppTitle title="EventApp" />
      <HeaderMenu />
    </Flex>
  );
};
