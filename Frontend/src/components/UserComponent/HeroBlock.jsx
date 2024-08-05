import React from "react";

import "../../styles/main.scss";

const HeroBlock = ({ title, img }) => {
  return (
    <div className="img-fluid heroBlock">
      <img src={img} alt="" />
      <div className="hero-title">{title}</div>
    </div>
  );
};

export default HeroBlock;
