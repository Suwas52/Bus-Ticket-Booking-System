import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Widget from "../../../components/AdminComponent/widget/Widget";
import Chart from "../../../components/AdminComponent/chart/Chart";

import "./admindashboard.scss";
import Feature from "../../../components/AdminComponent/feature/Feature";
import List from "../../../components/AdminComponent/table/Table";

const Home = () => {
  const columns = [
    { field: "sn", label: "SN" },
    { field: "startLocation", label: "Start Location" },
    { field: "endLocation", label: "End Location" },
    { field: "distance", label: "Distance" },
    { field: "createdAt", label: "Created Date" },
    { field: "action", label: "Actions" },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Feature />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Booking</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
