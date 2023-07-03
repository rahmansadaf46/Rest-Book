import React, { useEffect, useState } from 'react';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar';
// import './BookingRequest.css'
const BookingDone = () => {
    const [product, setProduct] = useState([]);



    useEffect(() => {
        fetch('http://localhost:4200/restaurantOrder', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id })
        })
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('student', JSON.stringify(data));

                // }
                // const email= sessionStorage.getItem('email')
                const items = data.filter(item => item.finalData.status !== "Pending")
                console.log(items, data)
                setProduct(items.reverse());
            })
    }, [])



    return (
        <div>
            <RestaurantHeader />
            <div className="row">
                <div className="col-md-2">
                    <RestaurantSidebar />
                </div>


                <div style={{ backgroundColor: '#FCF4E0', height: '100%', minHeight: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        <div className="text-center pb-3 text-danger">
                            <h2><u>Booking <span className="text-dark">Done</span></u></h2>
                        </div>
                        <div>{
                            product.map(fd => <>{ <><div style={{ width: '700px', height: '100%', border: '1px solid lightYellow', borderRadius: '30px', backgroundColor: 'lightYellow', marginBottom: '25px', padding: '30px' }}>

                                <div className="font-weight-bold">Order No: <span style={{ color: 'purple' }}>{fd._id.split("").slice(15, 50)}</span></div>
                                <br />
                                <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">{fd?.finalData?.service?.title}</span> </p> <br />
                                <p style={{ fontSize: "18px" }}>
                                    <span className="font-weight-bold text-danger">
                                        Payment:{" "}
                                    </span>
                                    <span className="font-weight-bold text-dark">
                                   <>{fd?.finalData.paymentCategory}</>
                                    </span>{" "}
                                </p>
                                {fd?.finalData.paymentCategory !== 'Payment on Location' && <p style={{ fontSize: "18px" }}>
                                        <span className="font-weight-bold text-danger">
                                            Payment ID:{" "}
                                        </span>
                                        <span className="font-weight-bold text-dark">
                                            {fd.finalData.paymentData}
                                        </span>{" "}
                                        <br/>
                                        <br/>
                                        <span className="font-weight-bold text-danger">
                                            Paid Amount:{" "}
                                        </span>
                                        <span className="font-weight-bold text-dark">
                                            {fd.finalData.paidAmount}/-
                                        </span>{" "}
                                    </p>
                                }
                                <br />
                                <div style={{ border: '2px solid #E5194B', padding: '15px' }}>
                                    <p className="font-weight-bold ">Namw: <span className="text-danger"> {fd.finalData.address.name}</span></p>
                                    <p className="font-weight-bold">Contact: <span className="text-danger">{fd.finalData.address.contactNo}</span></p>
                                    <p className="font-weight-bold text-dark">Email: <span className="text-danger">{fd.finalData.email}</span></p>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="d-flex col-md-6">
                                        <div className="">
                                            <p className="mt-2 font-weight-bold">Status: <span className="text-success">{fd.finalData.status}</span> </p></div>
                                        <div style={{ position: 'relative', left: '10px', top: '7px' }} >
                                            {/* <label class="switch">
                                                <input onChange={() => handleChange(fd)} type="checkbox" />
                                                <span className="slider round"></span>
                                            </label> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}/-</span></p>&nbsp;&nbsp;
                                        {/* <UpdateAmount modalIsOpen={modalIsOpen} item={item} closeModal={closeModal}></UpdateAmount> */}
                                    </div>
                                </div>

                            </div></>}</>)
                        }</div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default BookingDone;