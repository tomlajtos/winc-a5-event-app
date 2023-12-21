import React, { useContext } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { RootContext } from "../../../../context/RootContext";
import { Search } from "../search/Search";
import { CategoryFilters } from "../CategoryFilters";
// import { Logger } from "../../../../util/Logger";

export const DropdownMenu = () => {
  const { rootSize } = useContext(RootContext);

  return (
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
        {rootSize.width < 768 && (
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
        <Stack as="nav" spacing={0}>
          <MenuItem
            as={RRLink}
            to={"/"}
            px={6}
            fontSize={"xl"}
            fontWeight="thin"
            color="gray.900"
          >
            Events
          </MenuItem>

          <MenuItem
            as={RRLink}
            to={"/event/new"}
            px={6}
            fontSize={"xl"}
            fontWeight="thin"
            color="gray.900"
          >
            Create new
          </MenuItem>
        </Stack>
        <MenuDivider borderColor="gray.400" width="95%" mx="auto" />
        <CategoryFilters />
      </MenuList>
    </Menu>
  );
};
