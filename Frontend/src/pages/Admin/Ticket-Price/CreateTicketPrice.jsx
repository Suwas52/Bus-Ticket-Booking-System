import React, { useEffect, useState } from "react";
import {
  MANAGE_ROUTES,
  MANAGE_TICKET_PRICE,
} from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../routes/path";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const CreateTicketPrice = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketPrice, setTicketPrice] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const { priceId } = useParams();
  const navigate = useNavigate();
  console.log(routeData);
  console.log(priceId);
  console.log(ticketPrice);

  useEffect(() => {
    if (priceId) {
      fetchTicketPrice(parseInt(priceId));
    }
    fetchRouteData();
  }, []);

  const fetchTicketPrice = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_TICKET_PRICE}/${id}`);
      setTicketPrice(response.data);
    } catch (error) {
      console.error("Error fetching ticket price", error);
    }
  };

  const fetchRouteData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_ROUTES);
      setRouteData(response.data);
    } catch (error) {}
  };

  const initialValues = {
    routeId: ticketPrice?.routeId || "",
    basePrice: ticketPrice?.basePrice || "",
  };

  const validationSchema = Yup.object({
    routeId: Yup.number().required("Select Route name"),
    basePrice: Yup.number()
      .required("Enter Price")
      .positive("Price must be a positive number"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      if (priceId) {
        const response = await axiosInstance.put(
          `${MANAGE_TICKET_PRICE}/${parseInt(priceId)}`,
          values
        );
        if (response.status === 200) {
          toast.success("Ticket Price updated successfully!");
        }
      } else {
        const response = await axiosInstance.post(MANAGE_TICKET_PRICE, values);
        if (response.status === 200) {
          toast.success("Ticket Price created successfully!");
        }
      }
      navigate(PATH_DASHBOARD.ticketPriceList);
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
              {priceId ? "Update Ticket Price" : "Update Ticket Price"}
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
                        <label className="form-label" id="routeId">
                          Route Name
                        </label>
                        <Field
                          as="select"
                          name="routeId"
                          className="form-control"
                        >
                          <option value="AC" disabled>
                            Select Route
                          </option>
                          {routeData.map((i) => (
                            <option value={i.routeId} key={i.routeId}>
                              {i.startLocation} to {i.endLocation}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="routeId"
                          className="text-danger"
                          component="span"
                        />
                      </Col>
                      <Col className="form-group">
                        <label className="form-label" id="frequencyDay">
                          Price
                        </label>
                        <Field
                          type="number"
                          placeholder="Enter Number"
                          name="basePrice"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="basePrice"
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
                        ? priceId
                          ? "Updating Ticket Price..."
                          : "Creating Ticket Price..."
                        : priceId
                        ? "Update Ticket Price"
                        : "Create Ticket Price"}
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

export default CreateTicketPrice;
