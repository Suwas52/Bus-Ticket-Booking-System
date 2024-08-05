import React from "react";
import Header from "../../components/UserComponent/Header";
import Footer from "../../components/UserComponent/Footer";
import { Col, Container, Form, Row } from "react-bootstrap";
import CheckBox from "../../components/UserComponent/TagsInput/CheckBox";
import Time from "@mui/icons-material/AccessTimeOutlined";
import Route from "@mui/icons-material/AltRouteOutlined";
import Bus from "@mui/icons-material/DirectionsBusFilledOutlined";
import FilterCard from "../../components/UserComponent/Card/FilterCard";

const FilterPage = () => {
  return (
    <>
      <Header />
      <div className="container-fluid heropart d-flex justify-content-center align-items-end ">
        <Container className="top-filter ">
          <Form>
            <Row>
              <Col>
                <Form.Select className="mb-3">
                  <option>Pickup Point</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="mb-3">
                  <option>Pickup Point</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="mb-3">
                  <option>Pickup Point</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </Form.Select>
              </Col>
              <Col>
                <button className="btn btn-success w-100">Find Tickets</button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div className="container-fluid mid">
        <Container>
          <Row>
            <Col className="col-3 filter ">
              <div className="top-filter">
                <h5>Filter</h5>
                <button className=" btn-reset">Reset All</button>
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Vehicle Type</h6>
                <CheckBox name="Classic" Icon={Bus} />
                <CheckBox name="Coach" Icon={Bus} />
                <CheckBox name="Ac" Icon={Bus} />

                {/* <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                  </label>
                </div> */}
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Routes</h6>
                <CheckBox name=" Kansas to Echo Bass" Icon={Route} />
                <CheckBox name="Witchita to Echo Bass" Icon={Route} />
              </div>
              <hr />
              <div className="select">
                <h6 className="mb-1">Routes</h6>
                <CheckBox name=" 06:00 am - 03:30 pm" Icon={Time} />
                <CheckBox name=" 07:00 am - 04:00 pm" Icon={Time} />
                <CheckBox name=" 08:00 am - 04:30 pm" Icon={Time} />
              </div>
            </Col>
            <Col className="col-9">
              <div className="container-fluid">
                <FilterCard />
                <FilterCard />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default FilterPage;
