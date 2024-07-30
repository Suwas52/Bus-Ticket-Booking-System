import React from "react";
import LandingPage from "./pages/User/LandingPage";
import "./styles/main.scss";
import SignUp from "./pages/Authentication/SignUp";
import Login from "./pages/Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoute role="user" />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
          
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
