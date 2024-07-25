import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Step = () => {
  return (
    <section className="steps-section text-center">
      <Container>
        <h2>Get Your Tickets With Just 3 Steps</h2>
        <Row>
          <Col md={4}>
            <div className="step-box">
              <h3>Search Your Bus</h3>
              <p>
                Choose your origin, destination, and bus journey dates to search
                for buses.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="step-box">
              <h3>Choose The Ticket</h3>
              <p>
                Choose your origin, destination, and bus for your journey dates
                to search for buses.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="step-box">
              <h3>Pay Bill</h3>
              <p>
                Choose your origin, destination, and bus for your journey dates
                to search for buses.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Step;
