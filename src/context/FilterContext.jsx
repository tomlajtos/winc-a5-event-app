import { createContext, useContext, useState } from "react";
import { useOutletContext, useRouteLoaderData } from "react-router-dom";
import { Logger } from "../util/Logger";

export const FilterContext = createContext({});
FilterContext.displayName = "FilterContext";

export const FilterContextProvider = ({ children /*categoryIds*/ }) => {
  const { categoryIds } = useRouteLoaderData("root");
  console.log("FILTER C categoryIds from OutletContext", categoryIds);

  const [filters, setFilters] = useState([...categoryIds]);

  return filters ? (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <Logger
        type="render"
        target="context"
        name="Filter.Context.Provider"
        level={2}
      />
      {children}
    </FilterContext.Provider>
  ) : null;
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterContext");
  }
  return context;
};
