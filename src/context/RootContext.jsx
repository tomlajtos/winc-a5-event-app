import { createContext, useContext, useState, useEffect } from "react";

export const RootContext = createContext({});

RootContext.displayName = "RootContext";

export const RootContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3003/users");
      const users = await response.json();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3003/categories");
      const categories = await response.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <RootContext.Provider value={{ users, categories }}>
      {children}
    </RootContext.Provider>
  );
};

export const useRoot = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRoot must be used within RootContextProvider");
  }
  return context;
};
