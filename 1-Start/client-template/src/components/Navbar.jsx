import { NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { deleteUserInLocalStorage } from "../helpers/LocallStorage";

export const Navbar = () => {
  const { user, setUser } = useDataContext();

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    deleteUserInLocalStorage()
    setUser();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        {!user && <NavLink to="/login">Login</NavLink>}
        {user && (
          <NavLink to="#" onClick={logout}>
            Logout
          </NavLink>
        )}
        {!user && <NavLink to="/signup">Signup</NavLink>}
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>
    </div>
  );
};
