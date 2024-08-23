import React from "react";
import { Card, Container } from "react-bootstrap";

const FilterCard = () => {
  return (
    <Card className="card-custom mb-2">
      <div className="row p-4 ">
        <div className="col-md-8">
          <h5>AC - Kansas - Echo Bass</h5>
          <p>Seat Layout - 2 x 2</p>
          <p>
            <i className="fas fa-bus"></i> AC
          </p>
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>08:00 AM</strong>
              </p>
              <p>Kansas</p>
            </div>
            <div className="col-md-4 text-center">
              <p>08:30 min</p>
              <p>
                <i className="fas fa-arrow-right"></i>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>04:30 PM</strong>
              </p>
              <p>Echo Bass</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-right">
          <p className="price">$100.00</p>
          <p>
            Off Days: <span className="off-days">Friday</span>
          </p>
          <button className="btn btn-success">Select Seat</button>
        </div>
      </div>
      <hr />
      <div className="facilities p-3">
        <strong>Facilities - </strong>
        <span>Water Bottle</span>
        <span>Pillow</span>
        <span>Wifi</span>
      </div>
    </Card>
  );
};

export default FilterCard;
