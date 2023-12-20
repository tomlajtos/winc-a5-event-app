import React, { useContext } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { RootContext } from "../../../../context/RootContext";
import { Search } from "../search/Search";
import { Logger } from "../../../../util/Logger";

export const DropMenu = () => {
  const { categories, filters, setFilters, rootSize } = useContext(RootContext);

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
        <MenuDivider borderColor="gray.400" width="95%" mx="auto" />
        <MenuOptionGroup
          px={2}
          title="Categories"
          type="checkbox"
          name="categoryIds"
          defaultValue={filters.map((id) => id.toString())}
          fontSize="xl"
          fontWeight="thin"
        >
          {categories.map((category) => (
            <MenuItemOption
              key={category.id}
              id={`${category.id}`}
              name="categoryIds"
              value={`${category.id}`}
              fontSize="lg"
              backgroundColor="transparent"
              pl={6}
              onClick={() => {
                // TODO: move to utils, add jsDOC comments
                const handleFilterChange = (filters, inputValue, setFn) => {
                  let newFilters = [...filters];
                  console.log(
                    "%c onClick > filter > MenuItemOption",
                    "color:red;background:white",
                  );
                  console.log("newFilters before", newFilters);
                  if (!newFilters.includes(category.id)) {
                    newFilters = Array.from(
                      new Set([Number(inputValue), ...newFilters]),
                    );
                  } else {
                    newFilters = newFilters.filter(
                      (q) => q !== Number(inputValue),
                    );
                  }
                  console.log("newFilters after", newFilters);
                  setFn(newFilters);
                };
                handleFilterChange(filters, category.id, setFilters);
              }}
            >
              {category.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
