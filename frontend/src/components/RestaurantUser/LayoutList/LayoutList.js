import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar';
// import './BookingRequest.css'
const LayoutList = () => {
    const [layouts, setLayouts] = useState([]);



    useEffect(() => {
        window.scroll(0,0)
        fetch(`http://localhost:4200/layouts/${JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id}`)
            .then(res => res.json())
            .then(data => {                
                setLayouts(data);
            })
    }, [])

    const handleDelete = (data) => {
        console.log(data)
        let text = "Are you sure?";
        if (window.confirm(text) === true) {
            fetch(`http://localhost:4200/deleteLayout/${data}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    window.alert('Deleted')
                    window.location.reload();
                })

        }
    }

    return (
        <div>
            <RestaurantHeader />
            <div className="row">
                <div className="col-md-2">
                    <RestaurantSidebar />
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
                  <u><span className="text-dark">Layout</span> List</u>
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
                        Layout Name
                      </th>
                      <th className="text-white" scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {layouts.map((data, index) => (
                      <tr key={data._id} style={{ background: "white" }}>
                        <td className="font-weight-bold text-danger">
                          {index + 1}.
                        </td>

                        <td className="">
                          <span className="mt-5 text-uppercase text-danger font-weight-bold">
                            {data.layout}
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

export default LayoutList;