import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/User/LandingPage";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./path";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import AuthGuard from "../auth/AuthGuard";
import {
  allAccessRoles,
  staffAccessRoles,
  userAccessRoles,
} from "../auth/auth.utils";
import DashboardPage from "../pages/Admin/home/AdminDashboard";
import List from "../components/AdminComponent/table/Table";
import BusData from "../pages/Admin/BusData";
import BookingData from "../pages/Admin/BookingData";
import FilterPage from "../pages/User/FilterPage";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path={PATH_PUBLIC.login} element={<Login />} />
        <Route path={PATH_PUBLIC.register} element={<SignUp />} />
        <Route path="/filter-page" element={<FilterPage />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<AuthGuard roles={allAccessRoles} />}>
        <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
        <Route path={PATH_DASHBOARD.userList} element={<List />} />
        <Route path={PATH_DASHBOARD.bus} element={<BusData />} />
        <Route path={PATH_DASHBOARD.booking} element={<BookingData />} />
      </Route>
      <Route element={<AuthGuard roles={staffAccessRoles} />}>
        <Route path={PATH_DASHBOARD.booking} element={<BookingData />} />
      </Route>
      <Route element={<AuthGuard roles={userAccessRoles} /> }></Route>
    </Routes>
  );
};

export default GlobalRouter;
