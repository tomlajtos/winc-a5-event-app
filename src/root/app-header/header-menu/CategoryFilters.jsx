import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { useFilters } from "../../../context/FilterContext";
import { Logger } from "../../../util/Logger";

export const CategoryFilters = () => {
  const { filters, setFilters } = useFilters();
  const { categories } = useRouteLoaderData("root");

  const handleFilterChange = (filters, inputValue, setFn) => {
    let newFilters = [...filters];
    if (!newFilters.includes(inputValue)) {
      newFilters = Array.from(new Set([Number(inputValue), ...newFilters]));
    } else {
      newFilters = newFilters.filter((q) => q !== Number(inputValue));
    }
    setFn(newFilters);
  };

  return (
    <MenuOptionGroup
      px={2}
      title="Categories"
      type="checkbox"
      name="categoryIds"
      defaultValue={filters.map((id) => id.toString())}
      fontSize="xl"
      fontWeight="thin"
    >
      <Logger
        type="render"
        target="component"
        name="CategoryFilters"
        level={4}
      />
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
            handleFilterChange(filters, category.id, setFilters);
          }}
        >
          {category.name}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  );
};
