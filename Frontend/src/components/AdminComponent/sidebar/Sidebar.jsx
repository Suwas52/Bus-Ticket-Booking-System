import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom"
import { useContext } from "react";
import { DarkModeContext } from "../../../pages/Admin/context/DarkModeContext";

const Sidebar = () => {

  const {dispatch} = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
      <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Amrit Gurung</span>
        {/* <img src="/src/assets/yatra-high-resolution-logo-transparent.svg" alt="yatra image" className="logo"/> */}
      </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
        <p className="title">MAIN</p>
        <Link to="/" style={{textDecoration: "none"}}>
          <li>
          <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
        </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{textDecoration:"none"}}>
          <li>
          <PersonOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
          </Link>
          <Link to="/products" style={{textDecoration:"none"}}>
          <li>
          <StoreOutlinedIcon className="icon" />
            <span>Products</span>
          </li>
          </Link>
          <li>
          <BookmarkBorderOutlinedIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
          <LocalShippingOutlinedIcon className="icon" />
            <span>Delivery</span>
          </li>
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
            <span>System Health</span>
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
          <li>
          <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;