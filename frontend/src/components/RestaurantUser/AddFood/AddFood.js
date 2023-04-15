import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import AdminHeader from "../AdminHeader/AdminHeader";
// import AdminSidebar from "../AdminSidebar/AdminSidebar";
import RestaurantHeader from "../RestaurantHeader/RestaurantHeader";
import RestaurantSidebar from "../RestaurantSidebar/RestaurantSidebar";

const AddFood = () => {
  const { register, handleSubmit, errors } = useForm();
  const [restaurantData, setRestaurantData] = useState([]);
  const user = sessionStorage.getItem("email");
  // const [loading, setLoading] = useState(false);
  // const [dept, setDept] = useState([]);
  // document.title = "Enroll A Student";
  // const [category, setCategory] = useState("Transmission system");
  // const email = sessionStorage.getItem("email");

  // useEffect(() => {
  //   if (email !== "admin@gmail.com") {
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     window.location.assign("/");
  //   }
  // }, [email]);

  // const changeCategory = (data) => {
  //   setCategory(data);
  // };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const onSubmit = (data) => {
    data.restaurantId = restaurantData._id;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("restaurantId", restaurantData._id);
    // formData.append("category", category);
    fetch("http://localhost:4200/addFood", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Food added successfully");
        window.location.reload();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (user) {
      fetch("http://localhost:4200/restaurantUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user }),
      })
        .then((res) => res.json())
        .then((data) => {
          setRestaurantData(data[0]);
        });
    }

  }, [user]);
  // useEffect(() => {
  //     setDept(JSON.parse(localStorage.getItem("dept")) || {});
  // }, [])
  return (
    <div>
      <RestaurantHeader />
      <div className="row">
        <div className="col-md-2">
          <RestaurantSidebar />
        </div>
        <div
          style={{ backgroundColor: "#FCF4E0", height: "100vh" }}
          className="col-md-10 pt-4"
        >
          <div className="text-center  text-danger">
            <h2>
              <u>Add a <span className="text-dark">Food</span></u>
            </h2>
          </div>
          <div className="col-md-12">
            <div>
              <form
                className="p-3 container col-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Title</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="title"
                    placeholder="Enter Food Name"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group row mb-1">
                  <div className="form-group col-12 text-danger text-center">
                    <label for="">
                      <b>Enter Price</b>
                    </label>
                    <input
                      step="any"
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="number"
                      ref={register({ required: true })}
                      name="price"
                      placeholder="Price"
                      className="form-control"
                    />
                    {errors.roll && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12 text-danger text-center">
                    <label for="">
                      <b>Enter Description</b>
                    </label>
                    <textarea
                      style={{
                        height: "90px",
                        borderRadius: "20px",
                        border: "2px solid #E5194B",
                      }}
                      type="text"
                      ref={register({ required: true })}
                      name="description"
                      placeholder="Description"
                      className="form-control"
                    />
                    {errors.email && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-6 text-danger text-center">
                    <label for="">
                      <b>Enter Short Description</b>
                    </label>
                    <textarea
                      style={{
                        height: "70px",
                        borderRadius: "20px",
                        border: "2px solid #E5194B",
                      }}
                      type="number"
                      ref={register({ required: true })}
                      name="shortDescription"
                      placeholder="Short Description"
                      className="form-control"
                    />
                    {errors.mobile && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="col-6 text-danger">
                    <label for="">
                      <b>Upload Image</b>
                    </label>

                    <input
                      ref={register({ required: true })}
                      onChange={handleFileChange}
                      className="form"
                      name="image"
                      type="file"
                    />
                    {errors.file && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* <div
                    style={{ padding: "0px 90px" }}
                    className="col-md-10 text-danger text-center mx-5 "
                  >
                    <label for="">
                      <b>Select Category</b>
                    </label>

                    <select
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      onChange={(event) => changeCategory(event.target.value)}
                      className="form-control"
                    >
                      <option disabled={true} value="Not set">
                        Select Category
                      </option>
                      <option value="Transmission system">
                        Transmission system
                      </option>
                      <option value="Suspension system">
                        Suspension system
                      </option>
                      <option value="Tyres and brakes">Tyres and brakes</option>
                      <option value="Other accessories">
                        Other accessories
                      </option>
                    </select>
                    {errors.age && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div> */}
                  <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{ padding: "10px 90px", borderRadius: "40px" }}
                      className="btn text-white btn-danger font-weight-bold"
                    >
                      Add Food
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
