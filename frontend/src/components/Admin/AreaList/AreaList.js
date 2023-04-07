import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  // const [amount, setAmount] = useState([]);
  // const [todayAmount, setTodayAmount] = useState([]);
  // const [today, setToday] = useState([]);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "admin@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
  }, [email]);
  useEffect(() => {
    fetch("http://localhost:4200/areas")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAreas(data);
        // if (data) {
        //     localStorage.setItem('student', JSON.stringify(data));

        // }
        // const email= sessionStorage.getItem('email')
        // const items = data.filter(item => item.finalData.status === "Delivered")
        // // console.log(items,data)
        // const td = data.filter(item => item.finalData.date === new Date().toDateString())
        // setToday(td)
        // setProduct(items.reverse());
      });
  }, []);
  // console.log(product)
  // useEffect(() => {
  //     let total = [];
  //     for (let i = 0; i < product.length; i++) {
  //         total.push(Number(product[i].finalData.amount));
  //     }
  //     setAmount(total.reduce((partial_sum, a) => partial_sum + a, 0));

  //     let todayTotal = [];
  //     for (let i = 0; i < today.length; i++) {
  //         todayTotal.push(Number(today[i].finalData.amount));
  //     }
  //     setTodayAmount(todayTotal.reduce((partial_sum, a) => partial_sum + a, 0));
  // }, [product, today])

  // const formatNumber = num => {
  //     const precision = num.toFixed(2);
  //     // setAmount(precision);
  //     return Number(precision);
  // }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(`http://localhost:4200/deleteArea/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          // localStorage.removeItem("student");
          alert("Area Deleted");
          if (result) {
            window.location.reload();
            // history.goBack()
          }
        });
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
            backgroundColor: "#FCF4E0",
            height: "100%",
            minHeight: "800px",
          }}
          className="col-md-10 pt-4 d-flex justify-content-center"
        >
          <div className="">
            <div>
              <div className="text-center pb-3 text-danger">
                <h2>
                  <u><span className="text-dark">Area</span> List</u>
                </h2>
              </div>

              <div>
                <table className="table table-borderless mt-4 ">
                  <thead style={{ background: "#E5194B" }}>
                    <tr>
                      <th className="text-white text-left" scope="col">
                        Sr No.
                      </th>
                      <th className="text-white" scope="col">
                        Area Name
                      </th>
                      <th className="text-white" scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {areas.map((data, index) => (
                      <tr key={data._id} style={{ background: "white" }}>
                        <td className="font-weight-bold text-danger">
                          {index + 1}.
                        </td>

                        <td className="">
                          <span className="mt-5 text-uppercase text-danger font-weight-bold">
                            {data.title}
                          </span>
                        </td>
                        <td>
                          <button
                            // style={{ display: data.email === loggedInUser.email ? 'none' : '' }}
                            onClick={() => handleDelete(data._id)}
                            className="btn btn-danger btn-sm font-weight-bold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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

export default AreaList;
