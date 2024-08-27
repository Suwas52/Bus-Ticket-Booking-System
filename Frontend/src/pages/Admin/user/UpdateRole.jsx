import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../components/AdminComponent/sidebar/Sidebar';
import Navbar from '../../../components/AdminComponent/navbar/Navbar';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { UPDATEUSER_ROLE, USERDETAIL } from '../../../utils/globalConfig';
import axiosInstance from '../../../utils/axiosInstance';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '../../../routes/path';

const UpdateRole = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetail, setUserDetail] = useState();
  console.log(userDetail);
  
  const { userName } = useParams();
  const navigate = useNavigate();
  console.log(userName);

  useEffect(()=>{
    fetchUserData(userName);
  },[]);

  const fetchUserData = async (userName) => {
    try {
      const response = await axiosInstance.get(`${USERDETAIL}/${userName}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
    }
  };

  const initialValues = {
    userName: userDetail?.userName || "",
    newRole: userDetail?.role || "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("username is not select"),
    newRole: Yup.string().required("Select new role"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      
      const response = await axiosInstance.post(
        UPDATEUSER_ROLE,
        values
      );
      if (response.status === 200) {
        toast.success("Update User Role");
      }
      
      navigate(PATH_DASHBOARD.userList);
      setIsSubmitting(false);
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
              Update User Role
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
                        <label className="form-label" id="departureTime">
                          User Name
                        </label>
                        <Field
                        disabled
                          name="userName"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="userName"
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
                          name="newRole"
                          className="form-control"
                        >
                          <option  hidden>
                            Select Role
                          </option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="STAFF">STAFF</option>
                          <option value="USER">USER</option>
                        </Field>
                        <ErrorMessage
                          name="newRole"
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
                        ? "Updating Role..."
                        : "Update Role"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default UpdateRole