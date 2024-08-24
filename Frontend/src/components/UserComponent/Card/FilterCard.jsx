// import { format } from "date-fns";
// import React from "react";
// import { Card, Container } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const FilterCard = ({
//   busName,
//   busType,
//   startPoint,
//   endPoint,
//   price,
//   distance,
//   departureTime,
//   arrivalTime,
// }) => {
//   const navigate = useNavigate();

//   const formatedStartTime = format(
//     new Date(departureTime),
//     "MM/dd/yyyy hh:mm:ss a"
//   );
//   const formatedEndTime = format(
//     new Date(arrivalTime),
//     "MM/dd/yyyy hh:mm:ss a"
//   );
//   const selectSeat = () => {
//     navigate(PATH_AUTHUSER.selectSeat, { state: { buses: "hello" } });
//   };

//   return (
//     <Card className="card-custom mb-2">
//       <div className="row p-4 ">
//         <div className="col-md-8">
//           <h5>
//             {busType} - {startPoint} - {endPoint}
//           </h5>
//           {/* <p>Seat Layout - 2 x 2</p> */}
//           <p>
//             <i className="fas fa-bus"></i> {distance} KM
//           </p>
//           <div className="row">
//             <div className="col-md-4">
//               <p>
//                 <strong>{formatedStartTime} </strong>
//               </p>
//               <p>{startPoint}</p>
//             </div>
//             <div className="col-md-4 text-center">
//               <p>08:30 min</p>
//               <p>
//                 <i className="fas fa-arrow-right"></i>
//               </p>
//             </div>
//             <div className="col-md-4">
//               <p>
//                 <strong>{formatedEndTime}</strong>
//               </p>
//               <p>{endPoint}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4 text-right">
//           <p className="price">Rs. {price}</p>
//           <p className="">
//             Bus Name: <strong className="badge bg-primary">{busName}</strong>
//           </p>
//           <p>
//             Bus Type: <span className="off-days">{busType} </span>
//           </p>
//           <button className="btn btn-success" onClick={selectSeat}>
//             Select Seat
//           </button>
//         </div>
//       </div>
//       {/* <hr /> */}
//       {/* <div className="facilities p-3">
//         <strong>Facilities - </strong>
//         <span>Water Bottle</span>
//         <span>Pillow</span>
//         <span>Wifi</span>
//       </div> */}
//     </Card>
//   );
// };

// export default FilterCard;

import { format } from "date-fns";
import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PATH_AUTHUSER } from "../../../routes/path";

const FilterCard = ({
  busId,
  scheduleId,
  busName,
  busType,
  startPoint,
  endPoint,
  price,
  distance,
  departureTime,
  arrivalTime,
}) => {
  const navigate = useNavigate();

  const formattedStartTime = format(
    new Date(departureTime),
    "MM/dd/yyyy hh:mm:ss a"
  );
  const formattedEndTime = format(
    new Date(arrivalTime),
    "MM/dd/yyyy hh:mm:ss a"
  );

  const selectSeat = () => {
    navigate(PATH_AUTHUSER.seatSelect, {
      state: {
        busId,
        scheduleId,
        busName,
        busType,
        startPoint,
        endPoint,
        price,
        distance,
        departureTime,
        arrivalTime,
      },
    });
  };

  return (
    <Card className="card-custom mb-2">
      <div className="row p-4">
        <div className="col-md-8">
          <h5>
            {busType} - {startPoint} - {endPoint}
          </h5>
          <p>
            <i className="fas fa-bus"></i> {distance} KM
          </p>
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>{formattedStartTime}</strong>
              </p>
              <p>{startPoint}</p>
            </div>
            <div className="col-md-4 text-center">
              <p>08:30 min</p>
              <p>
                <i className="fas fa-arrow-right"></i>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>{formattedEndTime}</strong>
              </p>
              <p>{endPoint}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-right">
          <p className="price">Rs. {price}</p>
          <p>
            Bus Name: <strong className="badge bg-primary">{busName}</strong>
          </p>
          <p>
            Bus Type: <span className="off-days">{busType}</span>
          </p>
          <button className="btn btn-success" onClick={selectSeat}>
            Select Seat
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FilterCard;
