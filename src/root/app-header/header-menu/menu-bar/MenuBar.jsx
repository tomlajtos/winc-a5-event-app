// Chakra-ui imports
import { Stack } from "@chakra-ui/react";
// Component imports
import { CategoryFiltersMenu } from "./CategoryFiltersMenu";
import { NavBar } from "./NavBar";

// container for navigation and filter components
export const MenuBar = () => {
  return (
    <Stack direction="row" padding={0} alignItems="center" spacing={0}>
      <NavBar />
      <CategoryFiltersMenu />
    </Stack>
  );
};
