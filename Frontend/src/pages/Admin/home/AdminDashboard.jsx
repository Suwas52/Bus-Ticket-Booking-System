import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Widget from "../../../components/AdminComponent/widget/Widget";
import Chart from "../../../components/AdminComponent/chart/Chart";

import "./admindashboard.scss";
import Feature from "../../../components/AdminComponent/feature/Feature";
import List from "../../../components/AdminComponent/table/Table";
import Table from "../../../components/Base Table/CommonTable";
import { useEffect, useState } from "react";
import {
  ADMINDASHBOARD_COUNT,
  MANAGE_BOOKING,
} from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { format } from "date-fns";

const Home = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState();

  console.log(bookingData);
  console.log(count);

  useEffect(() => {
    fetchBookedData();
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await axiosInstance.get(ADMINDASHBOARD_COUNT);
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  // const handleShowDetails = (booking) => {
  //   setBookedData(booking);
  //   setShowModal(!showModal);
  // };

  const columns = [
    { field: "bookingId", label: "Booking ID" },
    { field: "userId", label: "Tracking ID" },
    { field: "passengerName", label: "Passenger Name" },
    { field: "busName", label: "Bus Name" },
    { field: "startLocation", label: "Start Point" },
    { field: "endLocation", label: "Drop Point" },
    { field: "seatName", label: "SeatName" },
    { field: "status", label: "Status" },
    { field: "action", label: "Action" },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user"  />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        {/* <div className="charts">
          <Feature />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Latest Booking</div>
          <Table columns={columns} rows={bookingData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
