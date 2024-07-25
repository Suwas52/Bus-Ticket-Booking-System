import React from "react";
import Header from "../../components/UserComponent/Header";
import Search from "../../components/UserComponent/Search";
import Step from "../../components/UserComponent/Step";
import Amenities from "../../components/UserComponent/Amenities";
import Testimonial from "../../components/UserComponent/Testimonial";
import Blog from "../../components/UserComponent/Blog";
import Footer from "../../components/UserComponent/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Search />
      <Step />
      <Amenities />
      <Testimonial />
      <Blog />
      <Footer />
    </>
  );
};

export default LandingPage;
