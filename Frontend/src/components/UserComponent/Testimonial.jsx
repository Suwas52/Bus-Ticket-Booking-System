import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Img1 from "../../assets/images/avatar.jpeg";

const Testimonial = () => {
  return (
    <section className="testimonials-section text-center">
      <Container>
        <h2>Our Testimonials</h2>
        <div className="description text-center container-fluid">
          <p>
            Have a look at our popular reason. why you should choose you bus.
            Just a bus and get a ticket for your great journey
          </p>
        </div>
        <Row>
          <Col md={8} className="mx-auto">
            <div className="testimonial-box">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes.
              </p>
              <div className="avatar mb-3">
                <Image src={Img1} alt="Bus Logo" />
              </div>
              <h5>Parvin Akter</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonial;
