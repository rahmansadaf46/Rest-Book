import React, { useEffect, useState } from 'react';
import GarageHeader from '../GarageHeader/GarageHeader';
import GarageSidebar from '../GarageSidebar/GarageSidebar';
import './PendingRequest.css'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
const PendingRequest = () => {
    const [product, setProduct] = useState([]);
    const form = useRef();


    useEffect(() => {
        fetch('http://localhost:4200/garageOrder', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: sessionStorage.getItem('email') })
        })
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('student', JSON.stringify(data));

                // }
                // const email= sessionStorage.getItem('email')
                const items = data.filter(item => item.finalData.status === "Pending")
                console.log(items, data)
                setProduct(items.reverse());
            })
    }, [])
    const handleChange = (data) => {
        console.log(data, "clicked")

        const finalData = {
            address: data.finalData.address,
            amount: data.finalData.amount,
            service: data.finalData.service,
            email: data.finalData.email,
            garageEmail: data.finalData.garageEmail,
            paymentData: data.finalData.paymentData,
            paymentCategory: data.finalData.paymentCategory,
            status: "Mechanic Sent",
            category: "Service",
            date: new Date().toDateString()
        }
        emailjs.sendForm('service_tqd5rsa', 'template_nn0qqkj', form.current, 'B9abM11tNChoP6ubN')
        .then((result) => {
            if (result.text === 'OK'){
                fetch(`http://localhost:4200/updateOrder/${data._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            window.location.reload();
                        }
                    })
            }
        })
      

    }


    return (
        <div>
            <GarageHeader />
            <div className="row">
                <div className="col-md-2">
                    <GarageSidebar />
                </div>


                <div style={{ backgroundColor: '#FEC5E4', height: '100%', minHeight: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        <div className="text-center pb-3 text-danger">
                            <h2><u>Pending Request</u></h2>
                        </div>
                        <div>{
                            product.map(fd => <>{fd?.finalData.category === "Service" && <><div style={{ width: '700px', height: '100%', border: '1px solid lightYellow', borderRadius: '30px', backgroundColor: 'lightYellow', marginBottom: '25px', padding: '30px' }}>

                                <div className="font-weight-bold">Order No: <span style={{ color: 'purple' }}>{fd._id.split("").slice(15, 50)}</span></div>
                                <br />

                                {/* <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">{fd?.finalData?.service?.garageName}</span> </p> */}
                                <p style={{ fontSize: '18px' }}><span className="font-weight-bold text-danger">{fd?.finalData?.service?.title}</span> </p> <br />
                                <p style={{ fontSize: "18px" }}>
                                    <span className="font-weight-bold text-danger">
                                        Payment:{" "}
                                    </span>
                                    <span className="font-weight-bold text-dark">
                                    {fd?.finalData.paymentCategory === 'Online Payment' ? <>{fd?.finalData.paymentCategory}</>:<>Cash On Service</>}
                                    </span>{" "}
                                </p>
                                {
                                    fd?.finalData.paymentCategory !== 'Cash On Delivery' && <p style={{ fontSize: "18px" }}>
                                        <span className="font-weight-bold text-danger">
                                            Payment ID:{" "}
                                        </span>
                                        <span className="font-weight-bold text-dark">
                                            {fd.finalData.paymentData}
                                        </span>{" "}
                                    </p>
                                }
                                <br />
                                <div style={{ border: '2px solid #E5194B', padding: '15px' }}>
                                    <p className="font-weight-bold ">Address: <span className="text-danger"> {fd.finalData.address.area}</span></p>
                                    <p className="font-weight-bold">Contact: <span className="text-danger">{fd.finalData.address.contactNo}</span></p>
                                    <p className="font-weight-bold text-dark">Email: <span className="text-danger">{fd.finalData.email}</span></p>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="d-flex col-md-6">
                                        <div className="">
                                            <p className="mt-2 font-weight-bold">Status: <span className="text-danger">{fd.finalData.status}</span> </p></div>
                                        <div style={{ position: 'relative', left: '10px', top: '7px' }} >
                                            <form ref={form} >
                                                <input style={{ display: 'none' }} value="Client" type="text" name="user_name" />

                                                <input style={{ display: 'none' }} value={fd.finalData.email} type="email" name="user_email" />

                                                <textarea value={`Your ${fd?.finalData?.service?.title} service mechanic is sent`} style={{ display: 'none' }} name="message" />
                                                <label class="switch">
                                                    <input
                                                        onChange={() => handleChange(fd)}
                                                        type="checkbox"
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                {/* <input type="submit" value="Send" /> */}
                                            </form>
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

export default PendingRequest;