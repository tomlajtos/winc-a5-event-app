import { createContext, useContext, useMemo } from "react";

export const StaticDataContext = createContext({});
StaticDataContext.displayName = "StaticDataContext";

export const StaticDataContextProvider = ({ value, children }) => {
  const contextValue = useMemo(() => value, [value]);
  return (
    <StaticDataContext.Provider value={contextValue}>
      {children}
    </StaticDataContext.Provider>
  );
};

export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  if (!context) {
    throw new Error("useStaticData must be used within StaticDataContext");
  }
  return context;
};
