// React and RRouter imports
import { useRouteLoaderData, useLoaderData, Outlet } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Context imports
import { FilterContextProvider } from "../context/FilterContext.jsx";
import { SearchContextProvider } from "../context/SearchContext.jsx";
// Component imports
import { AppHeader } from "./app-header/AppHeader";
// utils imports
import { fetchData } from "../io/fetch.js";
import { Logger } from "../util/Logger.jsx";
import { createCategoryIdsArr } from "../io/inputUtils.js";

export const loader = async () => {
  const categories = await fetchData("/categories");
  const users = await fetchData("/users");
  // TODO: check if this does make loading much longer
  const categoryIds = createCategoryIdsArr(categories);
  return { categories, categoryIds, users };
};

export const Root = () => {
  const { categories, categoryIds, users } = useLoaderData();
  const isMinimumLoaded = categories.length > 0 && categoryIds.length > 0;
  if (!isMinimumLoaded) {
    return null;
  }

  return (
    <Box
      className="root-container"
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      mx={0}
      px={0}
      b={8}
      background="gray.200"
    >
      <Logger type="render" target="component" name="root" level={0} />
      <SearchContextProvider>
        <FilterContextProvider categoryIds={categoryIds}>
          <AppHeader />
          <Box
            className="root-outlet container"
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
