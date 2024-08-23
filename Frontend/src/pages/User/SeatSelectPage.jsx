import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Row,
} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import Phone from "@mui/icons-material/LocalPhoneOutlined";
import Email from "@mui/icons-material/MailOutline";
import UserLogo from "@mui/icons-material/Person";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import Img from "../../assets/images/Section.png";
import UserWidget from "../../components/UserComponent/UserWidget/UserWidget";
import "../../components/AdminComponent/table/table.scss";
import CommonTable from "../../components/Base Table/CommonTable";
import Footer from "../../components/UserComponent/Footer";
import { Link } from "react-router-dom";

const SeatSelectPage = () => {

  return (
    <>
      <div className="header">
        <Navbar className="top-header" bg="light" expand="lg">
          <Container className="px-4">
            <div className="contact-info">
              <Phone className="icon" /> +44 6547 8901 &nbsp;&nbsp;
              <Email className="icon" /> example@example.com
              <UserLogo className="icon" />
            </div>
          </Container>
        </Navbar>

        <Navbar className="test" bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <Image src={Logo} height={50} alt="Bus Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto gap-3">
                <NavLink href="/">Dashboard</NavLink>
                <NavDropdown title="Booking" id="booking">
                  <NavDropdown.Item href="#action1">action1</NavDropdown.Item>
                  <NavDropdown.Item href="#action2">action2</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Profile" id="profile">
                  <Link
                    to={"/profile-setting"}
                    className="text-decoration-none"
                  >
                    <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item href="#action2">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ms-auto">
                <button className="btn green-btn btn-sm">BUY TICKETS</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="hero-block">
        <HeroBlock title="Seat Select Page" img={Img} />
      </div>

      <div className="seat-select-page">
        <p>seat select page</p>
      </div>

      <div className="user-footer mt-5">
        <Footer />
      </div>
    </>
  );
};

export default SeatSelectPage;
