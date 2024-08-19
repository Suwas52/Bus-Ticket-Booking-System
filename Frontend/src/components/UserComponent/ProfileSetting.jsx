import React, { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";

const ProfileSetting = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    address: "",
    state: "",
    zip_code: "",
    country: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please provide firstname"),
    lastName: Yup.string().required("Please provide lastname"),
    userName: Yup.string().required("Please enter username"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: Yup.string().min(8, "Please enter at least 8 characters"),
    address: Yup.string().required("Please enter address"),
    state: Yup.string().required("Please enter state"),
    zip_code: Yup.string().required("Please enter zip code"),
    country: Yup.string().required("Please enter country"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await profile_edit(
        values.firstName,
        values.lastName,
        values.userName,
        values.email,
        values.password,
        values.address,
        values.state,
        values.zip_code,
        values.country
      );
      setLoading(false);
    } catch (error) {
      toast.error("Something failed during profile update");
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="profile-container mt-5 mb-5">
        <h4>Profile Settings</h4>
        <div className="profile-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className="signup-form">
                <div className="row">
                  <div className="form-group custom-form-group  col-12 col-md-6">
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

                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Your Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="userName">Username</label>
                    <Field
                      type="text"
                      id="userName"
                      name="userName"
                      className="form-control"
                      placeholder="Enter Your Username"
                    />
                    <ErrorMessage
                      name="userName"
                      className="text-danger"
                      component="span"
                    />
                  </div>

                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="text"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                    />
                    <ErrorMessage
                      name="password"
                      className="text-danger"
                      component="span"
                    />
                  </div>

                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="state">State</label>
                    <Field
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      placeholder="Enter Your State"
                    />
                    <ErrorMessage
                      name="state"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="zip_code">Zip Code</label>
                    <Field
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      className="form-control"
                      placeholder="Enter Your Zip Code"
                    />
                    <ErrorMessage
                      name="zip_code"
                      className="text-danger"
                      component="span"
                    />
                  </div>

                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="country">Country</label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      className="form-control"
                      placeholder="Enter Your Country"
                    />
                    <ErrorMessage
                      name="country"
                      className="text-danger"
                      component="span"
                    />
                  </div>
                </div>

                <div className="form-group custom-form-group">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                  <ErrorMessage
                    name="address"
                    className="text-danger"
                    component="span"
                  />
                </div>

                <button
                  type="submit"
                  className="custom-button mt-3"
                  disabled={!isValid || !dirty || loading}
                >
                  {loading ? "Updating Profile..." : "Update Profile"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default ProfileSetting;