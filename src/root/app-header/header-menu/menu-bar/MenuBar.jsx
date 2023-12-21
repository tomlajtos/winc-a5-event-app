import { Stack } from "@chakra-ui/react";
import { CategoryFilters } from "./CategoryFilters";
import { NavBar } from "./NavBar";

// container for navigation and filter components
export const MenuBar = () => {
  return (
    <Stack direction="row" padding={0} alignItems="center" spacing={0}>
      <NavBar />
      <CategoryFilters />
    </Stack>
  );
};
