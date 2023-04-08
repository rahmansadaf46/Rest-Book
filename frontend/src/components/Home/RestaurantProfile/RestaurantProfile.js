import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantProfile = ({ restaurant }) => {
  return (
    <div className=" d-flex justify-content-center restaurant mb-3">
      <Link to={`/restaurant/${restaurant._id}`} className="card-item link-hover">
        <Card
          className="restaurant-item"
          style={{
            borderRadius: "35px",
            border: "none",
            background: "#FCF4E0",
          }}
        >
          <div className="px-5 py-3">
            <Card.Img
              variant="top"
              
              src={`http://localhost:4200/restaurant/${restaurant.image}`}
            />
          </div>
          <Card.Body>
            <Card.Title>
              <div style={{ fontSize: "17px" }} className="text-center">
                <p style={{ color: "black" }}>{restaurant.title}</p>
              </div>
            </Card.Title>
            <Card.Text>
              <div className="text-center">
                <p style={{ color: "gray" }}>{restaurant.address}</p>
              </div>
            </Card.Text>
            {/* <div className="text-center">
                            <h4 style={{ color: 'black' }}>${restaurant.price}</h4>
                        </div> */}
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default RestaurantProfile;
