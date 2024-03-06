// React and React Router imports
import { useEffect, useState } from "react";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Context and custom hook imports
import { FilterContextProvider } from "./context/FilterContext";
import { SearchContextProvider } from "./context/SearchContext";
import { StaticDataContextProvider } from "./context/StaticDataContext";
import { useMyAsyncError } from "./hooks/useMyAsyncError";
// Component imports
import { AppLoadingFallback } from "./components/fallback/AppLoadingFallback";
import { Router } from "./Router";
// Util and I/O imports
import { createCategoryIdsArr } from "./io/inputUtils";
import { getMultiData } from "./io/fetch";

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

  return categoryIds ? (
    <Box flex="1" display="flex" minWidth="300px">
      <StaticDataContextProvider value={contextValue}>
        <FilterContextProvider>
          <SearchContextProvider>
            <Router />
          </SearchContextProvider>
        </FilterContextProvider>
      </StaticDataContextProvider>
    </Box>
  ) : (
    <AppLoadingFallback />
  );
};
