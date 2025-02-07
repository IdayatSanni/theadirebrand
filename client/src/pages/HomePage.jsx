import React from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { useAuth } from "../context/auth";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <LayoutTheme title={"Home"}>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </LayoutTheme>
  );
};

export default HomePage;
