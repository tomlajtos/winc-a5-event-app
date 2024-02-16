import React, { useContext, createContext } from "react";
export const EditEventContext = createContext(null);

export const EditEventContextProvider = ({ value, children }) => {
  return (
    <EditEventContext.Provider value={value}>
      {children}
    </EditEventContext.Provider>
  );
};
export const useEditEvent = () => {
  const context = useContext(EditEventContext);
  if (!context) {
    throw new Error("useEditEvent must be used within EditEventContext");
  }
  return context;
};
