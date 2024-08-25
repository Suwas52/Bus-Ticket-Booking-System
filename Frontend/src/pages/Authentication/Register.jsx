import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    address: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please provide firstname"),
    lastName: Yup.string().required("Please provide lastname"),
    userName: Yup.string().required("Please enter username"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: Yup.string().min(8, "Please enter atleast 8 character"),
    address: Yup.string().required("please enter address"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await register(
        values.firstName,
        values.lastName,
        values.userName,
        values.email,
        values.password,
        values.address
      );
      setLoading(false);
    } catch (error) {
      toast.error("Something is failed during register");
    }
  };

  return (
    <div className="signup-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="signup-form">
            <h2 className="text-center">Welcome to Bus Booking</h2>
            <Container>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>

                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter Your First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="form-control"
                      placeholder="Enter Your First Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="userName">UserName</label>
                    <Field
                      type="text"
                      id="userName"
                      className="form-control"
                      placeholder="Enter Your First Name"
                      name="userName"
                    />
                    <ErrorMessage
                      name="userName"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      id="address"
                      className="form-control"
                      placeholder="Enter Your First Name"
                      name="address"
                    />
                    <ErrorMessage
                      name="address"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      className="form-control"
                      placeholder="Enter Your First Name"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="text"
                      id="password"
                      className="form-control"
                      placeholder="Enter Your First Name"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </Col>
              </Row>

              {/* <Row>
                <Col>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                    />
                    <label className="form-check-label" htmlFor="terms">
                      Accepting all{" "}
                      <a href="#">
                        Refund Policy, Ticket Policies, Terms and Conditions
                      </a>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!isValid || !dirty || loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
