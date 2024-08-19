import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_BUSSHEHEDULE } from "../../../utils/globalConfig";
import toast from "react-hot-toast";

const BusScheduleDetail = () => {
  const [scheduleData, setScheduleData] = useState();
  const { scheduleId } = useParams();
  console.log(scheduleData);

  useEffect(() => {
    if (scheduleId) {
      fetchScheduleData(parseInt(scheduleId)); // Convert to integer
    }
  }, []);

  const fetchScheduleData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_BUSSHEHEDULE}/${id}`);
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
      toast.error("Error fetching bus data");
    }
  };

  return <div>BusScheduleDetail</div>;
};

export default BusScheduleDetail;
