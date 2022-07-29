import { useState, createContext, useContext } from "react";


const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

  const [user, setUser] = useState();
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
