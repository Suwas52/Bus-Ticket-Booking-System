import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Facebook from "@mui/icons-material/FacebookOutlined";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import Linkedin from "@mui/icons-material/LinkedIn";
import Logo from "../../assets/images/logo.png";
import Point from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

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
                <Facebook className="icon" />
              </a>
              <a href="#">
                <Twitter className="icon" />
              </a>
              <a href="#">
                <Instagram className="icon" />
              </a>
              <a href="#">
                <Linkedin className="icon" />
              </a>
            </div>
          </Col>
          <Col md={2}>
            <h5>Useful Links</h5>

            <ul>
              <li>
                <Point className="icon" />
                <a href="#">About</a>
              </li>
              <li>
                <Point />
                <a href="#">FAQs</a>
              </li>
              <li>
                <Point />
                <a href="#">Blog</a>
              </li>
              <li>
                <Point />
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Policies</h5>
            <ul>
              <li>
                <Point className="icon" />
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <Point className="icon" />
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <Point className="icon" />
                <a href="#">Ticket Policies</a>
              </li>
              <li>
                <Point className="icon" />
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Info</h5>
            <p>Bringi Road Suite Dhaka 1209</p>
            <p>+44 6547 89700</p>
            <p>yatra@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
