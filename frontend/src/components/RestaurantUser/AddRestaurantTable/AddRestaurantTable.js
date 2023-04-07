import React, { useEffect, useState } from "react";
import RestaurantHeader from "../RestaurantHeader/RestaurantHeader";
import RestaurantSidebar from "../RestaurantSidebar/RestaurantSidebar";
import { useForm } from "react-hook-form";
import Select from "react-select";
// import { useParams } from "react-router-dom";
// import './BookingRequest.css'
const AddRestaurantTable = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const user = sessionStorage.getItem("email");
  const [file, setFile] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState('');
  const handleLayout = (e) => {
    if (e === null) {
      setSelectedLayout("");
    } else {
      setSelectedLayout(e.value);
    }
  };
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };
  console.log(user, "user");
  const [layouts, setLayouts] = useState([]);



  useEffect(() => {
    window.scroll(0, 0)
    fetch(`http://localhost:4200/layouts/${JSON.parse(sessionStorage.getItem('restaurantUser'))[0]._id}`)
      .then(res => res.json())
      .then(data => {
        const layouts = data.map((layout) => {
          return {
            value: `${layout.layout}`,
            label: `${layout.layout}`,
          };
        });
        setLayouts(layouts);
      })
  }, [])
  useEffect(() => {
    if (user) {
      fetch("http://localhost:4200/restaurantUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          setRestaurantData(data[0]);
        });
    }

  }, [user]);

  const onSubmit = (data) => {
    data.restaurantId = restaurantData._id;
    data.layout = selectedLayout;
    data.file = file;
    console.log(data);
    // fetch("http://localhost:4200/addService", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ data }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     window.alert("Service added successfully");
    //     window.location.reload();
    //   })

    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #E5194B",
      borderRadius: "20px",
      boxShadow: state.isFocused ? null : null,
    }),
  };
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
              <u>Add <span className="text-dark">Table</span></u>
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
                    <b>Enter Table Name</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="title"
                    placeholder="Service Name"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Table Description</b>
                  </label>
                  <textarea
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="description"
                    placeholder="Service Description"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Table Booking Price</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="rate"
                    placeholder="Service Rate"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center mx-5 px-5">
                  <label for="">
                    <b>Enter Layout</b>
                  </label>
                  <Select
                    
                    styles={customStyles}
                    required
                    options={layouts}
                    onChange={(e) => {
                      handleLayout(e);
                    }}
                    isSearchable={true}
                    isClearable={true}
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
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
                      <span className="">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{ padding: "10px 90px", borderRadius: "40px" }}
                      className="btn btn-danger text-white  font-weight-bold"
                    >
                      Submit
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

export default AddRestaurantTable;
