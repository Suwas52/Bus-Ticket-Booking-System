import React, { useState } from "react";

const SeatButton = ({ leftSeat1, leftSeat2, rightSeat1, rightSeat2 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <>
      <div className="seat-wrapper">
        <div className="left-side">
          <div>
            <span
              className={`seat ${selectedSeats.includes(leftSeat1) ? "selected" : ""}`}
              onClick={() => toggleSeat(leftSeat1)}
            >
              {leftSeat1}
            <span></span>
            </span>
          </div>
          <div>
            <span
              className={`seat ${selectedSeats.includes(leftSeat2) ? "selected" : ""}`}
              onClick={() => toggleSeat(leftSeat2)}
            >
              {leftSeat2}
            <span></span>
            </span>
          </div>
        </div>
        <div className="right-side">
          <div>
            <span
              className={`seat ${selectedSeats.includes(rightSeat1) ? "selected" : ""}`}
              onClick={() => toggleSeat(rightSeat1)}
            >
              {rightSeat1}
            <span></span>
            </span>
          </div>
          <div>
            <span
              className={`seat ${selectedSeats.includes(rightSeat2) ? "selected" : ""}`}
              onClick={() => toggleSeat(rightSeat2)}
            >
              {rightSeat2}
            <span></span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatButton;
