import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("please enter valid email")
      .required("Please Provide Email"),
    password: Yup.string().required("Please Provide Password"),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      setData(values);
    } catch (error) {
      setError(error);
    }
  };

  console.log(data);

  return (
    <div className="login-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, dirty }) => (
          <Form className="login-form">
            <h2>Welcome to Bus Booking</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>

              <Field
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                className="text-danger"
                component="span"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
              <Link to={"/forgot-password"} className="float-right">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isValid || !dirty || isSubmitting}
            >
              Log In
            </button>
            <div className="link">
              <span>
                Don't have any Account? <a href="#">Sign Up</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
