import React from "react";
import { Card } from "react-bootstrap";
import Date from "@mui/icons-material/CalendarMonth";

const BlogCard = ({ title, img, description, date}) => {
  return (
            <Card className="mb-4 blog-card my-5">
            <div className="img-container">
              <Card.Img variant="top" src={img} className="zoom-img" />
            </div>
              <Card.Body>
                <Date className="icon text-success mx-2" />
                <small className="text-muted">{date}</small>
              </Card.Body>
              <Card.Footer>
                <h5 className="title-effect">{title}</h5>
                <Card.Text>
                  {description}
                </Card.Text>
              </Card.Footer>
            </Card>
  );
};

export default BlogCard;
