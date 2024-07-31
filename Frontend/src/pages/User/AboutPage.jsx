import React from "react";
import Header from "../../components/UserComponent/Header";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import sectionImg from "../../assets/images/Section.png";
import aboutImg from "../../assets/images/about.png";
import Footer from "../../components/UserComponent/Footer";

const ABOUT_TEXTS = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sit reprehenderit non voluptas quam quod facilis, doloribus impedit magni. Numquam ipsum placeat ullam alias temporibus non quas aperiam odio pariatur.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos eveniet inventore blanditiis maxime doloremque minima. Quisquam, ex! Architecto laudantium culpa cupiditate hic facere est magni, possimus repudiandae, rerum eius omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque excepturi sed possimus recusandae temporibus tempore, aspernatur, autem sequi natus iste fugit. Eaque vero temporibus illum quis beatae quam officia ad.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis vel temporibus voluptatum quidem, blanditiis libero assumenda beatae ducimus placeat odio aperiam tenetur animi, reiciendis reprehenderit expedita nostrum a eum. Quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsum necessitatibus eum non quisquam! Quo esse est minima vero dolores eveniet voluptatibus nam. Veniam ad quae illum tenetur voluptates veritatis?",
];

const LIST_ITEMS = [
  { id: 1, text: "Free Cancellation" },
  { id: 2, text: "Instant Refunds" },
  { id: 3, text: "Easy & Quick Bus Booking" },
  { id: 4, text: "Exciting Cashback & Bus Offers" },
  { id: 5, text: "Best Price Assured" },
  { id: 6, text: "24/7 Customer Assistance" },
];

const AboutSection = () => (
  <div className="about-section mb-5">
    <div className="container mt-5">
      <div className="row mb-4 mb-md-5 gy-4 py-4">
        <div className="col-lg-7 col-xl-6">
          <div className="about-content">
            <div className="section-header mb-4">
              <h2 className="title">Know Few Words About Autobus</h2>
            </div>
            {ABOUT_TEXTS.map((text, index) => (
              <p key={index} className="text-color">{text}</p>
            ))}
          </div>
        </div>
        <div className="col-lg-5 col-xl-6">
          <div className="about-thumb">
            <img src={aboutImg} alt="About" height={438} width={636} />
          </div>
        </div>
      </div>
      <AboutDetails />
    </div>
  </div>
);

const AboutDetails = () => (
  <div className="about-details">
    <div className="item">
      <h4 className="title">About Us</h4>
      <p className="text-color">{ABOUT_TEXTS[2]}</p>
      <WhyAutoBus />
    </div>
  </div>
);

const WhyAutoBus = () => (
  <div className="item mt-5">
    <h4 className="title">Why Make Bus Reservations With AutoBus</h4>
    <p className="text-color">{ABOUT_TEXTS[2]}</p>
    <ul className="info">
      {LIST_ITEMS.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  </div>
);

const AboutPage = () => (
  <>
    <Header />
    <HeroBlock title="About" img={sectionImg} />
    <AboutSection />
    <Footer />
  </>
);

export default AboutPage;