import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/User/LandingPage";
import { PATH_AUTHUSER, PATH_DASHBOARD, PATH_PUBLIC } from "./path";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
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
import AboutPage from "../pages/User/AboutPage";
import BlogPage from "../pages/User/BlogPage";
import ContactPage from "../pages/User/ContactPage";
import UnauthorizedPage from "../pages/Public/UnauthorizedPage";
import NotFoundPage from "../pages/Public/NotFoundPage";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path={PATH_PUBLIC.login} element={<Login />} />
        <Route path={PATH_PUBLIC.register} element={<Register />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />
        <Route path="/filter-page" element={<FilterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<AuthGuard roles={allAccessRoles} />}>
        <Route path={PATH_DASHBOARD.userList} element={<List />} />
        <Route path={PATH_DASHBOARD.bus} element={<BusData />} />
        <Route path={PATH_DASHBOARD.booking} element={<BookingData />} />
      </Route>
      <Route element={<AuthGuard roles={staffAccessRoles} />}>
        <Route path={PATH_DASHBOARD.booking} element={<BookingData />} />
        <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
      </Route>
      <Route element={<AuthGuard roles={userAccessRoles} />}>
        <Route path={PATH_AUTHUSER.filter} element={<FilterPage />} />
      </Route>

      {/* Catch all (404) */}
      <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage />} />
      <Route
        path="*"
        element={<Navigate to={PATH_PUBLIC.notFound} replace />}
      />
    </Routes>
  );
};

export default GlobalRouter;
