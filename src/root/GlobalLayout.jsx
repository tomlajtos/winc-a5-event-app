import { Outlet, useRouteLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { AppHeader } from "./app-header/AppHeader";
import { SearchContextProvider } from "../context/SearchContext";
import { FilterContextProvider } from "../context/FilterContext";
export const GlobalLayout = () => {
  const { categoryIds } = useRouteLoaderData("root");
  const events = useRouteLoaderData("events");
  console.log("events in layout element::::>", events);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      mx={0}
      px={0}
      b={8}
      background="gray.200"
    >
      <SearchContextProvider>
        <FilterContextProvider categoryIds={categoryIds}>
          <AppHeader />
          <Box
            className="global-outlet container"
            display="flex"
            pt={0}
            backgroundColor="transparent"
            height="full"
            flex="1"
          >
            <Outlet />
          </Box>
        </FilterContextProvider>
      </SearchContextProvider>
    </Box>
  );
};
