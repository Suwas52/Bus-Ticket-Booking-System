import React from "react";
import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import Phone from "@mui/icons-material/LocalPhoneOutlined";
import Email from "@mui/icons-material/MailOutline";
import UserLogo from "@mui/icons-material/Person";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import Img from "../../assets/images/Section.png";
import UserWidget from "../../components/UserComponent/UserWidget/UserWidget";
import Table from "../../components/AdminComponent/table/Table"
import "../../components/AdminComponent/table/table.scss"

const UserDashboard = () => {
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
                  <NavDropdown.Item href="#action1">action1</NavDropdown.Item>
                  <NavDropdown.Item href="#action2">action2</NavDropdown.Item>
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
        <HeroBlock title="Dashboard" img={Img} />
      </div>

      {/* user-dashboard-widgets */}
      <div className="container user-widgets mt-5">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-4 mb-4">
            <UserWidget
              title={"Total Booked Ticket"}
              counter={"117"}
              bgColor={"#06D001"}
              borderLeft={"5px solid #06D001"}
            />
          </div>
          <div className="col-12 col-md-12 col-lg-4 mb-4">
            <UserWidget
              title={"Total Rejected Ticket"}
              counter={"1"}
              bgColor={"red"}
              borderLeft={"5px solid red"}
            />
          </div>
          <div className="col-12 col-md-12 col-lg-4 mb-4">
            <UserWidget
              title={"Total Pending Ticket"}
              counter={"1"}
              bgColor={"#FF9100"}
              borderLeft={"5px solid #FF9100"}
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="container mt-5">
        <Table  theadColor={"#059212"} color={"white"}/>
      </div>
    </>
  );
};

export default UserDashboard;
