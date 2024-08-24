import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_BUSSHEHEDULE } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";
import toast from "react-hot-toast";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const BusScheduleList = () => {
  const [busScheduleData, setBusScheduleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [busScheduleDetailData, setBusScheduleDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  console.log(busScheduleData);

  const handleView = (schedule) => {
    navigate(`/admin-dashboard/busSchedule/detail/${schedule.scheduleId}`);
  };

  const handleEdit = (schedule) => {
    navigate(`/admin-dashboard/busSchedule/edit/${schedule.scheduleId}`);
  };
  const handleDelete = async (schedule) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(
          `${MANAGE_BUSSHEHEDULE}/${schedule.scheduleId}`
        );
        setBusScheduleData(
          busScheduleData.filter(
            (item) => item.scheduleId !== schedule.scheduleId
          )
        );
        toast.success("Bus deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bus");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowDetails = (busScheduleData) => {
    setBusScheduleDetailData(busScheduleData);
    setShowModal(!showModal);
  };

  const columns = [
    { field: "sn", label: "SN" },
    { field: "arrivalTime", label: "Arival Time" },
    { field: "departureTime", label: "Departure Time" },
    { field: "busName", label: "Bus Name" },
    { field: "startLocation", label: "Start Location" },
    { field: "endLocation", label: "End Location" },
    { field: "action", label: "Actions" },
  ];

  const fetchBusScheduleData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUSSHEHEDULE);
      setBusScheduleData(response.data);
    } catch (error) {
      alert(error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusScheduleData();
  }, []);

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus Schedule List</div>
            <Link
              to="/admin-dashboard/busSchedule/create"
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
                rows={busScheduleData}
                onView={handleShowDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* BusScheduleDetail modal */}
          <Modal show={showModal} onHide={handleShowDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Bus Schedule Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col className="col-6">
                    <strong>ArrivalTime:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.arrivalTime}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>DepartureTime:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.departureTime}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>BusName:</strong>
                  </Col>
                  <Col className="col-6">{busScheduleDetailData?.busName}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>StartLocation:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.startLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>EndLocation:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.endLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>CreatedAt:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.createdAt}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>FrequencyDay:</strong>
                  </Col>
                  <Col className="col-6">
                    {busScheduleDetailData?.frequencyDay}
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

export default BusScheduleList;
