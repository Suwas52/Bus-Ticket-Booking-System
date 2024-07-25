import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Wifi from "@mui/icons-material/WifiOutlined";
import Bed from "@mui/icons-material/BedOutlined";
import Bottle from "@mui/icons-material/LocalDrink";
import Drink from "@mui/icons-material/WineBar";

const Amenities = () => {
  return (
    <section className="amenities-section text-center">
      <Container className="container">
        <h2>Our Amenities</h2>
        <div className="description text-center">
          <p>
            Have a look at our popular reason. why you should choose you bus.
            Just a bus and get a ticket for your great journey
          </p>
        </div>
        <Row>
          <Col md={3}>
            <Card className="amenity-box">
              <Wifi className="icon" />
              <br />
              <p>Wifi</p>
            </Card>
            <div className=""></div>
          </Col>
          <Col md={3}>
            <Card className="amenity-box">
              <Bed className="icon" />
              <br />
              <p>Wifi</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="amenity-box">
              <Bottle className="icon" />
              <br />
              <p>Wifi</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="amenity-box">
              <Drink className="icon" />
              <br />
              <p>Wifi</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Amenities;
