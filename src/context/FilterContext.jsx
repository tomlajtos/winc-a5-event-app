import { createContext, useContext, useState } from "react";
import { Logger } from "../util/Logger";

export const FilterContext = createContext({});
FilterContext.displayName = "FilterContext";

export const FilterContextProvider = ({ children, categoryIds }) => {
  const [filters, setFilters] = useState([...categoryIds]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <Logger
        type="render"
        target="context"
        name="Filter.Context.Provider"
        level={2}
      />
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useStaticData must be used within FilterContext");
  }
  return context;
};
