import { useDataContext } from "../context/DataProvider";
import "../styles/Auth.scss";

export const Home = () => {
  const { user } = useDataContext();

  return (
    <div className="Home">
      <h2>Home</h2>
      {user?.name} {user?.email}
    </div>
  );
};
