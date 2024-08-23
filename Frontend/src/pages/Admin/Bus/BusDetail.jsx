import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MANAGE_BUS } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import DetailComponent from "../../../components/AdminComponent/common/DetailComponent";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";

const detailConfigs = {
  bus: [
    { field: "busName", label: "Bus Name" },
    { field: "busNumber", label: "Bus Number" },
    { field: "capacity", label: "Capacity" },
    // Add more fields as needed
  ],
  route: [
    { field: "routeName", label: "Route Name" },
    { field: "startPoint", label: "Start Point" },
    { field: "endPoint", label: "End Point" },
    // Add more fields as needed
  ],
  schedule: [
    { field: "scheduleTime", label: "Schedule Time" },
    { field: "busNumber", label: "Bus Number" },
    { field: "routeName", label: "Route Name" },
    // Add more fields as needed
  ],
};

const BusDetail = () => {
  // const [busData, setBusData] = useState();
  // const { busId } = useParams();
  // console.log(busData);

  // useEffect(() => {
  //   if (busId) {
  //     fetchBusData(parseInt(busId)); // Convert to integer
  //   }
  // }, []);

  // const fetchBusData = async (id) => {
  //   try {
  //     const response = await axiosInstance.get(`${MANAGE_BUS}/${id}`);
  //     setBusData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching bus data", error);
  //     toast.error("Error fetching bus data");
  //   }
  // };
  const data = [
    {
        busName: "herohonda",
        busNumber: "1234",
        capacity: 4
    }
]

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="content" style={{ flex: 6 }}>
        <Navbar />
      <DetailComponent data={data} config={{title: "Bus", fields: detailConfigs.bus}} />
    </div>
    </div>
  );
};

export default BusDetail;
