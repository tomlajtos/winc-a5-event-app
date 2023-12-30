import { createContext, useContext, useState } from "react";
import { Logger } from "../util/Logger";

export const SearchContext = createContext({});
SearchContext.displayName = "SearchContext";

export const SearchContextProvider = ({ children }) => {
  const [searchQ, setSearchQ] = useState("");

  return (
    <SearchContext.Provider value={{ searchQ, setSearchQ }}>
      <Logger
        type="render"
        target="context"
        name="Search.Context.Provider"
        level={2}
      />
      <Logger type="value" name="SearchContext > searchQ:" value={searchQ} />
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchQuery = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchQuery must be used within SearchContext");
  }
  return context;
};
