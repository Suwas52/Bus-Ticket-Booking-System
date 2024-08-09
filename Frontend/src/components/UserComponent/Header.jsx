import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Row,
} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import Phone from "@mui/icons-material/LocalPhoneOutlined";
import Email from "@mui/icons-material/MailOutline";
import SignIn from "@mui/icons-material/Login";
import SignUp from "@mui/icons-material/PersonAddAlt1";
import { Link, useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/path";
import useAuth from "../../hooks/useAuth";
import UserLogo from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";

const Header = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  console.log(isAuthenticated);

  const userRolesLabelCreator = () => {
    if (user) {
      let result = "";
      user.roles.foreach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ",";
        }
      });
    } else {
      return "--";
    }
  };

  return (
    <div className="header">
      <Navbar className="top-header" bg="light" expand="lg">
        <Container className="px-4">
          <div className="contact-info">
            <Phone className="icon" /> +44 6547 8901 &nbsp;&nbsp;
            <Email className="icon" /> example@example.com
            <UserLogo className="icon" /> {user ? user.username : "--"}
            userroles: {userRolesLabelCreator()}
          </div>
          {isAuthenticated ? (
            <div className="auth-buttons ms-auto">
              <Link to={"/user-dashboard"} className="btn btn-sm">
                Dashboard
              </Link>
              <Link>
                <Logout />
              </Link>
            </div>
          ) : (
            <div className="auth-buttons ms-auto">
              <Link to={"/login"} className="btn btn-sm">
                <SignIn className="icon" /> Sign In
              </Link>
              <Link to={"/signup"} className="btn btn-sm">
                <SignUp className="icon" />
                Sign Up
              </Link>
            </div>
          )}
        </Container>
      </Navbar>

      <Navbar className="test" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={Logo} height={50} alt="Bus Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/faqs">FAQs</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </Nav>
            <Nav className="ms-auto">
              <button className="btn green-btn btn-sm">BUY TICKETS</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
