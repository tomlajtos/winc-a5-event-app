import { createContext, useContext, useState, useEffect } from "react";
import { getMultiData } from "../io/fetch.js";
import { createCategoryIdsArr } from "../io/inputUtils.js";
import { Logger } from "../util/Logger";

export const StaticDataContext = createContext({});
StaticDataContext.displayName = "StaticDataContext";

export const StaticDataContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [users, setUsers] = useState(null);
  const categoryIds = categories ? createCategoryIdsArr(categories) : null;

  useEffect(() => {
    getMultiData([
      { path: "/categories", setState: setCategories },
      { path: "/users", setState: setUsers },
    ]);
  }, []);

  if (!categories && !users) {
    return null;
  } else {
    const staticData = { categories, categoryIds, users };

    return (
      <StaticDataContext.Provider value={staticData}>
        <Logger
          type="render"
          target="context"
          name="Static.Data.Context.Provider"
          level={0}
        />
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
