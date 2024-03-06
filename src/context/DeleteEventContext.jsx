// React and React Router imports
import { useContext, createContext } from "react";

export const DeleteEventContext = createContext(null);

export const DeleteEventContextProvider = ({ value, children }) => {
  return (
    <DeleteEventContext.Provider value={value}>
      {children}
    </DeleteEventContext.Provider>
  );
};

export const useDeleteEvent = () => {
  const context = useContext(DeleteEventContext);
  if (!context) {
    throw new Error("useDeleteEvent must be used within DeleteEventContext");
  }
  return context;
};
