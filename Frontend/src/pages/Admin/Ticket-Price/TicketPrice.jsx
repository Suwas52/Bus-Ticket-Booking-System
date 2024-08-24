import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_TICKET_PRICE } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar";
import Navbar from "../../../components/AdminComponent/navbar/Navbar";
import Table from "../../../components/Base Table/CommonTable";
import { PATH_DASHBOARD } from "../../../routes/path";

const TicketPrice = () => {
  const [ticketPrice, setTicketPrice] = useState([]);
  console.log(ticketPrice);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTicketPrice();
  }, []);

  const fetchTicketPrice = async () => {
    try {
      const response = await axiosInstance.get(MANAGE_TICKET_PRICE);
      setTicketPrice(response.data);
    } catch (error) {
      alert(error);
    }
  };
  const columns = [
    { field: "sn", label: "SN" },
    { field: "startLocation", label: "Start Location" },
    { field: "endLocation", label: "End Location" },
    { field: "basePrice", label: "Ticket Price" },
    { field: "action", label: "Actions" },
  ];

  const handleView = (ticketPrice) => {
    navigate(`/admin-dashboard/ticketPrice/detail/${ticketPrice.priceId}`);
  };

  const handleEdit = (ticketPrice) => {
    navigate(`/admin-dashboard/ticketPrice/edit/${ticketPrice.priceId}`);
  };
  const handleDelete = async (priceTicket) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axiosInstance.delete(
          `${MANAGE_TICKET_PRICE}/${priceTicket.priceId}`
        );
        setTicketPrice(
          ticketPrice.filter((item) => item.priceId !== priceTicket.priceId)
        );
        toast.success("Bus deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bus");
      }
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="" style={{ flex: 6 }}>
        <Navbar />

        <div className="listContainer">
          <div className="d-flex justify-content-between">
            <div className="listTitle">Bus Schedule List</div>
            <Link
              to={PATH_DASHBOARD.createTicketPrice}
              style={{ textDecoration: "none" }}
              className="btn btn-success btn-sm py-2 my-2"
            >
              Create
            </Link>
          </div>

          <Table
            columns={columns}
            rows={ticketPrice}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {/* <Table
            columns={columns}
            rows={busTicketPrice}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
