import React, { useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FormField from "../../components/AdminComponent/profile/FormField";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import driver from "../../assets/wheel.svg";
import SeatButton from "../../components/UserComponent/SeatButton";
import { MANAGE_BOOKING, MANAGE_SEAT } from "../../utils/globalConfig";
// import axiosInstance from "../../../utils/axiosInstance";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { PATH_AUTHUSER } from "../../routes/path";

const SeatSelectPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookingId } = useParams();

  const [seats, setSeats] = useState([]);

  console.log(seats);

  useEffect(() => {
    fetchBusSeatData(state?.busId);
  }, []);

  const fetchBusSeatData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_SEAT}/${id}`);
      setSeats(response.data);
    } catch (error) {}
  };

  const initialValues = {
    scheduleId: state?.scheduleId || "",
    // departureTime: state.departureTime || "",
    seatId: "",
    passengerName: "",
    gender: "",
    age: "",
  };

  const validationSchema = Yup.object({
    // journeyDate: Yup.date().required("Please provide an date"),
    // pickupPoint: Yup.string().required("Please provide an pickup point"),
    // droppingPoint: Yup.string().required("Please provide an dropping point"),
    // gender: Yup.string().required("Please provide your gender"),
    scheduleId: Yup.number().required("Please provide an date"),
    seatId: Yup.number().required("Select Seat"),
    passengerName: Yup.string().required("Provide Passenger Name"),
    gender: Yup.string().required("Select Gender"),
    age: Yup.number().required("Enter age"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (bookingId) {
        const response = await axiosInstance.put(
          `${MANAGE_BOOKING}/${parseInt(bookingId)}`,
          values
        );
        if (response.status === 200) {
          toast.success("Bus Schedule updated successfully!");
        }
      } else {
        const response = await axiosInstance.post(MANAGE_BOOKING, values);
        if (response.status === 200) {
          toast.success("Bus Schedule created successfully!");
        }

        if (response.status >= 400) {
          toast.error("Seat is dafad");
        }
      }
      navigate(PATH_AUTHUSER.userBooked);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage =
          error.response.data.message || "An error occurred!";

        // Display error message using toast
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Seat is not Available");
      } else {
        // Something else caused the error
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     setIsSubmitting(true);
  //     if (scheduleId) {
  //       // Update existing bus
  //       const response = await axiosInstance.put(
  //         `${MANAGE_BUSSHEHEDULE}/${parseInt(scheduleId)}`,
  //         values
  //       );
  //       if (response.status === 200) {
  //         toast.success("Bus Schedule updated successfully!");
  //       }
  //     } else {
  //       // Create new bus
  //       const response = await axiosInstance.post(MANAGE_BUSSHEHEDULE, values);
  //       if (response.status === 200) {
  //         toast.success("Bus Schedule created successfully!");
  //       }
  //     }
  //     navigate("/admin-dashboard/busSchedule/list");
  //   } catch (error) {
  //     setIsSubmitting(false);
  //     toast.error("An error occurred");
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const seatRows = [
  //   { leftSeat1: "A1", leftSeat2: "A2", rightSeat1: "A3", rightSeat2: "A4" },
  //   { leftSeat1: "B1", leftSeat2: "B2", rightSeat1: "B3", rightSeat2: "B4" },
  //   { leftSeat1: "C1", leftSeat2: "C2", rightSeat1: "C3", rightSeat2: "C4" },
  //   { leftSeat1: "D1", leftSeat2: "D2", rightSeat1: "D3", rightSeat2: "D4" },
  //   { leftSeat1: "E1", leftSeat2: "E2", rightSeat1: "E3", rightSeat2: "E4" },
  //   { leftSeat1: "F1", leftSeat2: "F2", rightSeat1: "F3", rightSeat2: "F4" },
  //   { leftSeat1: "G1", leftSeat2: "G2", rightSeat1: "G3", rightSeat2: "G4" },
  //   { leftSeat1: "H1", leftSeat2: "H2", rightSeat1: "H3", rightSeat2: "H4" },
  //   { leftSeat1: "I1", leftSeat2: "I2", rightSeat1: "I3", rightSeat2: "I4" },
  //   { leftSeat1: "J1", leftSeat2: "J2", rightSeat1: "J3", rightSeat2: "J4" },
  // ];
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form className="login-form">
                    {/* <div className="form-group mb-3">
                      <label htmlFor="journeyDate" className="mb-2">
                        Departure Date
                      </label>
                      <Field
                        type="date"
                        className="form-control"
                        name="departureTime"
                      />
                       <ErrorMessage
                        name="journeyDate"
                        className="text-danger"
                        component="span"
                      /> 
                    </div> */}

                    <div className="form-group mb-3">
                      {/* <label htmlFor="journeyDate" className="mb-2">
                        Departure Date
                      </label> */}
                      <Field
                        type="number"
                        className="form-control"
                        name="scheduleId"
                        hidden
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="pickupPoint" className="mb-2">
                        Seat
                      </label>
                      <Field as="select" className="form-control" name="seatId">
                        <option hidden>Select Seat</option>
                        {seats.map((data, i) => (
                          <option key={data.seatId} value={data.seatId}>
                            {data.seatName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="seatId"
                        className="text-danger"
                        component="span"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="droppingPoint" className="mb-2">
                        Gender
                      </label>
                      <Field as="select" className="form-control" name="gender">
                        <option hidden>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        className="text-danger"
                        component="span"
                      />
                    </div>

                    {/* <div className="mb-4">
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
                    </div> */}
                    <div className="form-group mb-3">
                      <label htmlFor="journeyDate" className="mb-2">
                        Passenger Name
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="passengerName"
                        placeholder="Enter Passenger Name"
                      />
                      <ErrorMessage
                        name="passengerName"
                        className="text-danger"
                        component="span"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="journeyDate" className="mb-2">
                        Age
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        name="age"
                        placeholder="Enter Age"
                      />
                      <ErrorMessage
                        name="age"
                        className="text-danger"
                        component="span"
                      />
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
            {/* <Col className="col-lg-4 col-md-6 bus-seat-container">
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
            </Col> */}
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

// import React, { useState, useEffect } from "react";
// import {
//   Col,
//   Container,
//   Image,
//   Nav,
//   Navbar,
//   NavDropdown,
//   NavLink,
//   Row,
// } from "react-bootstrap";
// import Logo from "../../assets/images/logo.png";
// import Phone from "@mui/icons-material/LocalPhoneOutlined";
// import Email from "@mui/icons-material/MailOutline";
// import UserLogo from "@mui/icons-material/Person";
// import HeroBlock from "../../components/UserComponent/HeroBlock";
// import Img from "../../assets/images/Section.png";
// import "../../components/AdminComponent/table/table.scss";
// import Footer from "../../components/UserComponent/Footer";
// import { Link, useLocation } from "react-router-dom";
// import FormField from "../../components/AdminComponent/profile/FormField";
// import * as Yup from "yup";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import driver from "../../assets/wheel.svg";
// import SeatButton from "../../components/UserComponent/SeatButton";
// import axiosInstance from "../../utils/axiosInstance";
// import { MANAGE_SEAT } from "../../utils/globalConfig";
// // import axiosInstance from "../../../utils/axiosInstance";
// const SeatSelectPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { state } = useLocation();
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   console.log(selectedSeats);
//   console.log(state?.busId);

//   useEffect(() => {
//     fetchBusSeatData(state?.busId);
//   }, []);

//   const fetchBusSeatData = async (id) => {
//     try {
//       const response = await axiosInstance.get(`${MANAGE_SEAT}/${id}`);
//       setSeats(response.data);
//     } catch (error) {}
//   };

//   const initialValues = {
//     journeyDate: "",
//     pickupPoint: "",
//     droppingPoint: "",
//     gender: "",
//   };

//   const validationSchema = Yup.object({
//     journeyDate: Yup.date().required("Please provide a date"),
//     pickupPoint: Yup.string().required("Please provide a pickup point"),
//     droppingPoint: Yup.string().required("Please provide a dropping point"),
//     gender: Yup.string().required("Please provide your gender"),
//   });

//   const handleSubmit = async (values) => {
//     try {
//       setLoading(true);
//       await submit(
//         values.journeyDate,
//         values.pickupPoint,
//         values.droppingPoint,
//         values.gender
//       );
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       toast.error("Error");
//       console.log(error);
//     }
//   };

//   const toggleSeatSelection = (seatId) => {
//     setSelectedSeats(
//       (prevSelectedSeats) =>
//         prevSelectedSeats.includes(seatId)
//           ? prevSelectedSeats.filter((id) => id !== seatId) // Deselect seat
//           : [...prevSelectedSeats, seatId] // Select seat
//     );
//   };

//   // Function to group seats into rows based on seat numbers
//   const getSeatRows = (seats) => {
//     const rows = [];
//     for (let i = 0; i < seats.length; i += 4) {
//       rows.push({
//         leftSeat1: seats[i]?.seatName || "",
//         leftSeat2: seats[i + 1]?.seatName || "",
//         rightSeat1: seats[i + 2]?.seatName || "",
//         rightSeat2: seats[i + 3]?.seatName || "",
//       });
//     }
//     return rows;
//   };

//   const seatRows = getSeatRows(seats);

//   console.log(seatRows);

//   return (
//     <>
//       <div className="header">
//         <Navbar className="top-header" bg="light" expand="lg">
//           <Container className="px-4">
//             <div className="contact-info">
//               <Phone className="icon" /> +44 6547 8901 &nbsp;&nbsp;
//               <Email className="icon" /> example@example.com
//               <UserLogo className="icon" />
//             </div>
//           </Container>
//         </Navbar>

//         <Navbar className="test" bg="light" expand="lg">
//           <Container>
//             <Navbar.Brand href="#home">
//               <Image src={Logo} height={50} alt="Bus Logo" />
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mx-auto gap-3">
//                 <NavLink href="/">Dashboard</NavLink>
//                 <NavDropdown title="Booking" id="booking">
//                   <NavDropdown.Item href="#action1">action1</NavDropdown.Item>
//                   <NavDropdown.Item href="#action2">action2</NavDropdown.Item>
//                 </NavDropdown>
//                 <NavDropdown title="Profile" id="profile">
//                   <Link
//                     to={"/profile-setting"}
//                     className="text-decoration-none"
//                   >
//                     <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
//                   </Link>
//                   <NavDropdown.Item href="#action2">Logout</NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//               <Nav className="ms-auto">
//                 <button className="btn green-btn btn-sm">BUY TICKETS</button>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </div>

//       <div className="hero-block">
//         <HeroBlock title="Seat Select Page" img={Img} />
//       </div>

//       <Container className="my-5">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isValid, dirty }) => (
//             <Form className="login-form">
//               <div className="seat-select-page">
//                 <Row className="gx-xl-5 gy-4 gy-sm-5 justify-content-center gap-4">
//                   <Col className="col-lg-4 col-md-6 border px-4 py-5 fixed-column">
//                     <div className="form-group mb-3">
//                       <label htmlFor="journeyDate" className="mb-2">
//                         Journey Date
//                       </label>
//                       <Field
//                         type="date"
//                         className="form-control"
//                         name="journeyDate"
//                       />
//                       <ErrorMessage
//                         name="journeyDate"
//                         className="text-danger"
//                         component="span"
//                       />
//                     </div>

//                     <div className="form-group mb-3">
//                       <label htmlFor="pickupPoint" className="mb-2">
//                         Pickup Point
//                       </label>
//                       <Field
//                         as="select"
//                         className="form-control"
//                         name="pickupPoint"
//                       >
//                         <option>Kathmandu</option>
//                         <option>Gaighat</option>
//                         <option>Pokhara</option>
//                       </Field>
//                       <ErrorMessage
//                         name="pickupPoint"
//                         className="text-danger"
//                         component="span"
//                       />
//                     </div>

//                     <div className="form-group mb-3">
//                       <label htmlFor="droppingPoint" className="mb-2">
//                         Dropping Point
//                       </label>
//                       <Field
//                         as="select"
//                         className="form-control"
//                         name="droppingPoint"
//                       >
//                         <option>Kathmandu</option>
//                         <option>Gaighat</option>
//                         <option>Pokhara</option>
//                       </Field>
//                       <ErrorMessage
//                         name="droppingPoint"
//                         className="text-danger"
//                         component="span"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label htmlFor="selectGender" className="mb-3">
//                         Select Gender
//                       </label>
//                       <div className="d-flex justify-content-between">
//                         <div className="form-check mb-2">
//                           <Field
//                             type="checkbox"
//                             name="genderMale"
//                             className="form-check-input"
//                             id="genderMale"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="genderMale"
//                           >
//                             Male
//                           </label>
//                         </div>

//                         <div className="form-check mb-2">
//                           <Field
//                             type="checkbox"
//                             name="genderFemale"
//                             className="form-check-input"
//                             id="genderFemale"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="genderFemale"
//                           >
//                             Female
//                           </label>
//                         </div>

//                         <div className="form-check mb-2">
//                           <Field
//                             type="checkbox"
//                             name="genderOther"
//                             className="form-check-input"
//                             id="genderOther"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="genderOther"
//                           >
//                             Other
//                           </label>
//                         </div>

//                         <ErrorMessage
//                           name="gender"
//                           className="text-danger"
//                           component="span"
//                         />
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       className="btn btn-success w-100"
//                       disabled={!isValid || !dirty || loading}
//                     >
//                       {loading ? "Loading..." : "Continue"}
//                     </button>
//                   </Col>
//                   <Col className="col-lg-4 col-md-6 bus-seat-container">
//                     <h6>Click on Seat to select or deselect</h6>
//                     <span className="fs--14px">
//                       Off Days:{" "}
//                       <span className="badge badge--success">Friday</span>
//                     </span>
//                     <div className="seat-plan-inner">
//                       <div className="single">
//                         <span className="front">Front</span>
//                         <span className="rear">Rear</span>
//                         <span className="lower">Door</span>
//                         <span className="driver">
//                           <img src={driver} alt="driver" />
//                         </span>

//                         {seatRows.map((data, index) => (
//                           <SeatButton
//                             data={data}
//                             key={index}
//                             isSelected={selectedSeats.includes(data?.seatId)}
//                             toggleSeatSelection={() =>
//                               toggleSeatSelection(data?.seatId)
//                             }
//                           />
//                         ))}
//                         {/* <SeatButton seat={row.leftSeat2} />
//                     <SeatButton seat={row.rightSeat1} />
//                     <SeatButton seat={row.rightSeat2} /> */}
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default SeatSelectPage;
