import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Road from "../../assets/images/road.png";
import axiosInstance from "../../utils/axiosInstance";
import { MANAGE_ROUTES, SEARCH_BUSES } from "../../utils/globalConfig";
import * as Yup from "yup";
import { PATH_AUTHUSER } from "../../routes/path";
import toast from "react-hot-toast";

const Search = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const navigate = useNavigate();

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
    <div className="container-fluid search">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={7}>
            <h1>Get Your Ticket Online,</h1>
            <h1> Easy and Safely</h1>
            <button className="btn green-btn mt-2">Get Ticket Now</button>
          </Col>
          <Col md={5}>
            <h5>Choose Your Ticket</h5>
            <Card className="ticket-card">
              <Card.Body>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSearch}
                >
                  {({ isValid, dirty }) => (
                    <Form>
                      <Row>
                        <Col>
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
                        <Col>
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
                      </Row>
                      <Row>
                        <Col>
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
                      </Row>

                      <Row>
                        <Col className="d-flex justify-content-center">
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Image src={Road} height={66} alt="Bus Logo" />
        </Row>
      </Container>
    </div>
  );
};

export default Search;
