// React and RRouter imports
import React, { useContext } from "react";
import { Outlet, useLoaderData, Link as RRLink } from "react-router-dom";
// Chakra-ui imports
import { Flex, Heading } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
import { Navigation } from "./navigation/Navigation";
import { NavMenu } from "./navigation/NavMenu";
import { Search } from "./Search";

import { log } from "../util/log";

export const Header = () => {
  const { rootSize } = useContext(RootContext);
  log.comp("Header", "purple", "white");
  return (
    <Flex
      as="header"
      width="full"
      height="95px"
      pl={[2, 4, 6, 8, 12]}
      pr={[4, 4, 6, 8, 10]}
      py={6}
      direction={["column", null, "row"]}
      gap={2}
      background="gray.800"
      minH={"6vh"}
    >
      <Flex
        direction={["row-reverse", null, "row"]}
        flex={1}
        align="center"
        justifySelf="start"
        gap={6}
      >
        {rootSize.width < 1024 && <NavMenu />}
        <RRLink to="/">
          <Heading
            as="h1"
            // NOTE: if lineH. is not def, Chakra-ui will change it on the sm/md breakpoint
            lineHeight={1}
            fontSize={["2.5rem", null, "3rem"]}
            width="fit-content"
            color="purple.200"
            fontWeight="light"
            fontFamily="mono"
            flex={1}
          >
            EventApp
          </Heading>
        </RRLink>
      </Flex>
      {rootSize.width > 767 && <Search justifySelf="center" />}
      {rootSize.width > 1023 && <Navigation />}
    </Flex>
  );
};
