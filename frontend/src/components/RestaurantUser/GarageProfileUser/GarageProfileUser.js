import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import GarageHeader from '../GarageHeader/GarageHeader';
import GarageSidebar from '../GarageSidebar/GarageSidebar';
// import './PendingRequest.css'
const GarageProfileUser = () => {
    const [garage, setGarage] = useState([]);



    useEffect(() => {
        setGarage(JSON.parse(sessionStorage.getItem('garageUser')))
        // fetch(`http://localhost:4200/service/${JSON.parse(sessionStorage.getItem('garageUser'))[0]._id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         // if (data) {
        //         //     localStorage.setItem('student', JSON.stringify(data));

        //         // }
        //         // const email= sessionStorage.getItem('email')
        //         // const items = data.filter(item => item.finalData.status !== "Pending")
        //         console.log(data)
        //         setServices(data);
        //     })
    }, [])

console.log(garage)

    return (
        <div>
            <GarageHeader />
            <div className="row">
                <div className="col-md-2">
                    <GarageSidebar />
                </div>


                <div style={{ backgroundColor: '#FEC5E4', height: '100%', minHeight: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        {/* <div className="text-center ml-5 pb-3 text-danger">
                            <h2><u>Garage Profile</u></h2>
                        </div> */}
                        <div>
                        <div style={{ backgroundColor: 'white', borderRadius: '20px'  }} className="col-12  mx-4 my-4 pb-3 p-3">
                                <div > <div >
                                    {/* <h3 className="text-center text-warning my-3">{service.title}</h3> */}
                                    {/* <p style={{ lineHeight: '0.3', color: 'gray', fontWeight: 'bold', marginBottom: '30px' }}>{service.description.split('\n').map(str => <p>{str}</p>)}</p> */}
                                    {/* <hr /> */}
                                    <div className='d-flex justify-content-center'>
                                    <img style={{ width: '200px', borderRadius: '50%' }} src={`http://localhost:4200/garage/${garage[0]?.image}`} alt="" />
                                    </div>
                                    <h4 className="text-left mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Name:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0]?.title}</span>
                                    </h4>
                                    <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Address:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0]?.address}</span>
                                    </h4>
                                    <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Description:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0]?.description}</span>
                                    </h4>
                                    <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Contact:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0]?.mobile}</span>
                                    </h4>
                                    <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage User Email:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0]?.user}</span>
                                    </h4>
                                    <hr/>
                                    <h4 className="text-center     mt-3">
                                        <span  style={{ color: 'orange' }}>Areas</span> 
                                    <ul className="text-danger font-weight-bold text-center"> {garage[0]?.area.map(data=> <li className="mr-5 my-2 text-uppercase"># {data}</li>)}</ul>
                                    </h4>
                                    {/* <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Facebook Code:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0].facebook}</span>
                                    </h4>    */}
                                    {/* <h4 className="text-left     mt-3">
                                        <span style={{ color: '#F58E82' }}>Garage Facebook Code:</span> 
                                    <span className="text-danger font-weight-bold"> {garage[0].facebook}</span>
                                    </h4> */}
                                    <div className='row text-center mt-3 p-3'>
                                        <div className='col-6'>
                                            {/* <Link to={`/garage/updateService/${service._id}`} class="btn btn-warning font-weight-bold" >Update Service</Link> */}
                                            
                                        </div>
                                        <div className='col-6'>
                                        {/* <button class="btn btn-danger font-weight-bold" >Delete Service</button> */}
                                        </div>
                                    </div>
                                </div></div>
                            </div>
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

export default GarageProfileUser;