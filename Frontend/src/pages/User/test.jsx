import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
  ListGroup,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
// import bus from "./bus.png";
// import busImage1 from "./busImage1.jpg";
// import busImage2 from "./busImage2.jpg";
// import busImage3 from "./busImage3.jpg";
// import parvin from "./parvin.png";
import Logo from "../../assets/images/logo.png";

function Test() {
  return (
    <div className="app">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={Logo} height={50} alt="Bus Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#faqs">FAQs</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#sign-in">Sign In</Nav.Link>
              <Nav.Link href="#sign-up">Sign Up</Nav.Link>
              <Button variant="outline-success">Buy Tickets</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h1>Get Your Ticket Online, Easy and Safely</h1>
            <Button variant="success">Get Ticket Now</Button>
            <div className="city-skyline mt-4">
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
              <span className="building" />
            </div>
          </Col>
          <Col md={6}>
            <Card className="ticket-card">
              <Card.Header>Choose Your Ticket</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="pickup-point">
                    <Form.Label>Pickup Point</Form.Label>
                    <Form.Select>
                      <option>Select Location</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="departure-date">
                    <Form.Label>Departure Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="dropping-point">
                    <Form.Label>Dropping Point</Form.Label>
                    <Form.Select>
                      <option>Select Location</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Find Tickets
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <h2>Get Your Tickets With Just 3 Steps</h2>
        <p className="mt-3">
          Have a look at our popular reason. why you should choose you bus. Just
          a Bus and get a ticket for your great journey. !
        </p>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="steps-card">
              <Card.Header className="step-number">01</Card.Header>
              <Card.Body>
                <i className="fas fa-search" />
                <Card.Title>Search Your Bus</Card.Title>
                <Card.Text>
                  Choose your origin, destination, Just choose a Bus journey
                  dates and search for buses
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="steps-card">
              <Card.Header className="step-number">02</Card.Header>
              <Card.Body>
                <i className="fas fa-ticket-alt" />
                <Card.Title>Choose The Ticket</Card.Title>
                <Card.Text>
                  Choose your origin, destination, Just a Bus for your great
                  journey dates and search for buses
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="steps-card">
              <Card.Header className="step-number">03</Card.Header>
              <Card.Body>
                <i className="fas fa-money-bill-wave" />
                <Card.Title>Pay Bill</Card.Title>
                <Card.Text>
                  Choose your origin, destination, choose a Bus for your great
                  journey dates and search for buses
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <h2>Our Amenities</h2>
        <p className="mt-3">
          Have a look at our popular reason. why you should choose you bus. Just
          choose a Bus and get a ticket for your great journey!
        </p>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="amenities-card">
              <Card.Body className="text-center">
                <i className="fas fa-wifi" />
                <Card.Title>Wifi</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="amenities-card">
              <Card.Body className="text-center">
                <i className="fas fa-couch" />
                <Card.Title>Pillow</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="amenities-card">
              <Card.Body className="text-center">
                <i className="fas fa-bottle-water" />
                <Card.Title>Water Bottle</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="amenities-card">
              <Card.Body className="text-center">
                <i className="fas fa-wine-glass-alt" />
                <Card.Title>Soft Drinks</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <h2>Our Testimonials</h2>
        <p className="mt-3">
          Have a look at our popular reason. why you should choose you bus. Just
          choose a Bus and get a ticket for your great journey!
        </p>
        <Card className="testimonials-card mt-4">
          <Card.Body>
            <Row>
              <Col md={1} className="text-center">
                <Image src="" roundedCircle height={50} />
              </Col>
              <Col md={11}>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  iusto mollitia facere accusantium deleniti odit eius, amet
                  doloribus fugit delectus doloremque! In, corrupti? Est, autem
                  suscipit voluptatem rerum deserunt laudantium.
                </Card.Text>
                <Card.Title>Parvin Akter</Card.Title>
                <hr className="mt-2" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-5">
        <h2>Recent Blog Post</h2>
        <p className="mt-3">
          Have a look at our popular reason. why you should choose you bus. Just
          choose a Bus and get a ticket for your great journey.!
        </p>
        <Row className="mt-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>The standard Lorem Ipsum...</Card.Title>
                <Card.Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et...
                </Card.Text>
                <Card.Footer className="text-muted">19 Feb 2022</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Lorem Ipsum is simply dummy</Card.Title>
                <Card.Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the...
                </Card.Text>
                <Card.Footer className="text-muted">19 Feb 2022</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Why do we use it?</Card.Title>
                <Card.Text>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin...
                </Card.Text>
                <Card.Footer className="text-muted">19 Feb 2022</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer mt-5">
        <Container className="text-center">
          <Image src="" height={30} alt="Bus Logo" />
          <p className="mt-3">
            Delectus culpa laboriosam debitis saepe. Commodi earum minus ut
            obcaecati veniam deserunt est!
          </p>
          <ul className="social-icons list-unstyled d-flex justify-content-center mt-3">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-vimeo-v" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </Container>
        <Container className="mt-4">
          <Row>
            <Col md={4} className="text-center">
              <h3>Useful Links</h3>
              <ListGroup variant="flush">
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> About
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> FAQs
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Blog
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Contact
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className="text-center">
              <h3>Policies</h3>
              <ListGroup variant="flush">
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Privacy Policy
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Terms and Conditions
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Ticket Policies
                </ListGroup.Item>
                <ListGroup.Item className="link-item">
                  <i className="fas fa-angle-right" /> Refund Policy
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className="text-center">
              <h3>Contact Info</h3>
              <p className="mt-3">
                <i className="fas fa-map-marker-alt" /> Bengla Road Suite Dhaka
                1209
              </p>
              <p>
                <i className="fas fa-phone-alt" /> +44 45678908
              </p>
              <p>
                <i className="fas fa-envelope" /> example@gmail.com
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Test;
