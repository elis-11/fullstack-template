import { useEffect } from "react";
import { useDataContext } from "../context/DataProvider";
import { getUsersApi } from "../helpers/apiCalls";

export const Dashboard = () => {
  const { user, users, setUsers, errors, setErrors } = useDataContext();

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      console.log(user);
      const result = await getUsersApi(user.token);

      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setUsers(result);
    };
    // console.log(user);
    loadData();
  }, [user]);

  return (
    <div className="users">
      <h2>Dashboard</h2>
      {users.map((user) => (
        <div key={user._id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      ))}
      <div className="errors">{errors}</div>
    </div>
  );
};
