import React from "react";
import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { useStaticData } from "../../../context/StaticDataContext";
import { useFilterContext } from "../../../context/FilterContext";
import { handleFilterChange } from "../../../io/inputUtils";
import { Logger } from "../../../util/Logger";

export const CategoryFilters = () => {
  const { categories } = useStaticData();
  const { categoryFilters, setCategoryFilters } = useFilterContext();

  return (
    <Logger name="CategoryFilters" level={4}>
      <MenuOptionGroup
        px={2}
        title="Categories"
        type="checkbox"
        name="categoryIds"
        defaultValue={categoryFilters.map((id) => id.toString())}
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
              handleFilterChange(
                categoryFilters,
                category.id,
                setCategoryFilters,
              );
            }}
          >
            {category.name}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </Logger>
  );
};
