import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import {
  MANAGE_BUS,
  MANAGE_BUSSHEHEDULE,
  MANAGE_ROUTES,
} from "../../../utils/globalConfig";
import * as Yup from "yup";
import toast from "react-hot-toast";

const ScheduleCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleData, setScheduleData] = useState(null);
  const [busData, setBusData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  console.log(busData);
  console.log(routeData);
  console.log(scheduleData);

  useEffect(() => {
    if (busId) {
      fetchScheduleData(parseInt(scheduleId)); // Convert to integer
    }
    fetchBusData();
    fetchRouteData();
  }, []);

  const fetchScheduleData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_BUSSHEHEDULE}/${id}`);
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
    }
  };

  const fetchBusData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUS);
      setBusData(response.data);
    } catch (error) {}
  };

  const fetchRouteData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_ROUTES);
      setRouteData(response.data);
    } catch (error) {}
  };

  const initialValues = {
    busId: scheduleData?.busId || "",
    routeId: scheduleData?.routeId || "",
    departureTime: scheduleData?.departureTime || "",
    arrivalTime: scheduleData?.arrivalTime || "",
    frequencyDay: scheduleData?.frequencyDay || "", // Default value
  };

  const validationSchema = Yup.object({
    busId: Yup.number().required("Select bus name"),
    routeId: Yup.number().required("Select Route name"),
    departureTime: Yup.date().required("Select Date and Time"),
    arrivalTime: Yup.date().required("Select Date and Time"),
    frequencyDay: Yup.string().required("Select Bus Type"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      if (scheduleId) {
        // Update existing bus
        const response = await axiosInstance.put(
          `${MANAGE_BUSSHEHEDULE}/${parseInt(scheduleId)}`,
          values
        );
        if (response.status === 200) {
          toast.success("Bus Schedule updated successfully!");
        }
      } else {
        // Create new bus
        const response = await axiosInstance.post(MANAGE_BUSSHEHEDULE, values);
        if (response.status === 200) {
          toast.success("Bus Schedule created successfully!");
        }
      }
      navigate("/admin-dashboard/busSchedule/list");
    } catch (error) {
      setIsSubmitting(false);
      toast.error("An error occurred");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />
        <Card>
          <Card.Header>
            <h2 className="text-center">
              {scheduleId ? "Update Bus Schedule" : "Create New Bus Schedule"}
            </h2>
          </Card.Header>
          <Card.Body>
            <Container>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form>
                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label" id="busId">
                          Bus Name
                        </label>
                        <Field
                          as="select"
                          name="busId"
                          className="form-control"
                        >
                          <option value="AC" disabled>
                            Select Bus
                          </option>
                          {busData.map((i) => (
                            <option value={i.busId} key={i.busId}>
                              {i.busName}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="busId"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                      <Col className="form-group">
                        <label className="form-label" id="routeId">
                          Route Name
                        </label>
                        <Field
                          as="select"
                          name="routeId"
                          className="form-control"
                        >
                          <option value="AC" disabled>
                            Select Route
                          </option>
                          {routeData.map((i) => (
                            <option value={i.routeId} key={i.routeId}>
                              {i.startLocation} to {i.endLocation}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="routeId"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label" id="departureTime">
                          Departure Time
                        </label>
                        <Field
                          name="departureTime"
                          type="datetime-local"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="departureTime"
                          className="text-danger"
                          component="span"
                        />
                      </Col>

                      <Col className="form-group">
                        <label className="form-label" id="arrivalTime">
                          Arrival Time
                        </label>
                        <Field
                          name="arrivalTime"
                          type="datetime-local"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="arrivalTime"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label" id="frequencyDay">
                          Frequency Day
                        </label>
                        <Field
                          as="textarea"
                          placeholder="Enter any remarks"
                          name="frequencyDay"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="frequencyDay"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      {isSubmitting
                        ? scheduleId
                          ? "Updating schedule..."
                          : "Creating schedule..."
                        : scheduleId
                        ? "Update schedule"
                        : "Create schedule"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleCreate;
