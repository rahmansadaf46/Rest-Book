import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import MapComponent from "../../MapComponent/MapComponent.js";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const RestaurantListAdmin = () => {
  const [items, setItems] = useState([]);
  // const [amount, setAmount] = useState([]);
  // const [todayAmount, setTodayAmount] = useState([]);
  // const [today, setToday] = useState([]);
  const [query, setQuery] = useState("");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "trustnride46@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
  }, [email]);
  useEffect(() => {
    fetch("http://localhost:4200/garages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
        // setAllItem(data);
        // localStorage.setItem('item', JSON.stringify(data));
      });
  }, []);
  // console.log(product)

  const handleDelete = (data) => {
    console.log(data);
    let text = "Are you sure?";
    if (window.confirm(text) === true) {
      fetch(`http://localhost:4200/deleteGarage/${data}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          window.alert("Deleted");
          window.location.reload();
        });
    }
  };
  const search = (rows) => {
    if (rows) {
      const columns = rows[0] && Object?.keys(rows[0]);
      return rows?.filter((row) =>
        columns?.some(
          (column) =>
            row[column]
              ?.toString()
              .toLowerCase()
              .indexOf(query?.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <div>
      <AdminHeader />
      <div className="row">
        <div className="col-md-2">
          <AdminSidebar />
        </div>
        <div
          style={{
            backgroundColor: "#FEC5E4",
            height: "100%",
            minHeight: "800px",
          }}
          className="col-md-10 pt-4 d-flex justify-content-center"
        >
          <div className="">
            <div>
              <div className="text-center pb-3 text-danger">
                <h2>
                  <u>Restaurant List</u>
                </h2>
              </div>
              <div className="container  form-inline  d-flex justify-content-center mt-3">
                <label
                  style={{ color: "#F58E82" }}
                  className="font-weight-bold ml-1"
                  htmlFor="filter"
                >
                  Search
                </label>
                <input
                  style={{ borderRadius: "10px" }}
                  className="form-control ml-2 p-1"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </div>
              {search(items)?.map((item) => (
                <div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      width: "590px",
                    }}
                    className="col-12  mx-4 my-4 pb-3 p-3"
                  >
                    <div>
                      {" "}
                      <div style={{ lineHeight: "1.2" }}>
                        {/* <h3 className="text-center text-warning my-3">{service.title}</h3> */}
                        {/* <p style={{ lineHeight: '0.3', color: 'gray', fontWeight: 'bold', marginBottom: '30px' }}>{service.description.split('\n').map(str => <p>{str}</p>)}</p> */}
                        {/* <hr /> */}
                        <div className="d-flex justify-content-center">
                          <img
                            style={{ width: "200px", borderRadius: "50%" }}
                            src={`http://localhost:4200/garage/${item?.image}`}
                            alt=""
                          />
                        </div>
                        <p className="text-left font-weight-bold  mt-3">
                          <span style={{ color: "#F58E82" }}>Restaurant Name:</span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.title}
                          </span>
                        </p>
                        <p className="text-left   font-weight-bold   mt-3">
                          <span style={{ color: "#F58E82" }}>Address:</span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.address}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold    mt-3">
                          <span style={{ color: "#F58E82" }}>Description:</span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.description}
                          </span>
                        </p>
                        <p className="text-left   font-weight-bold   mt-3">
                          <span style={{ color: "#F58E82" }}>Contact:</span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.mobile}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#F58E82" }}>
                          Restaurant User Email:
                          </span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.user}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#F58E82" }}>
                            Facebook Code:
                          </span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.facebook}
                          </span>
                        </p>
                        {/* <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#F58E82" }}>
                            Google Map Code:
                          </span>
                          <span className="text-danger font-weight-bold">
                            {" "}
                            {item?.googleMap.split("&", 1)}...
                          </span>
                        </p> */}
                        <hr />
                        <p className="text-center     mt-3">
                          <span style={{ color: "orange", fontSize: "18px" }}>
                            <b>Areas</b>
                          </span>
                          <ul style={{listStyle:'none'}} className="text-danger  font-weight-bold text-center">
                            {" "}
                            {item?.area.map((data) => (
                              <li className="mr-5 my-2 text-uppercase">
                                # {data}
                              </li>
                            ))}
                          </ul>
                        </p>

                        <div className="row text-center p-3">
                          <div className="col-6">
                            <Link
                              to={`/admin/updateGarage/${item._id}`}
                              class="btn btn-warning font-weight-bold"
                            >
                              Update Restaurant
                            </Link>
                          </div>
                          <div className="col-6">
                            <button
                              onClick={() => handleDelete(item._id)}
                              class="btn btn-danger font-weight-bold"
                            >
                              Delete Restaurant
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* {
                                    product.map(fd => <div className="d-flex justify-content-center">
                                        <div style={{ width: '700px', height: '100%', border: '1px solid lightYellow', borderRadius: '30px', backgroundColor: 'lightYellow', marginBottom: '25px', padding: '30px' }}>
                                            <div className="font-weight-bold">Order No: <span style={{ color: 'purple' }}>{fd._id.split("").slice(15, 50)}</span></div>
                                            <br />
                                            {fd.finalData.cart.map(item => <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">{item.title}</span> <span className="font-weight-bold text-dark">: {item.quantity}pcs</span></p>)} <br />
                                            <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">Payment ID: </span><span className="font-weight-bold text-dark">{fd.finalData.paymentData}</span> </p>
                                            <br />
                                            <div style={{ border: '2px solid #E5194B', padding: '15px' }}>
                                                <p className="font-weight-bold ">Address: <span className="text-danger">Flat No {fd.finalData.address.flatNo}, House No {fd.finalData.address.houseNo}, {fd.finalData.address.area}</span></p>
                                                <p className="font-weight-bold">Contact: <span className="text-danger">{fd.finalData.address.contactNo}</span></p>
                                                <p className="font-weight-bold text-dark">Email: <span className="text-danger">{fd.finalData.email}</span></p>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="">
                                                        <span className="mt-2 font-weight-bold">Status: <span className="text-success">{fd.finalData.status}</span> </span></div>

                                                </div>
                                                <div className="col-md-4 d-flex justify-content-end">
                                                    <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}/-</span></p>&nbsp;&nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListAdmin;
