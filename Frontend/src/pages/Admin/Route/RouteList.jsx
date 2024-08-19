import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MANAGE_ROUTES } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import { PATH_DASHBOARD } from "../../../routes/path";
import Table from "../../../components/Base Table/CommonTable";

const RouteList = () => {
  const [routeData, setRouteData] = useState([]);
  const navigate = useNavigate();

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
      }
    }
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

          <Table
            columns={columns}
            rows={routeData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteList;
