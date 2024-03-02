import { useState, useMemo, createContext, useContext } from "react";
import { useStaticData } from "./StaticDataContext";

export const FilterContext = createContext({});
FilterContext.displayName = "FilterContext";

export const FilterContextProvider = ({ children }) => {
  const { categoryIds } = useStaticData();
  const [categoryFilters, setCategoryFilters] = useState(categoryIds);

  // helper for category filtering
  const hasFilterCategory = (catIds, catFilters) => {
    const filters = new Set(catFilters);
    return catIds.filter((id) => filters.has(id));
  };

  const filterEventsByCategories = (events) =>
    events.filter(
      (event) =>
        hasFilterCategory(event.categoryIds, categoryFilters).length > 0,
    );

  const contextValue = useMemo(() => {
    return {
      categoryFilters,
      setCategoryFilters,
      filterEventsByCategories,
    };
  }, [categoryFilters, setCategoryFilters, filterEventsByCategories]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within FilterContext");
  }
  return context;
};
