import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar';
// import './BookingRequest.css'
const RestaurantTableList = () => {
    const [services, setServices] = useState([]);



    useEffect(() => {
        window.scroll(0,0)
        fetch(`http://localhost:4200/service/${JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id}`)
            .then(res => res.json())
            .then(data => {                
                setServices(data);
            })
    }, [])

    const handleDelete = (data) => {
        console.log(data)
        let text = "Are you sure?";
        if (window.confirm(text) === true) {
            fetch(`http://localhost:4200/deleteService/${data}`, {
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


                <div style={{ backgroundColor: '#FCF4E0', height: '100%', minHeight: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        <div className="text-center pb-3  text-danger">
                            <h2><u><span className="text-dark">Table</span> List</u></h2>
                        </div>
                        <div>
                            {services?.map(service =>
                                <div onClick={() => {
                                    // garage.service = service;
                                    // localStorage.setItem('serviceInfo',JSON.stringify([garage]) )
                                    // console.log(garage)
                                    // window.location.href='/serviceCheckout';
                                }} style={{ backgroundColor: 'white',width:'450px', }} className="col-12  mx-4 my-4 pb-3 p-3">
                                    <div > <div ><h3 className="text-center text-warning my-3">{service.title}</h3>
                                        <p style={{ lineHeight: '1', color: 'gray', fontWeight: 'bold', marginBottom: '30px' }}>{service.description.split('\n').map(str => <p>{str}</p>)}</p>
                                        <hr />
                                        <h4 className="text-center mt-3"><span style={{ color: '#E5194B' }}>Service Charge:</span> <span className="text-danger font-weight-bold">{service.rate}/-</span></h4>
                                        <div className='row text-center mt-3 p-3'>
                                            <div className='col-6'>
                                                <Link to={`/restaurant/updateTable/${service._id}`} class="btn btn-warning font-weight-bold" >Update Service</Link>

                                            </div>
                                            <div className='col-6'>
                                                <button onClick={() => handleDelete(service._id)} class="btn btn-danger font-weight-bold" >Delete Service</button>
                                            </div>
                                        </div>
                                    </div></div>
                                </div>
                            )}
                        </div>
                        {/* <div>{
                                product.map(fd => <>{fd?.finalData.category === "Service" && <><div style={{ width: '700px', height: '100%', border: '1px solid lightYellow', borderRadius: '30px', backgroundColor: 'lightYellow', marginBottom: '25px', padding: '30px' }}>

                                <div className="font-weight-bold">Order No: <span style={{ color: 'purple' }}>{fd._id.split("").slice(15, 50)}</span></div>
                                <br />
                               
                                           <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">{fd?.finalData?.service?.title}</span> </p> <br />
                                <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">Payment ID: </span><span className="font-weight-bold text-dark">{fd.finalData.paymentData}</span> </p>
                                <br />
                                <div style={{ border: '2px solid #E5194B', padding: '15px' }}>
                                    <p className="font-weight-bold ">Address: <span className="text-danger">Flat No {fd.finalData.address.flatNo}, House No {fd.finalData.address.houseNo}, {fd.finalData.address.area}</span></p>
                                    <p className="font-weight-bold">Contact: <span className="text-danger">{fd.finalData.address.contactNo}</span></p>
                                    <p className="font-weight-bold text-dark">Email: <span className="text-danger">{fd.finalData.email}</span></p>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="d-flex col-md-6">
                                        <div className="">
                                            <p className="mt-2 font-weight-bold">Status: <span className="text-danger">{fd.finalData.status}</span> </p></div>
                                        <div style={{ position: 'relative', left: '10px', top: '7px' }} >
                                          
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}/-</span></p>&nbsp;&nbsp; 
                                    </div>
                                </div>

                            </div></>}</> )
                            }</div> */}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default RestaurantTableList;