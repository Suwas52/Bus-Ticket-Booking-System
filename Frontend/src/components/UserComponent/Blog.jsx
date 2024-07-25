import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Blog = () => {
  return (
    <section className="blog-section">
      <Container>
        <h2>Recent Blog Post</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="bus1.jpg" />
              <Card.Body>
                <Card.Title>The standard Lorem Ipsum</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">19 Feb 2022</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="bus2.jpg" />
              <Card.Body>
                <Card.Title>Lorem Ipsum is simply dummy</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">19 Feb 2022</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="bus3.jpg" />
              <Card.Body>
                <Card.Title>Why do we use it?</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">19 Feb 2022</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Blog;
