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

  useEffect(async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUS);
      console.log(response.data);
      setBusData(response);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ flex: 6 }}>
        <Navbar />
        <Datatable
          rows={busData}
          columns={columns}
          create="/admin-dashboard/bus/create"
        />
      </div>
    </div>
  );
};

export default BusList;
