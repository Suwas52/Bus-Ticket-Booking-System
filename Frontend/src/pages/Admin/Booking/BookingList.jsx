import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MANAGE_BOOKING,
  ACCEPT_BOOKING,
  REJECT_BOOKING,
} from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";
import toast from "react-hot-toast";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { format } from "date-fns";
import BookingTable from "../../../components/AdminComponent/common/BookingTable";

const BookingList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetailData, setBookingDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  console.log(bookingData);

  useEffect(() => {
    fetchBookedData();
  }, []);

  const fetchBookedData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BOOKING);

      // formatted data
      const formattedData = response.data.map((item) => ({
        ...item,
        departureTime: format(
          new Date(item.departureTime),
          "MM/dd/yyyy hh:mm:ss a"
        ),
        arrivalTime: format(
          new Date(item.arrivalTime),
          "MM/dd/yyyy hh:mm:ss a"
        ),
      }));
      setBookingData(formattedData);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (schedule) => {
    navigate(`/admin-dashboard/busSchedule/detail/${schedule.scheduleId}`);
  };

  const handleEdit = (schedule) => {
    navigate(`/admin-dashboard/busSchedule/edit/${schedule.scheduleId}`);
  };
 
  const handleAccept = async (booking) => {
    if (window.confirm("Are you sure you want to accept this booking?")) {
      try {
        await axiosInstance.put(`${ACCEPT_BOOKING}/${booking.bookingId}`);
        setBookingData(
          bookingData.filter((item) => item.bookingId !== booking.bookingId)
        );
        toast.success("Bus Booking accepted successfully!");
      } catch (error) {
        toast.error("Failed to accept booking");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReject = async (booking) => {
    if (window.confirm("Are you sure you want to reject this booking?")) {
      try {
        await axiosInstance.put(`${REJECT_BOOKING}/${booking.bookingId}`);
        setBookingData(
          bookingData.filter((item) => item.bookingId !== booking.bookingId)
        );
        toast.success("Bus Booking rejected successfully!");
      } catch (error) {
        toast.error("Failed to reject booking");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowDetails = (bookingData) => {
    setBookingDetailData(bookingData);
    setShowModal(!showModal);
  };

  const columns = [
    { field: "bookingId", label: "Booking ID" },
    { field: "userId", label: "Tracking ID" },
    { field: "passengerName", label: "Passenger Name" },
    // { field: "busName", label: "Bus Name" },
    // { field: "startLocation", label: "Start Point" },
    // { field: "endLocation", label: "Drop Point" },
    { field: "seatName", label: "SeatName" },
    { field: "status", label: "Status" },
    { field: "action", label: "Action" },
  ];

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus Booking List</div>
            {/* <Link
              to="/admin-dashboard/busSchedule/create"
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link> */}
          </div>

          <div className="container">
            {loading ? (
              <div className="text-center my-5">Loading...</div>
            ) : (
              <BookingTable
                columns={columns}
                rows={bookingData}
                onView={handleShowDetails}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            )}
          </div>

          {/* BusScheduleDetail modal */}
          <Modal show={showModal} onHide={handleShowDetails}>
            <Modal.Header closeButton>
              <Modal.Title>Bus Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col className="col-6">
                    <strong>PassengerName:</strong>
                  </Col>
                  <Col className="col-6">
                    {bookingDetailData?.passengerName}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>BusName:</strong>
                  </Col>
                  <Col className="col-6">{bookingDetailData?.busName}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>StartPoint:</strong>
                  </Col>
                  <Col className="col-6">
                    {bookingDetailData?.startLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>DropPoint:</strong>
                  </Col>
                  <Col className="col-6">{bookingDetailData?.endLocation}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>SeatName:</strong>
                  </Col>
                  <Col className="col-6">{bookingDetailData?.seatName}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>Status:</strong>
                  </Col>
                  <Col className="col-6">{bookingDetailData?.status}</Col>
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

export default BookingList;
