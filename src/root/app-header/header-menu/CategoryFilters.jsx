// Chakra-ui imports
import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
// Context and custom hook imports
import { useStaticData } from "../../../context/StaticDataContext";
import { useFilterContext } from "../../../context/FilterContext";
// Util and I/O imports
import { handleFilterChange } from "../../../io/inputUtils";

export const CategoryFilters = () => {
  const { categories } = useStaticData();
  const { categoryFilters, setCategoryFilters } = useFilterContext();

  return (
    <MenuOptionGroup
      px={6}
      m={0}
      title="Categories"
      type="checkbox"
      name="categoryIds"
      defaultValue={categoryFilters.map((id) => id.toString())}
      fontSize={["md", "lg", "xl"]}
      fontWeight="thin"
    >
      {categories.map((category) => (
        <MenuItemOption
          key={category.id}
          id={`${category.id}`}
          name="categoryIds"
          value={`${category.id}`}
          fontSize={["sm", "md", "lg"]}
          backgroundColor="transparent"
          pl={6}
          py={[0.5, 0.5, 1]}
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
  );
};
