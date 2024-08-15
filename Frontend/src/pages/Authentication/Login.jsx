import { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [visible, setVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setVisibility(!visible);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please provide an email"),
    password: Yup.string()
      .required("Please provide a password")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="login-form">
            <h2>Welcome to Bus Booking</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <div className="password-input-container">
                <Field
                  type={visible ? "text" : "password"}
                  name="password"
                  className="form-control password-field"
                  placeholder="Enter Password"
                />
                {visible ? (
                  <VisibilityOutlinedIcon
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>

              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-check">
              <Field
                type="checkbox"
                name="rememberMe"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
              <Link to="/forgot-password" className="float-right">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isValid || !dirty || loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <div className="link">
              <span>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
