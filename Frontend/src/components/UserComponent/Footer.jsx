import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4}>
            <h5>ViserBus</h5>
            <p>
              Delicious culpa laborum debitis saepe. Commodi earum minus ab
              occaecati veniam deserunt est!
            </p>
            <div className="social-links">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </Col>
          <Col md={2}>
            <h5>Useful Links</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>Policies</h5>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Ticket Policies</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>Bringi Road Suite Dhaka 1209</p>
            <p>+44 6547 89700</p>
            <p>example@mail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
