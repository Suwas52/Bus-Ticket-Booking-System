import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../../pages/Admin/context/DarkModeContext";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../assets/images/logo.png";
import { Image } from "react-bootstrap";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={PATH_PUBLIC.home} style={{ textDecoration: "none" }}>
          <Image src={Logo} height={50} alt="Bus Logo" />

          {/* <img src="/src/assets/yatra-high-resolution-logo-transparent.svg" alt="yatra image" className="logo"/> */}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link
            to={PATH_DASHBOARD.dashboard}
            style={{ textDecoration: "none" }}
          >
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to={PATH_DASHBOARD.userList} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link
            to="/admin-dashboard/bus/list"
            style={{ textDecoration: "none" }}
          >
            <li>
              <LocalShippingOutlinedIcon className="icon" />
              <span>Buses</span>
            </li>
          </Link>
          <Link
            to="/admin-dashboard/busSchedule/list"
            style={{ textDecoration: "none" }}
          >
            <li>
              <BookmarkBorderOutlinedIcon className="icon" />
              <span>Bus Schedule</span>
            </li>
          </Link>
          <Link
            to={PATH_DASHBOARD.routeList}
            style={{ textDecoration: "none" }}
          >
            <li>
              <StoreOutlinedIcon className="icon" />
              <span>Routes</span>
            </li>
          </Link>

          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notification</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className="icon" />
            <span>Booking</span>
          </li>
          <li>
            <PsychologyIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>

          <Link onClick={logout} style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
