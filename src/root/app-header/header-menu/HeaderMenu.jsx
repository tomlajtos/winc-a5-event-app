// React and RRouter imports
// Chakra-ui imports
import { Flex } from "@chakra-ui/react";
// Context imports
import { useResizeData } from "../../../context/ResizeContext";
// Component imports
import { DropdownMenu } from "./dropdown-menu/DropdownMenu";
import { MenuBar } from "./menu-bar/MenuBar";
import { Search } from "./search/Search";
// Util import
import { Logger } from "../../../util/Logger";

export const HeaderMenu = () => {
  const { menuLayout } = useResizeData();
  return (
    <Flex align="center" gap={6}>
      <Logger type="render" target="component" name="Header-Menu" level={2} />
      {menuLayout !== "min" && <Search justifySelf="center" order={1} />}
      {menuLayout === "full" && <MenuBar />}
      {menuLayout !== "full" && <DropdownMenu />}
    </Flex>
  );
};
