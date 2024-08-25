import React, { useState } from "react";

// const SeatButton = ({ leftSeat1, leftSeat2, rightSeat1, rightSeat2 }) => {
const SeatButton = ({ data }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    // setSelectedSeats((prev) =>
    //   prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    // );
    alert(seat);
  };

  return (
    <>
      <div className="seat-wrapper">
        <div className="left-side">
          <div>
            <span
              className={`seat ${
                selectedSeats.includes(data.leftSeat1) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(data.leftSeat1)}
            >
              {data.leftSeat1}
              <span></span>
            </span>
          </div>
          <div>
            <span
              className={`seat ${
                selectedSeats.includes(data.leftSeat2) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(data.leftSeat2)}
            >
              {data.leftSeat2}
              <span></span>
            </span>
          </div>
        </div>
        <div className="right-side">
          <div>
            <span
              className={`seat ${
                selectedSeats.includes(data.rightSeat1) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(data.rightSeat1)}
            >
              {data.rightSeat1}
              <span></span>
            </span>
          </div>
          <div>
            <span
              className={`seat ${
                selectedSeats.includes(data.rightSeat2) ? "selected" : ""
              }`}
              onClick={() => toggleSeat(data.rightSeat2)}
            >
              {data.rightSeat2}
              <span></span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatButton;
