import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
// import map from '../../../fakeData/images/ordercomplete-map.jpg';
import scooter from "../../../fakeData/images/Image/scooter.png";
import helmet from "../../../fakeData/images/Image/helmet.png";
import "./Shipment.css";
// import Iframe from "react-iframe";
import MapComponent from "../../MapComponent/MapComponent";
const Shipment = ({ mylocation }) => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    // setService(JSON.parse(localStorage.getItem('serviceInfo')))
    setAddress(JSON.parse(sessionStorage.getItem("userProductAddress")));
    console.log(JSON.parse(sessionStorage.getItem("userProductAddress")));
  }, []);
  const toLat = 23.762236;
  const toLong = 90.419922;
  return (
    <div>
      <Header></Header>
      <div className="mt-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mr-5">
              <div className="d-flex justify-content-center ">
                <MapComponent
                  toLat={toLat}
                  toLong={toLong}
                  fromLat={mylocation.latitude}
                  fromLong={mylocation.longtitude}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  background: "#E8E8E8",
                  marginLeft: "40px",
                  border: "1px solid white",
                  borderRadius: "20px",
                }}
              >
                <img
                  style={{ width: "90px", margin: "20px 40px 0px 40px" }}
                  src={scooter}
                  alt=""
                />

                <div
                  style={{
                    background: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    margin: "15px 15px 0px 15px",
                  }}
                >
                  <div className=" ship">
                    <ul>
                      <li>
                        <b>Your Location</b>
                        <p style={{ marginBottom: "-2px" }}></p>
                        <li>
                          <small>{address[0]?.area}</small>
                        </li>
                      </li>
                      <li>
                        <br />
                      </li>
                      <li>
                        <br />
                      </li>
                      <li>
                        <br />
                      </li>
                      <li>
                        <b>Shop Address</b>
                        <p style={{ marginBottom: "-5px" }}></p>
                        <small>Rampura</small>
                      </li>
                    </ul>
                  </div>
                </div>

                <div style={{ padding: "10px 30px 10px 20px" }}>
                  {/* <p style={{ fontSize: "30px", marginBottom: "-8px" }}>
                    09:30
                  </p>
                  <small>Estimated delivery time</small> */}
                </div>

                <div
                  style={{
                    background: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    margin: "0px 15px 2px 15px",
                  }}
                >
                  <div className=" row">
                    <div className="col-md-3">
                      <img
                        style={{ width: "60px", margin: "10px  " }}
                        src={helmet}
                        alt=""
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="mt-3 ml-2">
                        <b>Hamim</b>
                        <p style={{ marginBottom: "-5px" }}></p>
                        <small>Your rider</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-3 p-5">
                  <span style={{}} className="  mt-3">
                    <b>Contact No:</b> 01999999999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Shipment;
