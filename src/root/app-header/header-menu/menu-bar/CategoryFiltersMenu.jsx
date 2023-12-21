import React, { useContext } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";

import { RootContext } from "../../../../context/RootContext";

export const CategoryFiltersMenu = () => {
  const { categories, filters, setFilters } = useContext(RootContext);

  return (
    <Menu closeOnSelect={false} gutter={12}>
      <MenuButton
        as={Button}
        fontSize={"xl"}
        fontWeight="thin"
        py={2}
        px={4}
        rounded="full"
        variant="ghost"
        color="gray.300"
        colorScheme="whiteAlpha"
      >
        Categories
      </MenuButton>
      <MenuList backgroundColor="whiteAlpha.900" color="gray.900" border="none">
        <MenuOptionGroup
          type="checkbox"
          name="categoryIds"
          defaultValue={filters.map((id) => id.toString())}
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
