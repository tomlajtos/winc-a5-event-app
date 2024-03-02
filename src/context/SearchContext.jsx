import { useState, useMemo } from "react";
import { createContext, useContext } from "react";

export const SearchContext = createContext(null);
SearchContext.displayName = "SearchContext";

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const filterEventsBySearchValue = (events) =>
    events.filter((event) =>
      event.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

  const contextValue = useMemo(() => {
    return {
      searchValue,
      setSearchValue,
      filterEventsBySearchValue,
    };
  }, [searchValue, setSearchValue, filterEventsBySearchValue]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchContext");
  }
  return context;
};
