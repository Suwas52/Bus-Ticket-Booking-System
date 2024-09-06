import React, { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import { DarkModeContext } from "../../../pages/Admin/context/DarkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.scss";
import { Link } from "react-router-dom";
import img from "../../../assets/7309681.jpg";
import { PATH_DASHBOARD } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="item">
          <DarkModeOutlinedIcon
            className="icon"
            onClick={() => {
              dispatch({ type: "TOGGLE" });
            }}
          />
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
         
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}

          <div className="item">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-custom-components"
                className="dropdown-toggle custom-dropdown-toggle"
              >
                <img src={user?.profilePicture} alt="" className="avatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Link
                  to={PATH_DASHBOARD.profile}
                  className="text-decoration-none"
                >
                  <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                </Link>
                <Link onClick={logout} className="text-decoration-none">
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
