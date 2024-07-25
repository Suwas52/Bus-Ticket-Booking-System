import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Amenities = () => {
  return (
    <section className="amenities-section text-center">
      <Container>
        <h2>Our Amenities</h2>
        <Row>
          <Col md={3}>
            <div className="amenity-box">
              <i className="fa fa-wifi"></i>
              <p>Wifi</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="amenity-box">
              <i className="fa fa-bed"></i>
              <p>Pillow</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="amenity-box">
              <i className="fa fa-tint"></i>
              <p>Water Bottle</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="amenity-box">
              <i className="fa fa-coffee"></i>
              <p>Soft Drinks</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Amenities;
