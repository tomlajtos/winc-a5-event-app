import { createContext, useContext, useMemo } from "react";
import { Logger } from "../util/Logger";

export const StaticDataContext = createContext({});
StaticDataContext.displayName = "StaticDataContext";

export const StaticDataContextProvider = ({ value, children }) => {
  const contextValue = useMemo(() => value, [value]);
  return (
    <Logger type="context" name="StaticDataContext" level={0}>
      <StaticDataContext.Provider value={contextValue}>
        {children}
      </StaticDataContext.Provider>
    </Logger>
  );
};

export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  if (!context) {
    throw new Error("useStaticData must be used within StaticDataContext");
  }
  return context;
};
