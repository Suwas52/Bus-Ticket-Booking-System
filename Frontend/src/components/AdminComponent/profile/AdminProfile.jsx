import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form as BootstrapForm } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";
import defaultAvatar from "../../../assets/7309681.jpg";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../utils/axiosInstance";
import { CHANGEPASSWORD, UPDATEUSER, USER } from "../../../utils/globalConfig";

const ProfileSetting = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordIsLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userData, setUserData] = useState();
  console.log(userData?.profilePicture);
  console.log(userData);

  const fetchUserData = async () => {
    const response = await axiosInstance.get(`${USER}/${user.userName}`);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    address: userData?.address || "",
    phoneNumber: userData?.phoneNumber || "",
    gender: user?.gender || "",
    image: null,
  };

  const initialValuesForChangePassword = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is requried"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    gender: Yup.string().required("Gender is required"),
  });

  // Validation Scheme for Change Password
  const validationSchemaForChangePassword = Yup.object({
    currentPassword: Yup.string()
      .required("Old Password is required")
      .min(8, "Enter atleast 8 characters"),
    newPassword: Yup.string()
      .required("New Password is Required")
      .min(8, "Enter atleast 8 characters"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("FirstName", values.firstName);
    formData.append("LastName", values.lastName);
    formData.append("Address", values.address);
    formData.append("PhoneNumber", values.phoneNumber);
    formData.append("Gender", values.gender);

    if (values.image) {
      formData.append("Image", values.image);
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `${UPDATEUSER}/${user.userName}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      toast.success("update Successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const passwordChangeHandle = async (values) => {
    console.log(values);
    setChangePasswordIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `${CHANGEPASSWORD}/${user.userName}`,
        values
      );
      console.log(response);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      setChangePasswordIsLoading(false);
    } catch (error) {
      toast.error(error.data.message);
      setChangePasswordIsLoading(false);
    }
  };

  const changePasswordHandler = () => {
    setChangePassword(!changePassword);
  };

  return (
    <Container className="mt-5">
      {!changePassword && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, setFieldValue, values }) => (
            <Form>
              <Row>
                {/* <Col xs={12} md={2} className="d-flex">
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
              </Col> */}
                <Col xs={12} md={2} className="d-flex">
                  <img
                    src={userData?.profilePicture}
                    alt="Profile"
                    className="avatar-img rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Col>
                <Col xs={12} md={10}>
                  <BootstrapForm.Group as={Row} controlId="formName">
                    <BootstrapForm.Label column sm={3}>
                      First Name
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="Enter First name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formName">
                    <BootstrapForm.Label column sm={3}>
                      Last Name
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Enter Last name"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formEmail">
                    <BootstrapForm.Label column sm={3}>
                      Address
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your Address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formEmail">
                    <BootstrapForm.Label column sm={3}>
                      Phone Number
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Enter your Address"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formEmail">
                    <BootstrapForm.Label column sm={3}>
                      Gender
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="text"
                        name="gender"
                        className="form-control"
                        placeholder="Enter your Address"
                      />
                      <ErrorMessage
                        name="gender"
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
                        name="image"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                        className="form-control"
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>

                  {/* {changePassword && (
                  <>
                    <BootstrapForm.Group
                      as={Row}
                      controlId="formPassword"
                      className="mt-3"
                    >
                      <BootstrapForm.Label column sm={3}>
                        Old Password
                      </BootstrapForm.Label>
                      <Col sm={9} className="mb-3">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Password Old Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </BootstrapForm.Group>
                    <BootstrapForm.Group as={Row} controlId="formPassword">
                      <BootstrapForm.Label column sm={3}>
                        New Password
                      </BootstrapForm.Label>
                      <Col sm={9} className="mb-3">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter New Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </BootstrapForm.Group>
                    <BootstrapForm.Group as={Row} controlId="formPassword">
                      <BootstrapForm.Label column sm={3}>
                        Confirm Password
                      </BootstrapForm.Label>
                      <Col sm={9} className="mb-3">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Confirm Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </BootstrapForm.Group>
                  </>
                )} */}

                  <BootstrapForm.Group as={Row}>
                    <Col sm={{ span: 9, offset: 3 }}>
                      <button
                        type="submit"
                        className="btn btn-success mt-3"
                        disabled={!isValid || !dirty || changePasswordLoading}
                      >
                        {changePasswordLoading
                          ? "Updating Profile..."
                          : "Update Profile"}
                      </button>
                      <button
                        type="button"
                        className={
                          changePassword
                            ? "btn btn-primary mt-3 mx-4"
                            : "btn btn-secondary mt-3 mx-4"
                        }
                        onClick={changePasswordHandler}
                      >
                        Change Password
                      </button>
                    </Col>
                  </BootstrapForm.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      )}
      {changePassword && (
        <Formik
          initialValues={initialValuesForChangePassword}
          validationSchema={validationSchemaForChangePassword}
          onSubmit={passwordChangeHandle}
        >
          {({ isValid, dirty }) => (
            <Form>
              <Row>
                <Col xs={12} md={2} className="d-flex">
                  <img
                    src={userData?.profilePicture}
                    alt="Profile"
                    className="avatar-img rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Col>
                <Col xs={12} md={10}>
                  <BootstrapForm.Group
                    as={Row}
                    controlId="formPassword"
                    className="mt-3"
                  >
                    <BootstrapForm.Label column sm={3}>
                      Old Password
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        placeholder="Enter Password Old Password"
                      />
                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formPassword">
                    <BootstrapForm.Label column sm={3}>
                      New Password
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="password"
                        name="newPassword"
                        className="form-control"
                        placeholder="Enter New Password"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </BootstrapForm.Group>
                  <BootstrapForm.Group as={Row} controlId="formPassword">
                    <BootstrapForm.Label column sm={3}>
                      Confirm Password
                    </BootstrapForm.Label>
                    <Col sm={9} className="mb-3">
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Enter Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
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
                        {loading ? "Changing Password..." : "Update Passowrd"}
                      </button>
                      <button
                        type="button"
                        className={
                          changePassword
                            ? "btn btn-primary mt-3 mx-4"
                            : "btn btn-secondary mt-3 mx-4"
                        }
                        onClick={changePasswordHandler}
                      >
                        Change Password
                      </button>
                    </Col>
                  </BootstrapForm.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default ProfileSetting;
