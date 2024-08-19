import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_BUSSHEHEDULE } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";

const BusScheduleList = () => {
  const [busScheduleData, setBusScheduleData] = useState([]);

  const navigate = useNavigate();
  console.log(busScheduleData);

  const handleView = (schedule) => {
    console.log(schedule);
  };

  const handleEdit = (schedule) => {
    navigate(`/admin-dashboard/busSchedule/create/${schedule.scheduleId}`);
  };
  const handleDelete = async (schedule) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(
          `${MANAGE_BUSSHEHEDULE}/${schedule.scheduleId}`
        );
        setBusData(
          busScheduleData.filter(
            (item) => item.scheduleId !== schedule.scheduleId
          )
        );
        toast.success("Bus deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bus");
      }
    }
  };
  const columns = [
    { field: "sn", label: "SN" },
    { field: "arrivalTime", label: "Arival Time" },
    { field: "departureTime", label: "Departure Time" },
    { field: "busId", label: "Bus Name" },
    { field: "routeId", label: "Route Name" },
    { field: "action", label: "Actions" },
  ];

  const fetchBusScheduleData = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_BUSSHEHEDULE);
      setBusScheduleData(response.data);
    } catch (error) {
      alert(error);
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
              to="/admin-dashboard/bus/create"
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link>
          </div>

          <Table
            columns={columns}
            rows={busScheduleData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default BusScheduleList;
