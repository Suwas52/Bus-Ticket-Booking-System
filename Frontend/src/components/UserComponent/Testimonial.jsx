import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Testimonial = () => {
  return (
    <section className="testimonials-section text-center">
      <Container>
        <h2>Our Testimonials</h2>
        <Row>
          <Col md={8} className="mx-auto">
            <div className="testimonial-box">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes.
              </p>
              <h3>Parvin Akter</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonial;
