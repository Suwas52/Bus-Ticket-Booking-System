import React from "react";
import Test from "./pages/User/test";
import LandingPage from "./pages/User/LandingPage";
import "./styles/main.scss";
import SignUp from "./pages/Authentication/SignUp";
import Login from "./pages/Authentication/Login";

const App = () => {
  return (
    <div>
      {/* <SignUp /> */}
      <Login />
    </div>
  );
};

export default App;
