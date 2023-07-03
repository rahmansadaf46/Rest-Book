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
import { Link } from "react-router-dom/cjs/react-router-dom";
import TableCart from "../TableCart/TableCart";
const Checkout = () => {
  const [amount, setAmount] = useState('')
  const [paymentProcess, setPaymentProcess] = useState('Payment on Location')
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
    const savedCart = getDatabaseCart();
    // const productKeys = Object.keys(savedCart);
    // const previousCart = productKeys.map((existingKey) => {
    //   const product = JSON.parse(itemData)?.find(
    //     (pd) => pd._id === existingKey
    //   );
    //   product.quantity = savedCart[existingKey];
    //   return product;
    // });
    setCart(savedCart);
    if (cart?.restaurantData?.afterCheckIn && cart?.restaurantData?.beforeCheckIn) {
      setPaymentProcess('Payment on Location')
    } else if (cart?.restaurantData?.afterCheckIn && !cart?.restaurantData?.beforeCheckIn) {
      setPaymentProcess('Payment on Location')
    } else if (!cart?.restaurantData?.afterCheckIn && cart?.restaurantData?.beforeCheckIn) {
      setPaymentProcess('Online Payment')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let subTotal = 0;
  for (let i = 0; i < cart?.foodData?.length; i++) {
    const product = cart.foodData[i];
    console.log(product, cart)
    subTotal = subTotal + product.price * product.quantity;
  }
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    // setAmount(precision);
    return Number(precision);
  };

  let total = 5.0 + subTotal;

  const [success, setSuccess] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [contact, setContact] = useState(false);
  const [address, setAddress] = useState({
    name: window.sessionStorage.getItem('name'),
    email: window.sessionStorage.getItem('email'),
    contactNo: "",
  });
  const [checkoutData, setCheckoutData] = useState(null);
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)

    if (e.target.name === "contactNo") {
      setContact(e.target.value.length > 0);
    }
    if (contact) {
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
    emailjs.sendForm('service_6bdk1hq', 'template_c9twe6i', form.current, 'YTPdWWp9Os7kSo6b6')
      .then((result) => {
        console.log(result.text);
        if (result.text === 'OK') {
          if (success === true) {
            if (paymentProcess === 'Payment on Location') {
              finalData.paymentData = null;
              finalData.paymentCategory = 'Payment on Location';

              fetch("http://localhost:4200/addOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ finalData }),
              })
                .then((res) => res.json())
                .then((success) => {
                  console.log(success, "success");

                  window.alert('Your booking is confirmed')
                  cart.tableData.forEach(table => {
                    let dataBody = {
                      date: `${cart.date}`,
                      restaurantId: table.restaurantId,
                      tableId: table._id
                    }
                    fetch("http://localhost:4200/findBooking", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ dataBody }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        let result = [...filterBySimilarTime(data[0].bookingInfo, table.slot), ...filterByNotAvailable(data[0].bookingInfo, table.slot)];
                        console.log(result)
                        let updateData = {
                          date: `${cart.date}`,
                          bookingInfo: result,
                          restaurantId: table.restaurantId,

                          tableId: table._id
                        }
                        fetch(`http://localhost:4200/updateBooking/${data[0]._id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ updateData }),
                        })
                          .then((response) => response.json())
                          .then((res) => {
                            if (res) {

                            }
                          })
                      })
                  })
                  localStorage.clear();
                  window.location.assign("/");
                });
              // console.log(form.current)
              emailjs.sendForm('service_6bdk1hq', 'template_c9twe6i', form.current, 'YTPdWWp9Os7kSo6b6')
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
            window.alert("Please enter your contact no. ");
          }
        }
      }, (error) => {
        console.log(error.text);
      });

  };
  function filterBySimilarTime(array1, array2) {
    // Extracting time values from array2 into a new array
    const array2Times = array2.map(item => item.time);

    // Filtering array1 based on similar time values
    const filteredArray = array1.filter(item => !array2Times.includes(item.time));

    return filteredArray;
  }
  function filterByNotAvailable(array1, array2) {
    // Extracting time values from array2 into a new array
    const array2Times = array2.map(item => item.time);

    // Filtering array1 based on similar time values
    const filteredArray = array1.filter(item => array2Times.includes(item.time));

    filteredArray.forEach(obj => {
      obj.status = "Not Available";
    });
    return filteredArray;
  }
  const handlePaymentSuccess = (paymentId) => {
    const finalData = checkoutData;
    finalData.paymentData = paymentId;
    finalData.paymentCategory = 'Online Payment';
    finalData.amount = amount
    fetch("http://localhost:4200/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finalData }),
    })
      .then((res) => res.json())
      .then((success) => {
        console.log(success, "success");
        cart.tableData.forEach(table => {
          let dataBody = {
            date: `${cart.date}`,
            restaurantId: table.restaurantId,
            tableId: table._id
          }
          fetch("http://localhost:4200/findBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dataBody }),
          })
            .then((res) => res.json())
            .then((data) => {
              let result = [...filterBySimilarTime(data[0].bookingInfo, table.slot), ...filterByNotAvailable(data[0].bookingInfo, table.slot)];
              let updateData = {
                date: `${cart.date}`,
                bookingInfo: result,
                restaurantId: table.restaurantId,

                tableId: table._id
              }
              fetch(`http://localhost:4200/updateBooking/${data[0]._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updateData }),
              })
                .then((response) => response.json())
                .then((res) => {
                  if (res) {

                  }
                })
            })
        })
        localStorage.clear();
        window.location.assign("/");
        // if (success) {
        // }
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

  const handleRemove = () => {
    console.log(cart.tableData)
    cart.tableData.forEach(table => {
      let dataBody = {
        date: `${cart.date}`,
        restaurantId: table.restaurantId,
        tableId: table._id
      }
      fetch("http://localhost:4200/findBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataBody }),
      })
        .then((res) => res.json())
        .then((data) => {
          let result = filterBySimilarTime(data[0].bookingInfo, table.slot);
          let updateData = {
            date: `${cart.date}`,
            bookingInfo: result,
            restaurantId: table.restaurantId,

            tableId: table._id
          }
          fetch(`http://localhost:4200/updateBooking/${data[0]._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ updateData }),
          })
            .then((response) => response.json())
            .then((res) => {
              if (res) {
                window.localStorage.clear();
                setCart([])
              }
            })
        })
    })


  }
  return (
    <div>
      <Header cart={cart.length}></Header>
      <div style={{ display: checkoutData ? "none" : "block" }}>
        <form>
          <div className="container mt-5 pt-5">
            <div className="row">
              <div className="col-md-6">
                <h4>Add Contact Details</h4>

                <hr
                  style={{
                    width: "450px",
                    marginRight: "100px",
                    borderTop: "2px solid 	#C8C8C8",
                  }}
                />

                <input
                  onChange={handleChange}
                  name="name"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    backgroundColor: "#FFCCCB",
                    border: "1px solid gray",
                    width: "75%",
                  }}
                  disabled
                  value={address.name}
                  readOnly
                  className="pl-4"
                  type=""
                  required
                  placeholder="Name"
                />
                <br />
                <br />
                <input
                  onChange={handleChange}
                  disabled
                  name="email"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    backgroundColor: "#FFCCCB",
                    width: "75%",
                  }}
                  value={address.email}
                  readOnly
                  className="pl-4"
                  type=""
                  required
                  placeholder="Email"
                />
                <br />

                <br />
                <input
                  onChange={handleChange}
                  onInputChange={handleChange}
                  name="contactNo"
                  style={{
                    height: "50px",
                    borderRadius: "30px",
                    border: "1px solid gray",
                    backgroundColor: "#FFFFE0",
                    width: "75%",
                  }}
                  className="pl-4"
                  type="number"
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
                {/* <p>
                  Form <b>Rampura</b>
                </p>
                <p>Arriving in 20-30 min</p> */}
                {/* <p>27 Rd No 8</p> */}
                {Object.keys(cart).length > 0 ? (
                  <div>
                    <div style={{ border: '2px solid red', padding: '5px', borderRadius: '30px', background: '#FFCCCB' }}>
                      <div className="d-flex justify-content-end"><span onClick={() => handleRemove()} class="btn btn-danger mr-3" >Clear</span>
                      </div>
                      {/* {cart.map((item) => (
                        <CartItem
                          showAddToCart={true}
                          handleRemoveProduct={handleRemoveProduct}
                          handleAddProduct={handleAddProduct}
                          key={item._id}
                          item={item}
                        ></CartItem>
                      ))} */}
                      <Link to={`/restaurant/${cart.restaurantData._id}`} className='d-flex res-title mb-5 pb-5'>
                        <img className='res-img' style={{}} src={`http://localhost:4200/restaurant/${cart.restaurantData.image}`} alt="" />
                        <h2 className='ml-4 mt-4 res-name '>{cart.restaurantData.title}</h2>
                      </Link>

                      {cart.foodData.map((item) => (
                        <CartItem
                          showAddToCart={true}
                          handleRemoveProduct={handleRemoveProduct}
                          handleAddProduct={handleAddProduct}
                          key={item._id}
                          item={item}
                        ></CartItem>
                      ))}
                      {cart.tableData.map((item) => (
                        <TableCart
                          showAddToCart={true}
                          handleRemoveProduct={handleRemoveProduct}
                          handleAddProduct={handleAddProduct}
                          key={item._id}
                          item={item}
                        ></TableCart>
                      ))}
                    </div>
                    <div>
                      <div className="row mt-4">
                        <div className="col-md-10">
                          <p>
                            <b>Subtotal * {cart.length} item</b>
                          </p>
                          <p>
                            <b>Tax</b>
                          </p>
                          <p>
                          </p>
                          <h5>
                            <b>Total</b>
                          </h5>
                          {cart.restaurantData.beforeCheckIn && <h5 className="text-success">
                            <b>Minimum Payable Amount</b>
                          </h5>}

                        </div>
                        <div className="col-md-2 text-right">
                          <p>
                            <b>{formatNumber(subTotal)}/-</b>
                          </p>
                          <p>
                            <b>5.00/-</b>
                          </p>
                          <p>
                          </p>
                          <h5>
                            <b>{formatNumber(total)}/-</b>
                          </h5>
                          {cart.restaurantData.beforeCheckIn && <h5 className="text-danger">
                            <b>{cart.restaurantData.paymentAmount}/-</b>
                          </h5>}

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
                          {cart.restaurantData.afterCheckIn && <option value="Payment on Location">
                            Payment on Location
                          </option>}
                          {cart.restaurantData.beforeCheckIn && <option value="Online Payment">
                            Online Payment
                          </option>}

                        </select>
                      </div>
                      <form ref={form} >
                        <input style={{ display: 'none' }} value={sessionStorage.getItem("name")} type="text" name="user_name" />

                        <input style={{ display: 'none' }} value={sessionStorage.getItem("email")} type="email" name="user_email" />

                        <textarea value="Your booking is confirmed" style={{ display: 'none' }} name="message" />
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
          <label>Minimum Amount: <b>{cart.restaurantData?.paymentAmount}</b>/- </label>
          <br />
          <label>Enter Amount</label>
          <input type="number" style={{
            padding: "10px",
          }}
            placeholder=""
            onChange={(e) => setAmount(e.target.value)}
            className="ml-3 font-weight-bold mb-4" />
          <br />
          <ProcessPayment amount={amount} restaurantData={cart.restaurantData} handlePayment={handlePaymentSuccess} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Checkout;
