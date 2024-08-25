import React, { useEffect, useState } from "react";
import Header from "../../components/UserComponent/Header";
import Footer from "../../components/UserComponent/Footer";
import { Col, Container, Row } from "react-bootstrap";
import CheckBox from "../../components/UserComponent/TagsInput/CheckBox";
import Time from "@mui/icons-material/AccessTimeOutlined";
import Route from "@mui/icons-material/AltRouteOutlined";
import Bus from "@mui/icons-material/DirectionsBusFilledOutlined";
import FilterCard from "../../components/UserComponent/Card/FilterCard";
import SwipeUpAltOutlinedIcon from "@mui/icons-material/SwipeUpAltOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MANAGE_ROUTES, SEARCH_BUSES } from "../../utils/globalConfig";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { PATH_AUTHUSER } from "../../routes/path";

const FilterPage = () => {
  const { state } = useLocation();
  const { buses } = state || { buses: [] };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const navigate = useNavigate();

  console.log(buses);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_ROUTES);
      setRouteData(response.data);
    } catch (error) {
      console.error("Error fetching routes", error);
    }
  };

  const initialValues = {
    startLocation: "",
    endLocation: "",
    departureTime: "",
  };

  const validationSchema = Yup.object({
    startLocation: Yup.string().required("Select Pickup Point"),
    endLocation: Yup.string().required("Select Drop Point"),
    departureTime: Yup.date().required("Select Date and Time"),
  });

  const handleSearch = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.get(SEARCH_BUSES, {
        params: {
          startLocation: values.startLocation,
          endLocation: values.endLocation,
          departureTime: values.departureTime,
        },
      });

      if (response.status === 200) {
        navigate(PATH_AUTHUSER.filter, { state: { buses: response.data } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors;

        toast.error(serverErrors);

        if (serverErrors) {
          const fieldErrors = {};
          serverErrors.forEach((err) => {
            if (err.field === "startLocation") {
              fieldErrors.startLocation = err.message;
            } else if (err.field === "endLocation") {
              fieldErrors.endLocation = err.message;
            } else if (err.field === "departureTime") {
              fieldErrors.departureTime = err.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          setStatus({
            general: "No buses available for the selected route and date.",
          });
        }
      } else {
        setStatus({ general: "Something went wrong. Please try again later." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid heropart d-flex justify-content-center align-items-end">
        <Container className="top-filter">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSearch}
          >
            {({ isValid, dirty }) => (
              <Form>
                <Row>
                  <Col xs={12} sm={6} md={3}>
                    <Field
                      as="select"
                      className="form-control mb-3"
                      name="startLocation"
                    >
                      <option value="">Select Pickup Point</option>
                      {routeData?.map((i) => (
                        <option value={i.startLocation} key={i.routeId}>
                          {i.startLocation}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="startLocation"
                      className="text-danger"
                      component="span"
                    />
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Field
                      as="select"
                      className="form-control mb-3"
                      name="endLocation"
                    >
                      <option value="">Select Drop Point</option>
                      {routeData?.map((i) => (
                        <option value={i.endLocation} key={i.routeId}>
                          {i.endLocation}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="endLocation"
                      className="text-danger"
                      component="span"
                    />
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Field
                      name="departureTime"
                      type="datetime-local"
                      className="form-control mb-3"
                    />
                    <ErrorMessage
                      name="departureTime"
                      className="text-danger"
                      component="span"
                    />
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <button
                      className="btn green-btn px-5"
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Find Tickets
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
      <div className="container-fluid mid pb-5">
        <Container>
          <Row>
            {/* <Col xs={12} md={4} lg={3} className="filter mb-4 mb-md-0 mt-5">
              <div className="top-filter">
                <h5>Filter</h5>
                <button className="btn-reset">Reset All</button>
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Vehicle Type</h6>
                <CheckBox name="Classic" Icon={Bus} />
                <CheckBox name="Coach" Icon={Bus} />
                <CheckBox name="Ac" Icon={Bus} />
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Routes</h6>
                <CheckBox name=" Kansas to Echo Bass" Icon={Route} />
                <CheckBox name="Witchita to Echo Bass" Icon={Route} />
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Departure Time</h6>
                <CheckBox name=" 06:00 am - 03:30 pm" Icon={Time} />
                <CheckBox name=" 07:00 am - 04:00 pm" Icon={Time} />
                <CheckBox name=" 08:00 am - 04:30 pm" Icon={Time} />
              </div>
            </Col> */}
            {/* <Col xs={12} md={8} lg={9} className="mt-5">
              <div className="container-fluid list">
                {buses.map((data, index) => (
                  <FilterCard
                    key={index}
                    busId={data.busId}
                    scheduleId={data.scheduleId}
                    busName={data.busName}
                    busType={data.busType}
                    startPoint={data.startLocation}
                    endPoint={data.endLocation}
                    price={data.price}
                    distance={data.distance}
                    departureTime={data.departureTime}
                    arrivalTime={data.arrivalTime}
                  />
                ))}
              </div>
            </Col> */}
            <Col className="mt-5">
              <div className="container-fluid list">
                {buses.map((data, index) => (
                  <FilterCard
                    key={index}
                    busId={data.busId}
                    scheduleId={data.scheduleId}
                    busName={data.busName}
                    busType={data.busType}
                    startPoint={data.startLocation}
                    endPoint={data.endLocation}
                    price={data.price}
                    distance={data.distance}
                    departureTime={data.departureTime}
                    arrivalTime={data.arrivalTime}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default FilterPage;
