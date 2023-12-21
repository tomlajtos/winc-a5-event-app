import React, { useContext } from "react";
import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { RootContext } from "../../../context/RootContext";
// import { Logger } from "../../../util/Logger";

export const CategoryFilters = () => {
  const { categories, filters, setFilters } = useContext(RootContext);

  const handleFilterChange = (filters, inputValue, setFn) => {
    let newFilters = [...filters];
    console.log(
      "%c onClick > filter > FilterGroup",
      "color:red;background:white",
    );
    console.log("newFilters before", newFilters);
    if (!newFilters.includes(inputValue)) {
      newFilters = Array.from(new Set([Number(inputValue), ...newFilters]));
    } else {
      newFilters = newFilters.filter((q) => q !== Number(inputValue));
    }
    console.log("newFilters after", newFilters);
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
