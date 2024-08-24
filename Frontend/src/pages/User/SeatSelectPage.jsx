import React, { useState } from "react";
import {
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
import UserLogo from "@mui/icons-material/Person";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import Img from "../../assets/images/Section.png";
import "../../components/AdminComponent/table/table.scss";
import Footer from "../../components/UserComponent/Footer";
import { Link, useLocation } from "react-router-dom";
import FormField from "../../components/AdminComponent/profile/FormField";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import driver from "../../assets/wheel.svg";
import SeatButton from "../../components/UserComponent/SeatButton";

const SeatSelectPage = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  console.log(state);

  const initialValues = {
    journeyDate: "",
    pickupPoint: "",
    droppingPoint: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    journeyDate: Yup.date().required("Please provide an date"),
    pickupPoint: Yup.string().required("Please provide an pickup point"),
    droppingPoint: Yup.string().required("Please provide an dropping point"),
    gender: Yup.string().required("Please provide your gender"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await submit(
        values.journeyDate,
        values.pickupPoint,
        values.droppingPoint,
        values.gender
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("error");
      console.log(error);
    }
  };

  const seatRows = [
    { leftSeat1: "A1", leftSeat2: "A2", rightSeat1: "A3", rightSeat2: "A4" },
    { leftSeat1: "B1", leftSeat2: "B2", rightSeat1: "B3", rightSeat2: "B4" },
    { leftSeat1: "C1", leftSeat2: "C2", rightSeat1: "C3", rightSeat2: "C4" },
    { leftSeat1: "D1", leftSeat2: "D2", rightSeat1: "D3", rightSeat2: "D4" },
    { leftSeat1: "E1", leftSeat2: "E2", rightSeat1: "E3", rightSeat2: "E4" },
    { leftSeat1: "F1", leftSeat2: "F2", rightSeat1: "F3", rightSeat2: "F4" },
    { leftSeat1: "G1", leftSeat2: "G2", rightSeat1: "G3", rightSeat2: "G4" },
    { leftSeat1: "H1", leftSeat2: "H2", rightSeat1: "H3", rightSeat2: "H4" },
    { leftSeat1: "I1", leftSeat2: "I2", rightSeat1: "I3", rightSeat2: "I4" },
    { leftSeat1: "J1", leftSeat2: "J2", rightSeat1: "J3", rightSeat2: "J4" },
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
        <HeroBlock title="Seat Select Page" img={Img} />
      </div>

      <Container className="my-5">
        <div className="seat-select-page">
          <Row className="gx-xl-5 gy-4 gy-sm-5 justify-content-center gap-4">
            <Col className="col-lg-4 col-md-6 border px-4 py-5 fixed-column">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form className="login-form">
                    <div className="form-group mb-3">
                      <label htmlFor="journeyDate" className="mb-2">
                        Journey Date
                      </label>
                      <Field
                        type="date"
                        className="form-control"
                        name="journeyDate"
                      />
                      <ErrorMessage
                        name="journeyDate"
                        className="text-danger"
                        component="span"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="pickupPoint" className="mb-2">
                        Pickup Point
                      </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="pickupPoint"
                      >
                        <option>Kathmandu</option>
                        <option>Gaighat</option>
                        <option>Pokhara</option>
                      </Field>
                      <ErrorMessage
                        name="pickupPoint"
                        className="text-danger"
                        component="span"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="droppingPoint" className="mb-2">
                        Dropping Point
                      </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="droppingPoint"
                      >
                        <option>Kathmandu</option>
                        <option>Gaighat</option>
                        <option>Pokhara</option>
                      </Field>
                      <ErrorMessage
                        name="droppingPoint"
                        className="text-danger"
                        component="span"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="selectGender" className="mb-3">
                        Select Gender
                      </label>
                      <div className="d-flex justify-content-between">
                        <div className="form-check mb-2">
                          <Field
                            type="checkbox"
                            name="genderMale"
                            className="form-check-input"
                            id="genderMale"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="genderMale"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check mb-2">
                          <Field
                            type="checkbox"
                            name="genderFemale"
                            className="form-check-input"
                            id="genderFemale"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="genderFemale"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check mb-2">
                          <Field
                            type="checkbox"
                            name="genderOther"
                            className="form-check-input"
                            id="genderOther"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="genderOther"
                          >
                            Other
                          </label>
                        </div>

                        <ErrorMessage
                          name="gender"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={!isValid || !dirty || loading}
                    >
                      {loading ? "Loading..." : "Continue"}
                    </button>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col className="col-lg-4 col-md-6 bus-seat-container">
              <h6>Click on Seat to select or deselect</h6>
              <span className="fs--14px">
                Off Days: <span className="badge badge--success">Friday</span>
              </span>
              <div className="seat-plan-inner">
                <div className="single">
                  <span className="front">Front</span>
                  <span className="rear">Rear</span>
                  <span className="lower">Door</span>
                  <span className="driver">
                    <img src={driver} alt="driver" />
                  </span>

                  {seatRows.map((row, index) => (
                    <SeatButton
                      key={index}
                      leftSeat1={row.leftSeat1}
                      leftSeat2={row.leftSeat2}
                      rightSeat1={row.rightSeat1}
                      rightSeat2={row.rightSeat2}
                    />
                  ))}
                </div>
              </div>
              <div className="seat-for-reserved">
                <div className="seat-condition available-seat">
                  <span className="seat">
                    <span></span>
                  </span>
                  <p>Available Seats</p>
                </div>
                <div className="seat-condition selected-by-you">
                  <span className="seat bg-success">
                    <span className="bg-white"></span>
                  </span>
                  <p>Selected by You</p>
                </div>
                <div className="seat-condition unavailable">
                  <div className="seat bg-warning">
                    <span className="bg-white"></span>
                  </div>
                  <p>Unavailable</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <div className="user-footer mt-5">
        <Footer />
      </div>
    </>
  );
};

export default SeatSelectPage;
