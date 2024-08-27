import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/User/LandingPage";
import { PATH_AUTHUSER, PATH_DASHBOARD, PATH_PUBLIC } from "./path";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AuthGuard from "../auth/AuthGuard";
import {
  staffAccessRoles,
  SuperAdminAccessRoles,
  userAccessRoles,
} from "../auth/auth.utils";
import DashboardPage from "../pages/Admin/home/AdminDashboard";
import List from "../components/AdminComponent/table/Table";
import FilterPage from "../pages/User/FilterPage";
import AboutPage from "../pages/User/AboutPage";
import BlogPage from "../pages/User/BlogPage";
import ContactPage from "../pages/User/ContactPage";
import UnauthorizedPage from "../pages/Public/UnauthorizedPage";
import NotFoundPage from "../pages/Public/NotFoundPage";
import BusList from "../pages/Admin/Bus/BusList";
import CreateBus from "../pages/Admin/Bus/CreateBus";
import UserDashboard from "../pages/User/UserDashboard";
import BusScheduleList from "../pages/Admin/BusSchedule/BusScheduleList";
import ProfileSettingPage from "../pages/User/ProfileSettingPage";
import ScheduleCreate from "../pages/Admin/BusSchedule/ScheduleCreate";
import BookingList from "../pages/Admin/Booking/BookingList";
import BusScheduleDetail from "../pages/Admin/BusSchedule/BusScheduleDetail";
import BusDetail from "../pages/Admin/Bus/BusDetail";
import RouteList from "../pages/Admin/Route/RouteList";
import CreateRoute from "../pages/Admin/Route/CreateRoute";
import RouteDetail from "../pages/Admin/Route/RouteDetail";
import UserList from "../pages/Admin/user/UserList";
// import UserCreate from "../pages/Admin/user/UserCreate";
import AdminProfilePage from "../pages/Admin/ProfileAdmin/AdminProfilePage";
import DetailComponent from "../components/AdminComponent/common/DetailComponent";
import TicketPrice from "../pages/Admin/Ticket-Price/TicketPrice";
import CreateTicketPrice from "../pages/Admin/Ticket-Price/CreateTicketPrice";
import SeatSelectPage from "../pages/User/SeatSelectPage";
import UpdateRole from "../pages/Admin/user/UpdateRole";

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
      <Route element={<AuthGuard roles={SuperAdminAccessRoles} />}>
        <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
        <Route path={PATH_DASHBOARD.profile} element={<AdminProfilePage />} />
        <Route path={PATH_DASHBOARD.userList} element={<UserList />} />
        {/* <Route path={PATH_DASHBOARD.userCreate} element={<UserCreate />} /> */}
        <Route path={PATH_DASHBOARD.busList} element={<BusList />} />
        <Route path={PATH_DASHBOARD.booking} element={<BookingList />} />
        <Route path={PATH_DASHBOARD.busCreate} element={<CreateBus />} />
        <Route path={PATH_DASHBOARD.busUpdate} element={<CreateBus />} />
        <Route path={PATH_DASHBOARD.busDetail} element={<BusDetail />} />

        {/* updaterole */}
        <Route path={PATH_DASHBOARD.updateUserRole} element={<UpdateRole />} />

        {/* Route model route */}
        <Route path={PATH_DASHBOARD.routeList} element={<RouteList />} />
        <Route path={PATH_DASHBOARD.routeCreate} element={<CreateRoute />} />
        <Route path={PATH_DASHBOARD.routeEdit} element={<CreateRoute />} />
        <Route path={PATH_DASHBOARD.routeDetail} element={<RouteDetail />} />

        {/* TicketPrice modal route */}
        <Route
          path={PATH_DASHBOARD.ticketPriceList}
          element={<TicketPrice />}
        />
        <Route
          path={PATH_DASHBOARD.createTicketPrice}
          element={<CreateTicketPrice />}
        />
        <Route
          path={PATH_DASHBOARD.ticketPriceEdit}
          element={<CreateTicketPrice />}
        />

        <Route
          path={PATH_DASHBOARD.busScheduleList}
          element={<BusScheduleList />}
        />
        <Route
          path={PATH_DASHBOARD.busScheduleCreate}
          element={<ScheduleCreate />}
        />
        <Route
          path={PATH_DASHBOARD.busScheduleEdit}
          element={<ScheduleCreate />}
        />
        <Route
          path={PATH_DASHBOARD.busScheduleDetail}
          element={<BusScheduleDetail />}
        />
        {/* Booking modal Route */}
        <Route 
        path={PATH_DASHBOARD.booking} element={<BookingList />} />
        {/* <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} /> */}
      </Route>
      <Route element={<AuthGuard roles={staffAccessRoles} />}>
        <Route path={PATH_DASHBOARD.busCreate} element={<CreateBus />} />
        <Route path={PATH_DASHBOARD.booking} element={<BookingList />} />
        {/* <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} /> */}
        <Route path={PATH_DASHBOARD.profile} element={<AdminProfilePage />} />
      </Route>
      <Route element={<AuthGuard roles={userAccessRoles} />}>
        <Route path={PATH_AUTHUSER.filter} element={<FilterPage />} />
        <Route path={PATH_AUTHUSER.userBooked} element={<UserDashboard />} />
        <Route
          path={PATH_AUTHUSER.userProfileSetting}
          element={<ProfileSettingPage />}
        />
        <Route path={PATH_AUTHUSER.seatSelect} element={<SeatSelectPage />} />
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
