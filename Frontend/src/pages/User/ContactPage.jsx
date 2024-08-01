import React from "react";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import ContactImg from "../../assets/images/Section.png";
import Header from "../../components/UserComponent/Header";
import addressIcon from "../../assets/images/addressIcon.svg";
import callIcon from "../../assets/images/callIcon.svg";
import MailIcon from "../../assets/images/mailIcon.svg";
import Footer from "../../components/UserComponent/Footer";

const ContactPage = () => {
  const iconList = [
    {
      id: 1,
      icon: addressIcon,
      title: "Our Address",
      description: "Address : Bengla Road Suite Dhaka 1209",
    },
    {
      id: 2,
      icon: callIcon,
      title: "Call Us",
      description: "+44 45678908",
    },
    {
      id: 3,
      icon: MailIcon,
      title: "Email Us",
      description: "example@gmail.com",
    },
  ];
  return (
    <>
      <Header />
      <HeroBlock title="Contact Us" img={ContactImg} />
      <div className="container margin-top">
        <div className="text-center">
          <h3 className="title">Let's get in touch</h3>
          <p className="custom-color mb-5">
            We are open for any suggestion or just to have a chat
          </p>
        </div>
        <div className="row pb-80 gy-4 justify-content-center">
          {iconList.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <div className="info-item">
                <div className="icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="content">
                  <h5 className="title">{item.title}</h5>
                  <span className="custom-color">{item.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row gy-5 mt-4">
          <div className="col-lg-6">
            <div className="contact-form-wrapper">
              <h4 className="title mb-4">Have any Questions?</h4>
              <form className="contact-form row gy-3" method="">
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name <span>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control mt-2"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control mt-2"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject <span>*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="form-control mt-2"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="message">
                      Your Message <span>*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      className="form-control mt-2"
                      placeholder="Message"
                      rows={5}
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <button className="btn btn-success" type="submit">
                      Send Us Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.1320439129063!2d85.29757527508218!3d27.744072976161462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cef2f6ba75%3A0x1a0a5fae79c3267e!2sSeshmati%20Bridge%2C%20Tarakeshwar%2044600!5e0!3m2!1sen!2snp!4v1722507986074!5m2!1sen!2snp"
                width="600"
                height="450"
                styles="border:0;"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
