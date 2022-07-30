import { useState, createContext, useContext } from "react";
import { loadUserInLocalStorage } from "../helpers/LocallStorage";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  
  const userLs = loadUserInLocalStorage();

  const [user, setUser] = useState(userLs);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState("");

  const sharedData = {
    user,
    setUser,
    users,
    setUsers,
    errors,
    setErrors,
  };
  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};
