import { createContext, useContext, useState, useEffect } from "react";
import { getMultiData } from "../util/fetch.js";
import { createCategoryIdsArr } from "../util/inputUtils.js";
import { Logger } from "../util/Logger";

export const StaticDataContext = createContext({});
StaticDataContext.displayName = "StaticDataContext";

export const StaticDataContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getMultiData([
        { path: "/categories", setState: setCategories },
        { path: "/users", setState: setUsers },
      ]);
    }
    return () => {
      ignore = false;
    };
  }, []);

  if (categories.length && users.length) {
    const categoryIds = createCategoryIdsArr(categories);
    const value = { categories, categoryIds, users };
    console.log("STATIC VAL", value);
    return (
      <StaticDataContext.Provider value={value}>
        <Logger
          type="render"
          name="Static.Data.Context.Provider"
          color="cyan"
          bg="purple"
        />
        {/* { console.log("StaticDataProvider") } */}
        {children}
      </StaticDataContext.Provider>
    );
  }
};

export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  if (!context) {
    throw new Error("useStaticData must be used within StaticDataContext");
  }
  return context;
};
