import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_TICKET_PRICE } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";
import { PATH_DASHBOARD } from "../../../routes/path";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const TicketPrice = () => {
  const [ticketPrice, setTicketPrice] = useState([]);
  console.log(ticketPrice);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [ticketPriceDetail, setTicketPriceDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicketPrice();
  }, []);

  const fetchTicketPrice = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_TICKET_PRICE);
      setTicketPrice(response.data);
    } catch (error) {
      alert(error);
    } finally{
      setLoading(false);
    }
  };

  const handleShowDetails = (ticketPrice) => {
    setTicketPriceDetail(ticketPrice);
    setShowModal(!showModal);
  };
  const columns = [
    { field: "sn", label: "SN" },
    { field: "startLocation", label: "Start Location" },
    { field: "endLocation", label: "End Location" },
    { field: "basePrice", label: "Ticket Price" },
    { field: "action", label: "Actions" },
  ];

  const handleView = (ticketPrice) => {
    navigate(`/admin-dashboard/ticketPrice/detail/${ticketPrice.priceId}`);
  };

  const handleEdit = (ticketPrice) => {
    navigate(`/admin-dashboard/ticketPrice/edit/${ticketPrice.priceId}`);
  };
  const handleDelete = async (priceTicket) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(
          `${MANAGE_TICKET_PRICE}/${priceTicket.priceId}`
        );
        setTicketPrice(
          ticketPrice.filter((item) => item.priceId !== priceTicket.priceId)
        );
        toast.success("Bus deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bus");
      }
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus Schedule List</div>
            <Link
              to={PATH_DASHBOARD.createTicketPrice}
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link>
          </div>

          {/* <Table
            columns={columns}
            rows={busTicketPrice}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          /> */}
          <div className="container">
            {loading ? (
              <div className="text-center my-5">Loading...</div>
            ) : (
              <Table
                columns={columns}
                rows={ticketPrice}
                onView={handleShowDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* RouteDetail modal */}
          <Modal show={showModal} onHide={handleShowDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Route Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col className="col-6">
                    <strong>StartLocation:</strong>
                  </Col>
                  <Col className="col-6">
                    {ticketPriceDetail?.startLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>EndLocation:</strong>
                  </Col>
                  <Col className="col-6">
                    {ticketPriceDetail?.endLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>Price:</strong>
                  </Col>
                  <Col className="col-6">{ticketPriceDetail?.basePrice}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>CreatedDate:</strong>
                  </Col>
                  <Col className="col-6">
                    {ticketPriceDetail?.createdAt}
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleShowDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
