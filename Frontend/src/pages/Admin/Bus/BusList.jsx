import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Datatable from "../../../components/AdminComponent/datatable/Datatable";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_BUS } from "../../../utils/globalConfig";
// import Table from "../../../components/AdminComponent/table/Table";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Base Table/CommonTable";
import toast from "react-hot-toast";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const BusList = () => {
  const [busData, setBusData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [busDetailData, setBusDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(busData);

  useEffect(() => {
    fetchBusData();
  }, []);

  const fetchBusData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUS);
      setBusData(response.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (bus) => {
    navigate(`/admin-dashboard/bus/detail/${bus.busId}`);
  };

  const handleEdit = (bus) => {
    navigate(`/admin-dashboard/bus/edit/${bus.busId}`);
  };
  const handleDelete = async (bus) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(`${MANAGE_BUS}/${bus.busId}`);
        setBusData(busData.filter((item) => item.busId !== bus.busId));
        toast.success("Bus deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bus");
      }
    }
  };

  const handleShowDetails = (busData) => {
    setBusDetailData(busData);
    setShowModal(!showModal);
  };

  const columns = [
    { field: "sn", label: "SN" },
    { field: "busName", label: "Bus Name" },
    { field: "busNumber", label: "Bus Number" },
    { field: "capacity", label: "Capacity" },
    { field: "action", label: "Actions" },
  ];

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />
        {/* <Datatable
          headerName="Add New Bus"
          rows={busData}
          columns={columns}
          getRowId={(row) => row.busId}
          create="/admin-dashboard/bus/create"
        /> */}
        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus List</div>
            <Link
              to="/admin-dashboard/bus/create"
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link>
          </div>

          <div className="container">
            {loading ? (
              <div className="text-center my-5">Loading...</div>
            ) : (
              <Table
                columns={columns}
                rows={busData}
                onView={handleShowDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* BusDetail modal */}
          <Modal show={showModal} onHide={handleShowDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Bus Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col className="col-6">
                    <strong>BusName:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.busName}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>BusNumber:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.busNumber}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>BusType:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.busType}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>Capacity:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.capacity}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>CreatedAt:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.createdAt}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>CreatedBy:</strong>
                  </Col>
                  <Col className="col-6">{busDetailData?.createdBy}</Col>
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

export default BusList;
