import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useResizeData } from "../../../../context/ResizeContext";
import { Search } from "../search/Search";
import { Navigation } from "./Navigation";
import { CategoryFilters } from "../CategoryFilters";
import { Logger } from "../../../../util/Logger";

export const DropdownMenu = () => {
  const { menuLayout } = useResizeData();

  return (
    <Menu
      closeOnSelect={false}
      gutter={12}
      isLazy={true}
      lazyBehavior="keepMounted"
    >
      <Logger type="render" target="component" name="dropdown-menu" level={3} />
      <MenuButton
        as={IconButton}
        arai-label="Options"
        icon={<HamburgerIcon />}
        variant="solid"
      />
      <MenuList
        py={4}
        direction={["column", "row"]}
        minWidth={"350px"}
        alignItems="center"
        spacing={0}
        backgroundColor="whiteAlpha.900"
        color="gray.900"
        border="none"
      >
        {menuLayout == "min" && (
          <Search
            props={{
              width: "90%",
              mx: "auto",
              pb: 3,
            }}
            inputProps={{
              borderColor: "gray.600",
              backgroundColor: "white",
              textColor: "gray.900",
            }}
          />
        )}
        <Navigation />
        <MenuDivider borderColor="gray.400" width="95%" mx="auto" />
        <CategoryFilters />
      </MenuList>
    </Menu>
  );
};
