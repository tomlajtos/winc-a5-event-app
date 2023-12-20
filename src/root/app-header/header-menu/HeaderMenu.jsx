// React and RRouter imports
import React, { useContext } from "react";
// Chakra-ui imports
import { Flex } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../../../context/RootContext";
// Component imports
import { DropMenu } from "./navigation/DropMenu";
import { Navigation } from "./navigation/Navigation";
import { Search } from "./search/Search";

export const HeaderMenu = () => {
  const { rootSize } = useContext(RootContext);

  return (
    <Flex align="center" gap={6}>
      {rootSize.width > 767 && <Search justifySelf="center" order={1} />}
      {rootSize.width > 1023 && <Navigation />}
      {rootSize.width < 1024 && <DropMenu />}
    </Flex>
  );
};
