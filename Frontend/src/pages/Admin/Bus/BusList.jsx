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

const BusList = () => {
  const [busData, setBusData] = useState([]);
  const navigate = useNavigate();
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

          <Table
            columns={columns}
            rows={busData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default BusList;
