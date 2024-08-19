import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_ALLUSERS } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";
import { PATH_DASHBOARD } from "../../../routes/path";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  console.log(userData);

  const handleView = (user) => {
    navigate(`/admin-dashboard/user/detail/${user.id}`);
  };

  const handleEdit = (user) => {
    navigate(`/admin-dashboard/route/edit/${user.id}`);
  };
  //   const handleDelete = async (user) => {
  //     if (window.confirm("Are you sure you want to delete this bus?")) {
  //       try {
  //         await axiosInstance.delete(`${GET_ALLUSERS}/${route.routeId}`);
  //         setRouteData(
  //           routeData.filter((item) => item.routeId !== route.routeId)
  //         );
  //         toast.success("Route deleted successfully!");
  //       } catch (error) {
  //         toast.error("Failed to delete Route");
  //       }
  //     }
  //   };

  const columns = [
    { field: "sn", label: "SN" },
    { field: "userName", label: "User Name" },
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "roles", label: "Roles" },
    { field: "createdAt", label: "Created Date" },
    { field: "action", label: "Actions" },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(GET_ALLUSERS);
      setUserData(response.data);
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
            <div className="listTitle">User All Data</div>
            <Link
              to={PATH_DASHBOARD.userCreate}
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link>
          </div>

          <Table
            columns={columns}
            rows={userData}
            onView={handleView}
            onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
