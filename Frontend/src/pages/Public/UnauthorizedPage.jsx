import { Container, Row, Col } from "react-bootstrap";
import { TbHandStop } from "react-icons/tb";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UnauthorizedPage = () => {
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
            <TbHandStop style={{ fontSize: "9rem" }} />
            <Typography variant="h4" fontWeight="bold">
              You don't have access to the requested page
            </Typography>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default UnauthorizedPage;
