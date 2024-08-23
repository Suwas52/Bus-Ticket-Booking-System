import React, { useState } from "react";
import { Col, Container, Row, Form as BootstrapForm } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";
import defaultAvatar from "../../../assets/7309681.jpg";
import useAuth from "../../../hooks/useAuth";

const ProfileSetting = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  console.log(user.id);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    profilePicture: Yup.mixed()
      .nullable()
      .required("Profile picture is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await profile_edit({
        name: values.name,
        email: values.email,
        password: values.password,
        profilePicture: values.profilePicture,
      }); // Assuming `profile_edit` is a function that accepts an object
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, setFieldValue, values }) => (
          <Form>
            <Row>
              <Col xs={12} md={2} className="d-flex">
                <img
                  src={
                    values.profilePicture
                      ? URL.createObjectURL(values.profilePicture)
                      : defaultAvatar
                  }
                  alt="Profile"
                  className="avatar-img rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </Col>
              <Col xs={12} md={10}>
                <BootstrapForm.Group as={Row} controlId="formName">
                  <BootstrapForm.Label column sm={3}>
                    Name
                  </BootstrapForm.Label>
                  <Col sm={9} className="mb-3">
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} controlId="formEmail">
                  <BootstrapForm.Label column sm={3}>
                    Email
                  </BootstrapForm.Label>
                  <Col sm={9} className="mb-3">
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} controlId="formPassword">
                  <BootstrapForm.Label column sm={3}>
                    Password
                  </BootstrapForm.Label>
                  <Col sm={9} className="mb-3">
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter new password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} controlId="formProfilePicture">
                  <BootstrapForm.Label column sm={3}>
                    Profile Picture
                  </BootstrapForm.Label>
                  <Col sm={9}>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={(event) => {
                        setFieldValue(
                          "profilePicture",
                          event.currentTarget.files[0]
                        );
                      }}
                      className="form-control"
                    />
                    <ErrorMessage
                      name="profilePicture"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row}>
                  <Col sm={{ span: 9, offset: 3 }}>
                    <button
                      type="submit"
                      className="btn btn-success mt-3"
                      disabled={!isValid || !dirty || loading}
                    >
                      {loading ? "Updating Profile..." : "Update Profile"}
                    </button>
                  </Col>
                </BootstrapForm.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProfileSetting;
