import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Bus1 from "../../assets/images/Bus2.jpeg";
import Bus3 from "../../assets/images/Bus3.jpeg";
import Bus2 from "../../assets/images/Bus6.jpeg";
import Date from "@mui/icons-material/CalendarMonth";

const Blog = () => {
  return (
    <section className="blog-section ">
      <Container>
        <h2 className="text-center">Recent Blog Post</h2>
        <div className="description text-center container-fluid">
          <p>
            Have a look at our popular reason. why you should choose you bus.
            Just a bus and get a ticket for your great journey
          </p>
        </div>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={Bus1} />
              <Card.Body>
                <Date className="icon" />
                <small className="text-muted">19 Feb 2022</small>
              </Card.Body>
              <Card.Footer>
                <h5>The standard Lorem Ipsum</h5>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={Bus2} />
              <Card.Body>
                <Date className="icon" />
                <small className="text-muted">19 Feb 2022</small>
              </Card.Body>
              <Card.Footer>
                <h5>Lorem Ipsum is simply dummy</h5>
                <Card.Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the…
                </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={Bus3} />
              <Card.Body>
                <Date className="icon" />
                <small className="text-muted">19 Feb 2022</small>
              </Card.Body>
              <Card.Footer>
                <h5>Why do we use it?</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Blog;
