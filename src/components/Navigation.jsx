import React, { useContext } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Stack,
} from "@chakra-ui/react";

import { RootContext } from "../context/RootContext";

export const Navigation = () => {
  const { categories, filterQ, setFilterQ } = useContext(RootContext);

  return (
    <Stack
      as={"nav"}
      direction={["column", "row"]}
      py={0}
      px={2}
      minWidth={"350px"}
      alignItems="center"
      spacing={0}
    >
      <Button
        as={RRLink}
        to={"/"}
        py={2}
        px={6}
        rounded="full"
        fontSize={"xl"}
        fontWeight="thin"
        variant="ghost"
        color="gray.300"
        colorScheme="whiteAlpha"
      >
        Events
      </Button>

      <Button
        as={RRLink}
        to={"/event/new"}
        py={2}
        px={6}
        fontSize={"xl"}
        fontWeight="thin"
        rounded="full"
        variant="ghost"
        color="gray.300"
        colorScheme="whiteAlpha"
      >
        Create new
      </Button>

      <Menu closeOnSelect={false} gutter={12}>
        <MenuButton
          as={Button}
          fontSize={"xl"}
          fontWeight="thin"
          py={2}
          px={3}
          rounded="full"
          variant="ghost"
          color="gray.300"
          colorScheme="whiteAlpha"
        >
          Categories
        </MenuButton>
        <MenuList
          backgroundColor="whiteAlpha.900"
          color="gray.900"
          border="none"
        >
          <MenuOptionGroup
            type="checkbox"
            name="categoryIds"
            defaultValue={filterQ.map((id) => id.toString())}
          >
            {categories.map((category) => (
              <MenuItemOption
                key={category.id}
                id={`${category.id}`}
                name="categoryIds"
                value={`${category.id}`}
                backgroundColor="transparent"
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
                  handleFilterChange(filterQ, category.id, setFilterQ);
                }}
              >
                {category.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Stack>
  );
};
