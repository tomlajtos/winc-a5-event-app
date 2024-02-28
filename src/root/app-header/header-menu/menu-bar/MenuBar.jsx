import { Stack } from "@chakra-ui/react";
import { CategoryFiltersMenu } from "./CategoryFiltersMenu";
import { NavBar } from "./NavBar";
import { Logger } from "../../../../util/Logger";

// container for navigation and filter components
export const MenuBar = () => {
  return (
    <Logger name="MenuBar" level={7}  >
      <Stack direction="row" padding={0} alignItems="center" spacing={0}>
        <NavBar />
        <CategoryFiltersMenu />
      </Stack>
    </Logger>
  );
};
