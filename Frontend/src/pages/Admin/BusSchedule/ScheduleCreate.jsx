import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

const ScheduleCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busScheduleData, setBusScheduleData] = useState(null);
  const { scheduleId } = useParams();
  const navigate = useNavigate();
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
              // enableReinitialize
              // initialValues={initialValues}
              // validationSchema={validationSchema}
              // onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form>
                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label">Bus Name</label>
                        <Field
                          type="text"
                          placeholder="Enter bus name"
                          name="busName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="busName"
                          className="text-danger"
                          component="span"
                        />
                      </Col>

                      <Col className="form-group">
                        <label className="form-label">Bus Number</label>
                        <Field
                          type="text"
                          placeholder="Enter bus number"
                          name="busNumber"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="busNumber"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label">Capacity</label>
                        <Field
                          type="number"
                          placeholder="Enter capacity"
                          name="capacity"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="capacity"
                          className="text-danger"
                          component="span"
                        />
                      </Col>

                      <Col className="form-group">
                        <label className="form-label">Bus Type</label>
                        <Field
                          as="select"
                          name="busType"
                          className="form-control"
                        >
                          <option value="AC">AC</option>
                          <option value="NonAC">Non-AC</option>
                        </Field>
                        <ErrorMessage
                          name="busType"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid || !dirty}
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
