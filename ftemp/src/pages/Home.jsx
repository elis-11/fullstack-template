import React from "react";
import { useDataContext } from "../context/DataProvider";

export const Home = () => {
  const { user } = useDataContext;

  return (
    <div className="home">
      <h2>Home</h2>
      {user?.email}
    </div>
  );
};
