import React from "react";
import Header from "../../components/UserComponent/Header";
import HeroBlock from "../../components/UserComponent/HeroBlock";
import sectionImg from "../../assets/images/Section.png";
import BlogCard from "../../components/UserComponent/BlogCard";
import Blog1 from "../../assets/images/blog1.png";
import Blog2 from "../../assets/images/blog2.png";
import Blog3 from "../../assets/images/blog3.png";
import Blog4 from "../../assets/images/blog4.png";
import Blog5 from "../../assets/images/blog5.png";
import Blog6 from "../../assets/images/blog6.png";
import Blog7 from "../../assets/images/blog7.png";
import Blog8 from "../../assets/images/blog8.png";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/UserComponent/Footer";

const BlogPage = () => {
  const blogLists = [
    {
      id: 1,
      img: Blog1,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 2,
      img: Blog2,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 3,
      img: Blog3,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 4,
      img: Blog4,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 5,
      img: Blog5,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 6,
      img: Blog6,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 7,
      img: Blog7,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
    {
      id: 8,
      img: Blog8,
      date: "26 Jul 2024",
      title: "Why do you choose us?",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, iure!",
    },
  ];
  return (
    <>
      <Header />
      <HeroBlock title="Blogs" img={sectionImg} />
      <Container>
      <Row>
      {blogLists.map((blog) => (
        <Col key={blog.id} sm={12} md={6} lg={3}>
        <BlogCard
          img={blog.img}
          date={blog.date}
          title={blog.title}
          description={blog.description}
        />
        </Col>
      ))}
      </Row>
      </Container>
      <Footer />
    </>
  );
};

export default BlogPage;
