import { useEffect, useState } from "react";
import { Router } from "./Router";
import { FilterContextProvider } from "./context/FilterContext";
import { SearchContextProvider } from "./context/SearchContext";
import { StaticDataContextProvider } from "./context/StaticDataContext";
import { Box, Center } from "@chakra-ui/react";
import { getMultiData } from "./io/fetch";
import { createCategoryIdsArr } from "./io/inputUtils";
import { useMyAsyncError } from "./hooks/useMyAsyncError";

export const App = () => {
  const [categories, setCategories] = useState(null);
  const [users, setUsers] = useState(null);
  const categoryIds = categories ? createCategoryIdsArr(categories) : null;
  const throwAsyncError = useMyAsyncError();

  // a component outside router seems the best way for data fatching
  // that should only happen once at inital app render
  // this is the sole puprpose of the App component
  useEffect(() => {
    getMultiData(
      [
        ["categories", setCategories],
        ["users", setUsers],
      ],
      throwAsyncError,
    );
  }, []);

  const contextValue = { categories, categoryIds, users };

  const AppFallback = () => {
    return (
      <Center
        flex="1"
        fontSize="6xl"
        align="center"
        bg="purple.900"
        color="teal.100"
      >
        <Box>{"Loading..."}</Box>
      </Center>
    );
  };

  return categoryIds ? (
    <Box flex="1" display="flex">
      <StaticDataContextProvider value={contextValue}>
        <FilterContextProvider>
          <SearchContextProvider>
            <Router />
          </SearchContextProvider>
        </FilterContextProvider>
      </StaticDataContextProvider>
    </Box>
  ) : (
    <AppFallback />
  );
};
