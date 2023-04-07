import React, { useEffect, useState } from "react";
import { useRef } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import UpdateAmount from "../UpdateAmount/UpdateAmount";
import "./PendingOrder.css";
import emailjs from '@emailjs/browser';
const PendingOrder = () => {
  const form = useRef();
  const [product, setProduct] = useState([]);

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "admin@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
  }, [email]);
  useEffect(() => {
    fetch("http://localhost:4200/allOrder")
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        //     localStorage.setItem('student', JSON.stringify(data));

        // }
        // const email= sessionStorage.getItem('email')
        const items = data.filter(
          (item) => item.finalData.status === "Pending"
        );
        console.log(items, data);
        setProduct(items);
      });
  }, []);
  const handleChange = (data) => {
    console.log(data, "clicked");

    const finalData = {
      address: data.finalData.address,
      amount: data.finalData.amount,
      cart: data.finalData.cart,
      email: data.finalData.email,
      paymentCategory: data.finalData.paymentCategory,
      paymentData: data.finalData.paymentData,
      status: "Delivered",
      category: "Product",
      date: new Date().toDateString(),
    };
    emailjs.sendForm('service_tqd5rsa', 'template_nn0qqkj', form.current, 'B9abM11tNChoP6ubN')
      .then((result) => {
        console.log(result.text);
        if (result.text === 'OK') {
          fetch(`http://localhost:4200/updateOrder/${data._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                window.location.reload();
              }
            });
        }
      })

  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  function openModal(data) {
    setItem(data);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            <div className="text-center pb-3 text-danger">
              <h2>
                <u>Pending Order</u>
              </h2>
            </div>
            <div>
              {product.map((fd) => (
                <>
                  {fd?.finalData.category === "Product" && (
                    <>
                      <div
                        style={{
                          width: "700px",
                          height: "100%",
                          border: "1px solid lightYellow",
                          borderRadius: "30px",
                          backgroundColor: "lightYellow",
                          marginBottom: "25px",
                          padding: "30px",
                        }}
                      >
                        <div className="font-weight-bold">
                          Order No:{" "}
                          <span style={{ color: "purple" }}>
                            {fd._id.split("").slice(15, 50)}
                          </span>
                        </div>
                        <br />
                        {fd?.finalData?.cart.map((item) => (
                          <p style={{ fontSize: "18px" }}>
                            <span className="font-weight-bold text-danger">
                              {item.title}
                            </span>{" "}
                            <span className="font-weight-bold text-dark">
                              : {item.quantity}pcs
                            </span>
                          </p>
                        ))}{" "}
                        <br />
                        <p style={{ fontSize: "18px" }}>
                          <span className="font-weight-bold text-danger">
                            Payment:{" "}
                          </span>
                          <span className="font-weight-bold text-dark">
                            {fd.finalData.paymentCategory}
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
                        <div
                          style={{
                            border: "2px solid #E5194B",
                            padding: "15px",
                          }}
                        >
                          <p className="font-weight-bold ">
                            Address:{" "}
                            <span className="text-danger">
                              Flat No {fd.finalData.address.flatNo}, House No{" "}
                              {fd.finalData.address.houseNo},{" "}
                              {fd.finalData.address.area}
                            </span>
                          </p>
                          <p className="font-weight-bold">
                            Contact:{" "}
                            <span className="text-danger">
                              {fd.finalData.address.contactNo}
                            </span>
                          </p>
                          <p className="font-weight-bold text-dark">
                            Email:{" "}
                            <span className="text-danger">
                              {fd.finalData.email}
                            </span>
                          </p>
                        </div>
                        <br />
                        <div className="row">
                          <div className="d-flex col-md-6">
                            <div className="">
                              <p className="mt-2 font-weight-bold">
                                Status:{" "}
                                <span className="text-danger">
                                  {fd.finalData.status}
                                </span>{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                position: "relative",
                                left: "10px",
                                top: "7px",
                              }}
                            >
                              <form ref={form} >
                                <input style={{ display: 'none' }} value="Client" type="text" name="user_name" />

                                <input style={{ display: 'none' }} value={fd.finalData.email} type="email" name="user_email" />

                                <textarea value={`Your ${fd?.finalData?.cart.map((item) => item.title)} item is delivered`} style={{ display: 'none' }} name="message" />
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
                            <p className="mt-2 font-weight-bold">
                              Amount:{" "}
                              <span className="text-danger">
                                {fd.finalData.amount}/-
                              </span>
                            </p>
                            &nbsp;&nbsp;{" "}
                            <button
                              onClick={() => openModal(fd)}
                              style={{ padding: "0px 10px" }}
                              className="btn btn-warning font-weight-bold"
                            >
                              Edit Amount
                            </button>
                            <UpdateAmount
                              modalIsOpen={modalIsOpen}
                              item={item}
                              closeModal={closeModal}
                            ></UpdateAmount>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrder;
