import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container, Row, Col } from "react-bootstrap";
import { PiDetective } from "react-icons/pi";

const AuthSpinner = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col className="text-center">
          <Box position="relative" display="inline-flex">
            <CircularProgress size={80} thickness={5} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <PiDetective
                className="w-40 h-40 text-primary"
                style={{ fontSize: "2rem" }}
              />
            </Box>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthSpinner;
