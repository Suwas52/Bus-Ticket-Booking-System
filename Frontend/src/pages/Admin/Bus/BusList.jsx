import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Datatable from "../../../components/AdminComponent/datatable/Datatable";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_BUS } from "../../../utils/globalConfig";
// import Table from "../../../components/AdminComponent/table/Table";
import { Link } from "react-router-dom";
import Table from "../../../components/Base Table/CommonTable";

const BusList = () => {
  const [busData, setBusData] = useState([]);
  console.log(busData);

  const handleView = (id) => {
    console.log("view", id)
  }

  const columns = [
    { field: "busId", label: "ID" },
    { field: "busName", label: "Bus Name" },
    { field: "busNumber", label: "Bus Number" },
    { field: "capacity", label: "Capacity" },
    { field: "action", label: "Actions" },
  ];

  // const column = ["busId", "busName", "busNumber", "capacity"];

  const fetchBusData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUS);
      setBusData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchBusData();
  }, []);

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
              className="btn btn-success btn-sm py-2"
            >
              Create
            </Link>
          </div>

          <Table columns={columns} rows={busData} onView={handleView} />
        </div>
      </div>
    </div>
  );
};

export default BusList;
