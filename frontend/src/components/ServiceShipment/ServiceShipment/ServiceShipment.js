import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
// import map from '../../../fakeData/images/ordercomplete-map.jpg';
import scooter from "../../../fakeData/images/Image/truckgif.gif";
// import helmet from '../../../fakeData/images/Image/helmet.png';
// import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
import MapComponent from "../../MapComponent/MapComponent.js";
// import './Shipment.css';

const ServiceShipment = ({ mylocation }) => {
  const [service, setService] = useState([]);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    setService(JSON.parse(localStorage.getItem("serviceInfo")));
    setAddress(JSON.parse(localStorage.getItem("userAddress")));
    console.log(JSON.parse(localStorage.getItem("userAddress")));
  }, []);
  const { coords } = useParams();
  const toLat = coords.split(",")[0];
  const toLong = coords.split(",")[1];
  // console.log(lat, long);
  console.log(mylocation, "myLocation");

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
                <div className="p-3 text-center text-danger font-weight-bold">
                  <span>Your Booking is Confirmed</span>
                </div>
                <img
                  style={{ width: "150px", margin: "0px 40px 0px 70px" }}
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
                        <b>Restaurant Address</b>
                        <p style={{ marginBottom: "-5px" }}></p>
                        <small>{service[0]?.address}</small>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="p-4 text-center">
                  <p
                    style={{ fontSize: "30px", marginBottom: "-8px" }}
                    className="text-danger"
                  >
                    30 Minutes
                  </p>
                  <small>Estimated time</small>
                </div> */}

                <div
                  style={{
                    background: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    margin: "0px 15px 2px 15px",
                  }}
                >
                  <div className=" row">
                    {/* <div className="col-md-3">
                                            <img style={{ width: "60px", margin: '10px  ' }} src={helmet} alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mt-3 ml-2">
                                                <b>Hamim</b>
                                                <p style={{ marginBottom: '-5px' }}></p>
                                                <small>Your rider</small></div>
                                        </div> */}
                  </div>
                </div>

                <div className="text-center pb-3 p-5">
                  <span style={{}} className="  mt-3">
                    <b>Contact No:</b> {service[0]?.mobile}
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

export default ServiceShipment;
