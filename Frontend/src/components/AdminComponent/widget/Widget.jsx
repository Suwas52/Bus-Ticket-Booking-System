import "./widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ADMINDASHBOARD_COUNT } from "../../../utils/globalConfig";
import AltRouteIcon from '@mui/icons-material/AltRoute';

const Widget = ({ type,amount=0 }) => {
  // const [count, setCount] = useState();

  // console.log(count);

  // useEffect(() => {
  //   fetchBookedData();
  //   fetchCount();
  // }, []);

  // const fetchCount = async () => {
  //   try {
  //     const response = await axiosInstance.get(ADMINDASHBOARD_COUNT);
  //     setCount(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  let data;

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "bookings":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        link: "",
        icon: (
          <EditNoteIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "bus":
      data = {
        title: "Total Bus",
        isMoney: true,
        link: "",
        icon: (
          <DirectionsBusIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "routes":
      data = {
        title: "Routes",
        isMoney: false,
        link: "",
        icon: (
          <AltRouteIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && ""} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      {/* <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          {diff}%
        </div>
      </div> */}
      <div >

        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
