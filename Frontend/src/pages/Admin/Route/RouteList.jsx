import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MANAGE_ROUTES } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import { PATH_DASHBOARD } from "../../../routes/path";
import Table from "../../../components/Base Table/CommonTable";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const RouteList = () => {
  const [routeData, setRouteData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [routeDetailData, setRouteDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(routeData);

  const handleView = (route) => {
    navigate(`/admin-dashboard/route/detail/${route.routeId}`);
  };

  const handleEdit = (route) => {
    navigate(`/admin-dashboard/route/edit/${route.routeId}`);
  };
  const handleDelete = async (route) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(`${MANAGE_ROUTES}/${route.routeId}`);
        setRouteData(
          routeData.filter((item) => item.routeId !== route.routeId)
        );
        toast.success("Route deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete Route");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowDetails = (routeData) => {
    setRouteDetailData(routeData);
    setShowModal(!showModal);
  };

  const columns = [
    { field: "sn", label: "SN" },
    { field: "startLocation", label: "Start Location" },
    { field: "endLocation", label: "End Location" },
    { field: "distance", label: "Distance" },
    { field: "createdAt", label: "Created Date" },
    { field: "action", label: "Actions" },
  ];

  useEffect(() => {
    fetchRouteData();
  }, []);

  const fetchRouteData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_ROUTES);
      setRouteData(response.data);
    } catch (error) {
      alert(error);
      toast.error("Error while fetching routes data");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus List</div>
            <Link
              to={PATH_DASHBOARD.routeCreate}
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
                rows={routeData}
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
                    {routeDetailData?.startLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>EndLocation:</strong>
                  </Col>
                  <Col className="col-6">
                    {routeDetailData?.endLocation}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>Distance:</strong>
                  </Col>
                  <Col className="col-6">{routeDetailData?.distance}</Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <strong>CreatedDate:</strong>
                  </Col>
                  <Col className="col-6">
                    {routeDetailData?.createdAt}
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

export default RouteList;
