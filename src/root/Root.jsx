// React and RRouter imports
import React from "react";
import { Outlet } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Context imports
import { useStaticData } from "../context/StaticDataContext.jsx";
import { FilterContextProvider } from "../context/FilterContext.jsx";
import { SearchContextProvider } from "../context/SearchContext.jsx";
// Component imports
import { AppHeader } from "./app-header/AppHeader";
// utils imports
import { Logger } from "../util/Logger.jsx";

export const Root = () => {
  const { categoryIds } = useStaticData();

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
