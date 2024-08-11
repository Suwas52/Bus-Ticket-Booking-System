import { Container, Row, Col } from "react-bootstrap";
import { TbError404 } from "react-icons/tb";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="text-center">
        <Col>
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              border: "4px solid white",
              boxShadow: "0 0 0 4px #B91C1C", // Equivalent to ring-red-600
              width: 448,
              height: 448,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <TbError404 style={{ fontSize: "9rem" }} />
            <Typography variant="h4" fontWeight="bold">
              The Requested Page Not Found
            </Typography>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
