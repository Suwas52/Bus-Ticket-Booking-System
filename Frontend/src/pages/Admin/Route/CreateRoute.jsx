import { useEffect, useState } from "react";
import { MANAGE_ROUTES } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../routes/path";
import * as Yup from "yup";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";

const CreateRoute = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (routeId) {
      fetchRouteData(parseInt(routeId)); // Convert to integer
    }
  }, []);
  console.log(routeData);

  const fetchRouteData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_ROUTES}/${id}`);
      setRouteData(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
      toast.error("Error fetching bus data");
    }
  };

  const initialValues = {
    startLocation: routeData?.startLocation || "",
    endLocation: routeData?.endLocation || "",
    distance: routeData?.distance || "",
  };

  const validationSchema = Yup.object({
    startLocation: Yup.string().required("Enter Starting Location name"),
    endLocation: Yup.string().required("Enter End Location name"),
    distance: Yup.number().required("Enter total distance"),
  });

  const handleSubmit = async (values) => {
    try {
      // setIsSubmitting(true);
      if (routeId) {
        // Update existing bus
        const response = await axiosInstance.put(
          `${MANAGE_ROUTES}/${parseInt(routeId)}`,
          values
        );
        if (response.status === 200) {
          toast.success("Route updated successfully!");
        }
      } else {
        // Create new bus
        const response = await axiosInstance.post(MANAGE_ROUTES, values);
        if (response.status === 200) {
          toast.success("Route created successfully!");
        }
      }
      navigate(PATH_DASHBOARD.routeList);
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
              {routeId ? "Update Route" : "Create New Route"}
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
                        <label className="form-label" id="startLocation">
                          Start Location
                        </label>
                        <Field
                          type="text"
                          placeholder="Enter bus name"
                          name="startLocation"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="startLocation"
                          className="text-danger"
                          component="span"
                        />
                      </Col>

                      <Col className="form-group">
                        <label className="form-label" id="endLocation">
                          End Location
                        </label>
                        <Field
                          type="text"
                          placeholder="Enter bus number"
                          name="endLocation"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="endLocation"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col className="form-group">
                        <label className="form-label" id="distance">
                          Total Distance
                        </label>
                        <Field
                          type="number"
                          placeholder="Enter capacity"
                          name="distance"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="distance"
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
                        ? routeId
                          ? "Updating Route..."
                          : "Creating Route..."
                        : routeId
                        ? "Update Route"
                        : "Create Route"}
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

export default CreateRoute;
