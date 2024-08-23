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
import { MANAGE_BOOKING } from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import { format } from "date-fns";

const UserDashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookedData, setBookedData] = useState(null);

  console.log(bookingData);

  useEffect(() => {
    fetchBookedData();
  }, []);

  const fetchBookedData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BOOKING);

      // formatted data
      const formattedData = response.data.map((item) => ({
        ...item,
        departureTime: format(new Date(item.departureTime), "MM/dd/yyyy hh:mm:ss a"),
        arrivalTime: format(new Date(item.arrivalTime), "MM/dd/yyyy hh:mm:ss a"),
      }))
      setBookingData(formattedData);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (booking) => {
    setBookedData(booking);
    setShowModal(!showModal);
  }

  const columns = [
    { field: "departureTime", label: "DepartureTime" },
    { field: "arrivalTime", label: "ArrivalTime" },
    { field: "gender", label: "Gender" },
    { field: "PassengerName", label: "PassengerName" },
    { field: "seatNumber", label: "SeatNumber" },
    { field: "seatName", label: "SeatName" },
    { field: "status", label: "Status" },
    { field: "action", label: "Action" },
  ];

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
      {loading? (
        <div className="text-center my-5">Loading...</div>
      ) : (
        <CommonTable columns={columns} rows={bookingData} onView={handleShowDetails}  />

      )

      }
      </div>

      <Modal show={showModal} onHide={handleShowDetails}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
       <Container>
        <Row>
          <Col className="col-6"> <strong>Arrival Time:</strong> </Col>
          <Col className="col-6">{bookedData?.arrivalTime}</Col>
        </Row>
        <Row>
          <Col className="col-6"><strong>Departure Time:</strong></Col>
          <Col className="col-6">{bookedData?.departureTime}</Col>
        </Row>
        <Row>
          <Col><strong>SeatName:</strong></Col>
          <Col><div className="badge bg-info-subtle text-info">{bookedData?.seatName}</div></Col>
        </Row>
        <Row>
          <Col className="col-6"><strong>PassengerName:</strong></Col>
          <Col className="col-6">{bookedData?.passengerName}</Col>
        </Row>
        <Row>
          <Col className="col-6"><strong>Gender</strong></Col>
          <Col className="col-6">{bookedData?.gender}</Col>
        </Row>
        <Row>
          <Col className="col-6"><strong>Status</strong></Col>
          <Col><div className="badge bg-success-subtle text-success">{bookedData?.status}</div></Col>
        </Row>
       </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShowDetails}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

      <div className="user-footer mt-5">
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
