import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const SignUp = () => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2 className="text-center">Welcome to Bus Booking</h2>
        <Container>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter Your First Name"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Your Last Name"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select className="form-control" id="country">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="+1 Your Phone Number"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Your Password"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                />
                <label className="form-check-label" htmlFor="terms">
                  Accepting all{" "}
                  <a href="#">
                    Refund Policy, Ticket Policies, Terms and Conditions
                  </a>
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default SignUp;
