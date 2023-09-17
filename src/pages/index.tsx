import React, { useState } from "react";
import Login from "../components/Login";
import { useEffect } from "react";

const Home: React.FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState<string | null>("false");

  useEffect(() => {
    setisLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome to Blona</h1>
      </div>
    );
  }
  return <Login />;
};

export default Home;
