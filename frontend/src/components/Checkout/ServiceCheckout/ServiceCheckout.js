import React, { useEffect, useState } from "react";
import { useRef } from "react";

// import fakeData from '../../../fakeData';
import {
  getDatabaseCart,
  processOrder,
} from "../../../utilities/databaseManager";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
// import CartItem from '../CartItem/CartItem';
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import emailjs from '@emailjs/browser';
const ServiceCheckout = () => {
  const form = useRef();
  const [cart, setCart] = useState([]);
  // const [count] = useState(1);
  const itemData = localStorage.getItem("item");
  const [service, setService] = useState([]);
  const [paymentProcess, setPaymentProcess] = useState('Cash On Delivery')
  // const handleRemoveProduct = (product) => {
  //     const toBeAddedKey = product._id;
  //     const sameProduct = cart.find(pd => pd._id === toBeAddedKey);
  //     let newCount;
  //     // let newCart;
  //     if (sameProduct) {
  //         newCount = sameProduct.quantity - 1;
  //         sameProduct.quantity = newCount;
  //         // const others = cart.filter(pd => pd._id !== toBeAddedKey);
  //         // newCart = [...others, sameProduct]
  //         minusToDatabaseCart(sameProduct._id, newCount);
  //     }
  //     else {
  //         product.quantity = count;
  //         // newCart = [...cart, product];
  //         minusToDatabaseCart(product._id, product.quantity);

  //     }

  //     if (product.quantity === 0) {
  //         removeFromDatabaseCart(product._id);
  //         const newCart = cart.filter(pd => pd._id !== product._id);
  //         setCart(newCart);

  //     }
  //     // setCart(newCart);

  // }
  useEffect(() => {
    setService(JSON.parse(localStorage.getItem("serviceInfo")));
    // console.log(JSON.parse(localStorage.getItem("serviceInfo")));
  }, []);
  useEffect(() => {
    // console.log(sessionStorage.getItem('serviceInfo'))
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = JSON.parse(itemData)?.find(
        (pd) => pd._id === existingKey
      );
      product.quantity = savedCart[existingKey];
      return product;
    });

    setCart(previousCart);
  }, [itemData]);

  let subTotal = 0;
  for (let i = 0; i < service.length; i++) {
    // const product = cart[i];
    subTotal = parseInt(service[0]?.service?.rate);
  }
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    // setAmount(precision);
    return Number(precision);
  };

  let total = 5.0 + 2.0 + subTotal;

  const [success, setSuccess] = useState(false);

  const [area, setArea] = useState(false);
  const [contact, setContact] = useState(false);
  const [address, setAddress] = useState({
    area: "",
    contactNo: "",
  });
  const [checkoutData, setCheckoutData] = useState(null);
  const handleChange = (e) => {
    if (e.target.name === "area") {
      setArea(e.target.value.length > 0);
    }
    if (e.target.name === "contactNo") {
      setContact(e.target.value.length > 0);
    }
    if (contact && area) {
      setSuccess(true);
    }
    const newUserInfo = { ...address };
    newUserInfo[e.target.name] = e.target.value;
    setAddress(newUserInfo);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
 
    service[0].service.restaurantName = service[0].title;
    // localStorage.setItem('userAddress', )
    localStorage.setItem("userAddress", JSON.stringify([address]));
    const finalData = {
      service: service[0]?.service,
      address: address,
      restaurantEmail: service[0]?.user,
      email: sessionStorage.getItem("email"),
      amount: formatNumber(total),
      status: "Pending",
      category: "Service",
    };
    emailjs.sendForm('service_tqd5rsa', 'template_nn0qqkj', form.current, 'B9abM11tNChoP6ubN')
    .then((result) => {
      console.log(result.text);
      if(result.text === 'OK'){
        if (success === true) {
     
          if (paymentProcess === 'Cash On Delivery') {
            finalData.paymentData = null;
            finalData.paymentCategory = 'Cash On Delivery';
            fetch("http://localhost:4200/addOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ finalData }),
            })
              .then((res) => res.json())
              .then((success) => {
                console.log(success, "success");
                
                window.alert('Service Purchase Successfully')
                window.location.assign(`/serviceShipment/${service[0]?.coords}`);
              });
            // emailjs.sendForm('service_tqd5rsa', 'template_nn0qqkj', form.current, 'B9abM11tNChoP6ubN')
            //   .then((result) => {
            //     console.log(result.text);
            //   }, (error) => {
            //     console.log(error.text);
            //   });
            processOrder();
          }
          else {
          
            setCheckoutData(finalData);
          }
        } else {
          window.alert("please enter your address");
        }
      }
    }, (error) => {
      console.log(error.text);
    });
    
  };

  const handlePaymentSuccess = (paymentId) => {
    const finalData = checkoutData;
    finalData.paymentData = paymentId;
    finalData.paymentCategory = 'Online Payment';
    fetch("http://localhost:4200/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finalData }),
    })
      .then((res) => res.json())
      .then((success) => {
        window.location.assign(`/serviceShipment/${service[0]?.coords}`);
      });
  
    processOrder();
  };
  return (
    <div>
      <Header cart={cart.length}></Header>
      <div style={{ display: checkoutData ? "none" : "block" }}>
        <form>
          <div className="container mt-5 pt-5">
            <div className="row">
              <div className="col-md-6">
                <h4>Enter your Location</h4>
                <hr
                  style={{
                    width: "450px",
                    marginRight: "100px",
                    borderTop: "2px solid 	#C8C8C8",
                  }}
                />

                <input
                  onChange={handleChange}
                  name="area"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    width: "75%",
                  }}
                  className="pl-4"
                  type=""
                  required
                  placeholder="Area"
                />
                <br />
                <br />
                <input
                  onChange={handleChange}
                  name="contactNo"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    width: "75%",
                  }}
                  className="pl-4"
                  type=""
                  required
                  placeholder="Contact no."
                />
                {/* <Form.Group className="mt-4" controlId="">
                                
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                              
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                               
                            </Form.Group>

                            <Button style={{ padding: '10px 164px' }} variant="danger" type="submit">
                                Save & Continue</Button> */}
                <br />
                <br />
              </div>
              <div style={{ marginLeft: "190px" }} className="col-md-4 ">
                <p>
                  Form <b>{service[0]?.address}</b>
                </p>
                <p>Arriving in 20-30 min</p>
                {/* <p>107 Rd No 8</p> */}

                {service.length > 0 ? (
                  <div>
                    <div>
                      <div
                        style={{
                          background: "#E8E8E8",
                          border: "1px solid white",
                          borderRadius: "30px",
                          marginTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        <div className="p-3">
                          <span className="text-danger">
                            <b>Restaurant Name:</b>{" "}
                            <span className="font-weight-bold text-dark">
                              {service[0]?.title}
                            </span>
                          </span>
                          <br />
                          <span className="text-warning">
                            <b>Service Name:</b>{" "}
                            <span className="font-weight-bold text-dark">
                              {service[0]?.service?.title}
                            </span>
                          </span>
                          {/* <span>Service Name: {service[0]?.service?.title}</span> */}
                          <br />
                          <span className="text-danger">
                            <b>Service Rate:</b>{" "}
                            <span className="font-weight-bold text-dark">
                              {service[0]?.service?.rate}/-
                            </span>
                          </span>
                          {/* <span>Service Rate: {service[0]?.service?.rate}</span> */}
                        </div>
                      </div>
                      {/* {
                                                    cart.map(item => <CartItem showAddToCart={true} handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} key={item._id} item={item}></CartItem>)
                                                } */}
                    </div>
                    <div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <p>
                            <b>Subtotal </b>
                          </p>
                          <p>
                            <b>Tax</b>
                          </p>
                          <p>
                            <b>Vat</b>
                          </p>
                          <h4>
                            <b>Total</b>
                          </h4>
                        </div>
                        <div className="col-md-6 text-right">
                          <p>
                            <b>{formatNumber(subTotal)}/-</b>
                          </p>
                          <p>
                            <b>5.00/-</b>
                          </p>
                          <p>
                            <b>2.00/-</b>
                          </p>
                          <h4>
                            <b>{formatNumber(total)}/-</b>
                          </h4>
                        </div>
                      </div>
                      <div className="text-center text-danger">
                        <p><b>Select Payment</b></p>
                        <select

                          onChange={(event) => {
                            console.log(event.target.value)
                            setPaymentProcess(event.target.value)
                          }}
                          className="form-control"
                        >
                          <option disabled={true} value="Not set">
                            Select Payment
                          </option>
                          <option value="Cash On Delivery">
                            Cash On Service
                          </option>
                          <option value="Online Payment">
                            Online Payment
                          </option>
                        </select>
                      </div>
                      <form ref={form} >
                        <input style={{ display: 'none' }} value={sessionStorage.getItem("name")} type="text" name="user_name" />

                        <input style={{ display: 'none' }} value={sessionStorage.getItem("email")} type="email" name="user_email" />

                        <textarea value={`You have successfully purchase ${service[0]?.service?.title} from ${service[0]?.title}`} style={{ display: 'none' }} name="message" />
                        <input
                          onClick={handlePlaceOrder}
                          type="submit"
                          style={{
                            marginLeft: "15px",
                            padding: "10px 132px",
                            backgroundColor: "#E5194B",
                          }}
                          placeholder="Place Order"
                          className="btn text-white font-weight-bold my-4"
                        />
                        {/* <input type="submit" value="Send" /> */}
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <h3 className="text-danger mt-5  p-4">Cart is Empty</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        style={{
          display: checkoutData ? "block" : "none",
          marginTop: "100px",
          marginBottom: "170px",
        }}
      >
        <div
          style={{
            width: "40%",
            border: "5px solid white",
            boxShadow: "5px 5px 100px gray",
            borderRadius: "50px",
          }}
          className="container p-5"
        >
          <div className="text-center text-danger">
            <h3>Payment Here</h3>
          </div>
          <br />
          <ProcessPayment handlePayment={handlePaymentSuccess} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ServiceCheckout;
