import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar';
import { Link } from 'react-router-dom';
// import './BookingRequest.css'
const RestaurantProfileUser = () => {
    const [restaurant, setRestaurant] = useState([]);



    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id)
        fetch('http://localhost:4200/restaurantProfile/' + JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id)
        .then(res => res.json())
        .then(data => {
          console.log(data);
       
        
          // data.area = area;
          setRestaurant([data])
       
          // setServices(data)
          // setRestaurant(data);
          // setAllItem(data);
          // localStorage.setItem('item', JSON.stringify(data));
  
        })
        // fetch(`http://localhost:4200/service/${JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id}`)
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

console.log(restaurant)

    return (
        <div>
            <RestaurantHeader />
            <div className="row">
                <div className="col-md-2">
                    <RestaurantSidebar />
                </div>


                <div style={{ backgroundColor: '#FCF4E0', height: '100%', minHeight: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        {/* <div className="text-center ml-5 pb-3 ">
                            <h2><u>restaurant Profile</u></h2>
                        </div> */}
                        <div>
                        <div style={{ backgroundColor: 'white', borderRadius: '20px',border:'3px solid #E5194B'  }} className="col-12  mx-4 my-4 pb-3 p-3">
                                <div > <div >
                                    {/* <h3 className="text-center text-warning my-3">{service.title}</h3> */}
                                    {/* <p style={{ lineHeight: '0.3', color: 'gray', fontWeight: 'bold', marginBottom: '30px' }}>{service.description.split('\n').map(str => <p>{str}</p>)}</p> */}
                                    {/* <hr /> */}
                                    <div className='d-flex justify-content-center'>
                                    <img style={{ width: '200px', borderRadius: '50%' }} src={`http://localhost:4200/restaurant/${restaurant[0]?.image}`} alt="" />
                                    </div>
                                    <p className="text-left font-weight-bold  mt-3">
                          <span style={{ color: "#E5194B" }}>Restaurant Name:</span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.title}
                          </span>
                        </p>
                        <p className="text-left   font-weight-bold   mt-3">
                          <span style={{ color: "#E5194B" }}>Address:</span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.address}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold    mt-3">
                          <span style={{ color: "#E5194B" }}>Description:</span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.description}
                          </span>
                        </p>
                        <p className="text-left   font-weight-bold   mt-3">
                          <span style={{ color: "#E5194B" }}>Contact:</span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.mobile}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#E5194B" }}>
                          Restaurant User Email:
                          </span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.user}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#E5194B" }}>
                            Facebook Code:
                          </span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.facebook}
                          </span>
                        </p>
                        <p className="text-left  font-weight-bold   mt-3">
                          <span style={{ color: "#E5194B" }}>
                            Active Status:
                          </span>
                          <span className=" font-weight-bold">
                            {" "}
                            {restaurant[0]?.status === 'Active' ? <span className="text-success">{restaurant[0]?.status}</span> : <span>{restaurant[0]?.status}</span>}
                          </span>
                        </p>
                                    <hr/>
                                    <p className="text-center     mt-3">
                                        <span  style={{ color: 'orange' }}>Areas</span> 
                                    <ul style={{listStyle:'none'}} className=" font-weight-bold text-center"> {restaurant[0]?.area.map(data=> <li className="mr-5 my-2 text-uppercase"># {data}</li>)}</ul>
                                    </p>
                                    {/* <h4 className="text-left     mt-3">
                                        <span style={{ color: '#E5194B' }}>restaurant Facebook Code:</span> 
                                    <span className=" font-weight-bold"> {restaurant[0].facebook}</span>
                                    </h4>    */}
                                    {/* <h4 className="text-left     mt-3">
                                        <span style={{ color: '#E5194B' }}>restaurant Facebook Code:</span> 
                                    <span className=" font-weight-bold"> {restaurant[0].facebook}</span>
                                    </h4> */}
                                    <div className='row text-center mt-3 p-3'>
                                        <div className='col-12'>
                                            <Link to={`/restaurant/updateRestaurant/${restaurant[0]?._id}`} class="btn btn-warning font-weight-bold" >Update Restaurant</Link>
                                            
                                        </div>
                                        
                                    </div>
                                </div></div>
                            </div>
                            </div>
                        {/* <div>{
                                product.map(fd => <>{fd?.finalData.category === "Service" && <><div style={{ width: '700px', height: '100%', border: '1px solid lightYellow', borderRadius: '30px', backgroundColor: 'lightYellow', marginBottom: '25px', padding: '30px' }}>

                                <div className="font-weight-bold">Order No: <span style={{ color: 'purple' }}>{fd._id.split("").slice(15, 50)}</span></div>
                                <br />
                               
                                           <p style={{ fontSize: '18px' }}><span className="font-weight-bold ">{fd?.finalData?.service?.title}</span> </p> <br />
                                <p style={{ fontSize: '18px' }}><span className="font-weight-bold ">Payment ID: </span><span className="font-weight-bold text-dark">{fd.finalData.paymentData}</span> </p>
                                <br />
                                <div style={{ border: '2px solid #E5194B', padding: '15px' }}>
                                    <p className="font-weight-bold ">Address: <span className="">Flat No {fd.finalData.address.flatNo}, House No {fd.finalData.address.houseNo}, {fd.finalData.address.area}</span></p>
                                    <p className="font-weight-bold">Contact: <span className="">{fd.finalData.address.contactNo}</span></p>
                                    <p className="font-weight-bold text-dark">Email: <span className="">{fd.finalData.email}</span></p>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="d-flex col-md-6">
                                        <div className="">
                                            <p className="mt-2 font-weight-bold">Status: <span className="">{fd.finalData.status}</span> </p></div>
                                        <div style={{ position: 'relative', left: '10px', top: '7px' }} >
                                          
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <p className="mt-2 font-weight-bold">Amount: <span className="">{fd.finalData.amount}/-</span></p>&nbsp;&nbsp; 
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

export default RestaurantProfileUser;