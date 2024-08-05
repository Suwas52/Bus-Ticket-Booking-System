import React from "react";
import { Card, Container } from "react-bootstrap";

const FilterCard = () => {
  return (
    <Card class="card-custom">
      <div class="row">
        <div class="col-md-8">
          <h5>AC - Kansas - Echo Bass</h5>
          <p>Seat Layout - 2 x 2</p>
          <p>
            <i class="fas fa-bus"></i> AC
          </p>
          <div class="row">
            <div class="col-md-4">
              <p>
                <strong>08:00 AM</strong>
              </p>
              <p>Kansas</p>
            </div>
            <div class="col-md-4 text-center">
              <p>08:30 min</p>
              <p>
                <i class="fas fa-arrow-right"></i>
              </p>
            </div>
            <div class="col-md-4">
              <p>
                <strong>04:30 PM</strong>
              </p>
              <p>Echo Bass</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-right">
          <p class="price">$100.00</p>
          <p>
            Off Days: <span class="off-days">Friday</span>
          </p>
          <button class="btn btn-success">Select Seat</button>
        </div>
      </div>
      <hr />
      <div class="facilities">
        <strong>Facilities - </strong>
        <span>Water Bottle</span>
        <span>Pillow</span>
        <span>Wifi</span>
      </div>
    </Card>
  );
};

export default FilterCard;
