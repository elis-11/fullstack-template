import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { getUsersApi } from "../helpers/apiCalls";
import "../styles/Auth.scss";

export const Dashboard = () => {
  const navigate = useNavigate ();

  const { user, users, setUsers, errors, setErrors } = useDataContext();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    const loadData = async () => {
      console.log(user);
      const result = await getUsersApi(user.token);

      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setUsers(result);
    };
    console.log(user);

    loadData();
  }, [user]);

  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="container">
        {users.map((user) => (
          <div className="users" key={user._id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
      <div className="errors">{errors}</div>
    </div>
  );
};
