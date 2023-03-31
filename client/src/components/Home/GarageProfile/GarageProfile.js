import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const GarageProfile = ({ garage }) => {
  return (
    <div className=" d-flex justify-content-center garage mb-3">
      <Link to={`/garage/${garage._id}`} className="card-item">
        <Card
          className="garage-item"
          style={{
            borderRadius: "35px",
            border: "none",
            background: "#E2F3F9",
          }}
        >
          <div className="px-5 py-3">
            <Card.Img
              variant="top"
              src={`http://localhost:4200/garage/${garage.image}`}
            />
          </div>
          <Card.Body>
            <Card.Title>
              <div style={{ fontSize: "17px" }} className="text-center">
                <p style={{ color: "black" }}>{garage.title}</p>
              </div>
            </Card.Title>
            <Card.Text>
              <div className="text-center">
                <p style={{ color: "gray" }}>{garage.address}</p>
              </div>
            </Card.Text>
            {/* <div className="text-center">
                            <h4 style={{ color: 'black' }}>${garage.price}</h4>
                        </div> */}
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default GarageProfile;
