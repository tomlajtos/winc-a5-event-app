// Chakra-ui imports
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
// Component imports
import { CategoryFilters } from "../CategoryFilters";

export const CategoryFiltersMenu = () => {
  return (
    <Menu
      isLazy="true"
      closeOnSelect={false}
      gutter={12}
      placement="auto-start"
    >
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
        <CategoryFilters />
      </MenuList>
    </Menu>
  );
};
