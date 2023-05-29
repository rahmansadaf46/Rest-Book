import React, { useEffect, useRef, useState } from "react";

// import fakeData from '../../../fakeData';
import {
  addToDatabaseCart,
  getDatabaseCart,
  minusToDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../../utilities/databaseManager";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import CartItem from "../CartItem/CartItem";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import emailjs from '@emailjs/browser';
const Checkout = () => {
  const [paymentProcess, setPaymentProcess] = useState('Cash On Delivery')
  const [cart, setCart] = useState([]);
  const [count] = useState(1);
  const itemData = localStorage.getItem("item");
  const form = useRef();
  const handleAddProduct = (product) => {
    const toBeAddedKey = product._id;
    const sameProduct = cart.find((pd) => pd._id === toBeAddedKey);
    let newCount;
    // let newCart;
    if (sameProduct) {
      newCount = sameProduct.quantity + 1;
      sameProduct.quantity = newCount;
      // const others = cart.filter(pd => pd._id !== toBeAddedKey);
      // newCart = [...others, sameProduct]
      addToDatabaseCart(sameProduct._id, newCount);
    } else {
      product.quantity = count;
      // newCart = [...cart, product];
      addToDatabaseCart(product._id, product.quantity);
    }
    // setCart(newCart);
  };

  const handleRemoveProduct = (product) => {
    const toBeAddedKey = product._id;
    const sameProduct = cart.find((pd) => pd._id === toBeAddedKey);
    let newCount;
    // let newCart;
    if (sameProduct) {
      newCount = sameProduct.quantity - 1;
      sameProduct.quantity = newCount;
      // const others = cart.filter(pd => pd._id !== toBeAddedKey);
      // newCart = [...others, sameProduct]
      minusToDatabaseCart(sameProduct._id, newCount);
    } else {
      product.quantity = count;
      // newCart = [...cart, product];
      minusToDatabaseCart(product._id, product.quantity);
    }

    if (product.quantity === 0) {
      removeFromDatabaseCart(product._id);
      const newCart = cart.filter((pd) => pd._id !== product._id);
      setCart(newCart);
    }
    // setCart(newCart);
  };

  useEffect(() => {
    // const savedCart = getDatabaseCart();
    // const productKeys = Object.keys(savedCart);
    // const previousCart = productKeys.map((existingKey) => {
    //   const product = JSON.parse(itemData)?.find(
    //     (pd) => pd._id === existingKey
    //   );
    //   product.quantity = savedCart[existingKey];
    //   return product;
    // });

    // setCart(previousCart);
  }, [itemData]);

  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    subTotal = subTotal + product.price * product.quantity;
  }
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    // setAmount(precision);
    return Number(precision);
  };

  let total = 5.0 + 2.0 + subTotal;

  const [success, setSuccess] = useState(false);
  const [flat, setFlat] = useState(false);
  const [house, setHouse] = useState(false);
  const [area, setArea] = useState(false);
  const [contact, setContact] = useState(false);
  const [address, setAddress] = useState({
    flatNo: "",
    houseNo: "",
    area: "",
    contactNo: "",
  });
  const [checkoutData, setCheckoutData] = useState(null);
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)

    if (e.target.name === "flatNo") {
      setFlat(e.target.value.length > 0);
    }
    if (e.target.name === "houseNo") {
      setHouse(e.target.value.length > 0);
    }
    if (e.target.name === "area") {
      setArea(e.target.value.length > 0);
    }
    if (e.target.name === "contactNo") {
      setContact(e.target.value.length > 0);
    }
    if (flat && house && contact && area) {
      setSuccess(true);
      // console.log('successfully')
    }
    // console.log(flat ,house,area,contact)
    const newUserInfo = { ...address };
    newUserInfo[e.target.name] = e.target.value;
    setAddress(newUserInfo);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userProductAddress", JSON.stringify([address]));
    const tempArray = [];
    if (cart.length) {
      cart.forEach((data) => {
        tempArray.push({
          title: data.title,
          quantity: data.quantity,
        });
      });
    }
    const finalData = {
      cart: tempArray,
      address: address,
      email: sessionStorage.getItem("email"),
      amount: formatNumber(total),
      status: "Pending",
      category: "Product",
    };
    console.log(paymentProcess)


    // setCart([]);
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
    
                window.alert('Item Purchase Successfully')
                window.location.assign("/shipment");
              });
            // console.log(form.current)
            emailjs.sendForm('service_tqd5rsa', 'template_nn0qqkj', form.current, 'B9abM11tNChoP6ubN')
              .then((result) => {
                console.log(result.text);
              }, (error) => {
                console.log(error.text);
              });
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
        console.log(success, "success");
        window.location.assign("/shipment");
        if (success) {
        }
      });
   
    processOrder();
    // fetch("https://intense-waters-18558.herokuapp.com/addOrder", {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderDetails)
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data) {
    //             processOrder()
    //             alert("Your order placed successfully");
    //         }
    //     })
  };
  return (
    <div>
      <Header cart={cart.length}></Header>
      <div style={{ display: checkoutData ? "none" : "block" }}>
        <form>
          <div className="container mt-5 pt-5">
            <div className="row">
              <div className="col-md-6">
                <h4>Edit Delivery Details</h4>

                <hr
                  style={{
                    width: "450px",
                    marginRight: "100px",
                    borderTop: "2px solid 	#C8C8C8",
                  }}
                />

                <input
                  onChange={handleChange}
                  name="flatNo"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    width: "75%",
                  }}
                  className="pl-4"
                  type=""
                  required
                  placeholder="Flat no."
                />
                <br />
                <br />
                <input
                  onChange={handleChange}
                  name="houseNo"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    width: "75%",
                  }}
                  className="pl-4"
                  type=""
                  required
                  placeholder="House no."
                />
                <br />
                <br />
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
                  Form <b>Rampura</b>
                </p>
                <p>Arriving in 20-30 min</p>
                {/* <p>27 Rd No 8</p> */}

                {cart.length > 0 ? (
                  <div>
                    <div>
                      {cart.map((item) => (
                        <CartItem
                          showAddToCart={true}
                          handleRemoveProduct={handleRemoveProduct}
                          handleAddProduct={handleAddProduct}
                          key={item._id}
                          item={item}
                        ></CartItem>
                      ))}
                    </div>
                    <div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <p>
                            <b>Subtotal * {cart.length} item</b>
                          </p>
                          <p>
                            <b>Tax</b>
                          </p>
                          <p>
                            <b>Delivery fee</b>
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
                            Cash On Delivery
                          </option>
                          <option value="Online Payment">
                            Online Payment
                          </option>
                        </select>
                      </div>
                      <form ref={form} >
                        <input style={{ display: 'none' }} value={sessionStorage.getItem("name")} type="text" name="user_name" />

                        <input style={{ display: 'none' }} value={sessionStorage.getItem("email")} type="email" name="user_email" />

                        <textarea value="You have successfully purchase an Item" style={{ display: 'none' }} name="message" />
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

export default Checkout;
