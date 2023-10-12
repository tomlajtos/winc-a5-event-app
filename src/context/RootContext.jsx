// TODO: improve state management and data fetching
import { createContext, useContext, useState, useEffect } from "react";

export const RootContext = createContext({});

RootContext.displayName = "RootContext";

export const RootContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [errorUsers, setErrorUsers] = useState(null);

  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState(null);

  const [searchQ, setSearchQ] = useState("");
  const [filterQ, setFilterQ] = useState([1, 2, 3]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3003/users");
      if (response.ok) {
        const users = await response.json();
        setUsers(users);
      } else {
        setErrorUsers(`Something went wrong: ${response.statusText}`);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3003/categories");
      if (response.ok) {
        const categories = await response.json();
        setCategories(categories);
      } else {
        setErrorCategories(`Something went wrong: ${response.statusText}`);
      }
    };
    fetchCategories();
  }, []);

  return (
    <RootContext.Provider
      value={{
        users,
        categories,
        isLoadingUsers,
        isLoadingCategories,
        errorUsers,
        errorCategories,
        searchQ,
        setSearchQ,
        filterQ,
        setFilterQ,
      }}
    >
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
