import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { MANAGE_ROUTES } from "../../../utils/globalConfig";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const RouteDetail = () => {
  const [routeData, setRouteData] = useState();
  const { routeId } = useParams();
  console.log(routeData);

  useEffect(() => {
    if (routeId) {
      fetchRouteData(parseInt(routeId)); // Convert to integer
    }
  }, []);

  const fetchRouteData = async (id) => {
    try {
      const response = await axiosInstance.get(`${MANAGE_ROUTES}/${id}`);
      setRouteData(response.data);
    } catch (error) {
      console.error("Error fetching bus data", error);
      toast.error("Error fetching bus data");
    }
  };

  return <div>RouteDetail</div>;
};

export default RouteDetail;
