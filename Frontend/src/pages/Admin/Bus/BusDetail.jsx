import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MANAGE_BUS } from "../../../utils/globalConfig";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const BusDetail = () => {
  const [busData, setBusData] = useState();
  const { busId } = useParams();
  console.log(busData);

  useEffect(() => {
    if (busId) {
      fetchBusData(parseInt(busId)); // Convert to integer
    }
  }, []);

  const fetchBusData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_BUS}/${id}`);
      setBusData(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
      toast.error("Error fetching bus data");
    }
  };

  return <div>BusDetail</div>;
};

export default BusDetail;
