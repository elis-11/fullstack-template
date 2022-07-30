import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";

export const ProtectedRoute = ({ children, admin }) => {
  console.log(children);

  const { user } = useDataContext();
  const navigate = useNavigate();

  if (!user) {
    console.log('Not logged in!');
      return <Navigate to="/login" />;
  }
  if (admin && user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  

  return children;
  // return <div>Protected</div>
};
