import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Search } from "../search/Search";
import { Navigation } from "./Navigation";
import { CategoryFilters } from "../CategoryFilters";
import { Logger } from "../../../../util/Logger";

export const DropdownMenu = ({ layout }) => {
  return (
    <Logger name="DropdownMenu" level={3}>
      <Menu
        closeOnSelect={false}
        gutter={12}
        isLazy={true}
        lazyBehavior="keepMounted"
      >
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
          {layout == "min" && (
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
    </Logger>
  );
};
