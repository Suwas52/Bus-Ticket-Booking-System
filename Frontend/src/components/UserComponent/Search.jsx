import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Road from "../../assets/images/road.png";
import StartPoint from "@mui/icons-material/Navigation";

const Search = () => {
  return (
    <div className="container-fluid search">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={7} className="">
            <h2>Get Your Ticket Online,</h2>
            <h2> Easy and Safely</h2>
            <button className="btn green-btn mt-2">Get Ticket Now</button>
          </Col>
          <Col md={5}>
            <h5>Choose Your Ticket</h5>
            <Card className="ticket-card">
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Select className="mb-3">
                        <option>Pickup Point</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select className="mb-3">
                        <option>Drop Point</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Departure Date"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-center">
                      <button className="btn green-btn px-5" type="submit">
                        Find Tickets
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Image src={Road} height={66} alt="Bus Logo" />
      </Container>
    </div>
  );
};

export default Search;
