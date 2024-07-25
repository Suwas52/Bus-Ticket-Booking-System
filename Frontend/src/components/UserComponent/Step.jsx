import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Search from "@mui/icons-material/Search";
import Ticket from "@mui/icons-material/ConfirmationNumberOutlined";
import Payment from "@mui/icons-material/CreditCardOutlined";

const Step = () => {
  return (
    <section className="steps-section text-center">
      <Container>
        <h2>Get Your Tickets With Just 3 Steps</h2>

        <p>
          Have a look at our popular reason. why you should choose you bus. Just
          a bus and get a ticket for your great journey{" "}
        </p>

        <Row className="mt-4">
          <Col md={4}>
            <div className="step-box">
              <div className="circle-no">01</div>
              <div className="circle">
                <Search className="icon" />
              </div>
              <h4>Search Your Bus</h4>
              <p>
                Choose your origin, destination, and bus journey dates to search
                for buses.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="step-box">
              <div className="circle-no">02</div>
              <div className="circle">
                <Ticket className="icon" />
              </div>
              <h4>Choose The Ticket</h4>
              <p>
                Choose your origin, destination, and bus for your journey dates
                to search for buses.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="step-box">
              <div className="circle-no">03</div>
              <div className="circle">
                <Payment className="icon" />
              </div>
              <h4>Pay Bill</h4>
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
