import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { USERDETAIL } from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import useAuth from "../../hooks/useAuth";

const ProfileSetting = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  console.log(userData);

  const fetchLoginUser = async () => {
    const response = await axiosInstance.get(`${USERDETAIL}/${user.userName}`);
    setUserData(response.data);
  };
  useEffect(() => {
    fetchLoginUser();
  }, []);

  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    userName: userData?.userName || "",
    email: userData?.email || "",
    address: userData?.address || "",
    phoneNumber: userData?.phoneNumber || "",
    gender: user?.gender || "",
    profilePicture: userData?.profilePicture || null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please provide firstname"),
    lastName: Yup.string().required("Please provide lastname"),
    userName: Yup.string().required("Please enter username"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Please enter address"),
    phoneNumber: Yup.string().required("Please enter address"),
    gender: Yup.string().required("Select Gender"),
    profilePicture: Yup.mixed()
      .nullable()
      .required("Profile picture is required"),
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
            enableReinitialize
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
                    <label htmlFor="password">Address</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      placeholder="Enter Your address"
                    />
                    <ErrorMessage
                      name="address"
                      className="text-danger"
                      component="span"
                    />
                  </div>

                  <div className="form-group custom-form-group col-12 col-md-6">
                    <label htmlFor="state">Gender</label>
                    <Field as="select" name="gender" className="form-control">
                      <option hidden>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
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
