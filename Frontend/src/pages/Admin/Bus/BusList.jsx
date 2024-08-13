import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Datatable from "../../../components/AdminComponent/datatable/Datatable";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_BUS } from "../../../utils/globalConfig";

const BusList = () => {
  const [busData, setBusData] = useState([]);
  console.log(busData);

  const columns = [
    { field: "busId", headerName: "ID", width: 90 },
    { field: "busName", headerName: "Bus Name", width: 150 },
    { field: "busNumber", headerName: "Bus Number", width: 150 },
    { field: "capacity", headerName: "Capacity", width: 120 },
  ];

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
        <Datatable
          headerName="Add New Bus"
          rows={busData}
          columns={columns}
          getRowId={(row) => row.busId}
          create="/admin-dashboard/bus/create"
        />
      </div>
    </div>
  );
};

export default BusList;
