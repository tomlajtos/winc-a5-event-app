// React and RRouter imports
import React, { useContext } from "react";
// Chakra-ui imports
import { Flex } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../../../context/RootContext";
// Component imports
import { DropdownMenu } from "./dropdown-menu/DropdownMenu";
import { MenuBar } from "./menu-bar/MenuBar";
import { Search } from "./search/Search";

export const HeaderMenu = () => {
  const { rootWidth } = useContext(RootContext);

  return (
    <Flex align="center" gap={6}>
      {rootWidth > 767 && <Search justifySelf="center" order={1} />}
      {rootWidth > 1023 && <MenuBar />}
      {rootWidth < 1024 && <DropdownMenu />}
    </Flex>
  );
};
