import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_BUS } from "../../../utils/globalConfig";
import toast from "react-hot-toast";

const CreateBus = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    busName: "",
    busNumber: "",
    capacity: "",
    busType: "AC", // Default value
  };

  const validationSchema = Yup.object({
    busName: Yup.string().required("Enter bus name"),
    busNumber: Yup.string().required("Enter bus number"),
    capacity: Yup.number().required("Enter total capacity"),
    busType: Yup.string().required("Select Bus Type"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const response = await axiosInstance.post(MANAGE_BUS, values);
      console.log(response);
      if (response.status === 200) {
        toast("Bus created successfully!");
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />
        <Card className="">
          <Card.Header>
            <h2 className="text-center">Create New Bus</h2>
          </Card.Header>
          <Card.Body>
            <Container>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
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
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      {isSubmitting ? "Creating Bus..." : "Create Bus"}
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

export default CreateBus;
