import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Select from "react-select";
// import Iframe from 'react-iframe';
const AddRestaurant = () => {
  const { register, handleSubmit, errors } = useForm();
  // const [loading, setLoading] = useState(false);
  // const [dept, setDept] = useState([]);
  // document.title = "Enroll A Student";
  const email = sessionStorage.getItem("email");
  // const [RestaurantLocation, setRestaurantLocation] = useState('');
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState([]);
  const handleArea = (e) => {
    setArea(e);
  };
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);
  const handleUser = (e) => {
    if (e === null) {
      setUser("");
    } else {
      setUser(e.value);
    }
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };
  useEffect(() => {
    if (email !== "trustnride46@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
    fetch("http://localhost:4200/areas")
      .then((res) => res.json())
      .then((data) => {
        const area = data.map((item) => {
          return {
            value: `${item.title}`,
            label: `${item?.title?.toUpperCase()}`,
          };
        });
        console.log(area);
        setAreaList(area);
      });
    fetch("http://localhost:4200/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const user = data.map((person) => {
          return {
            value: `${person.person.email}`,
            label: `${person.person.email}`,
          };
        });
        setUserList(user);
      });
    // fetch('http://localhost:4200/Restaurants')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setRestaurantLocation(data[0].googleMap)
    //         // const user = data.map(person => {
    //         //     return {
    //         //         value: `${person.person.email}`, label: `${person.person.email}`
    //         //     }
    //         // })
    //         // setUserList(user);
    //     })
  }, [email]);

  const onSubmit = (data) => {
    // return console.log(data);
    let tempArray = [];
    area.forEach((data) => {
      tempArray.push(data.value);
    });
    const coords = `${data?.lat}, ${data?.long}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("area", tempArray);
    formData.append("user", user);
    formData.append("address", data.address);
    formData.append("mobile", data.mobile);
    formData.append("description", data.description);
    formData.append("facebook", data.facebook);
    formData.append("coords", coords);
    formData.append("status", "Active");

    fetch("http://localhost:4200/addRestaurant", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Restaurant added successfully");
        window.location.reload();
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //     setDept(JSON.parse(localStorage.getItem("dept")) || {});
  // }, [])
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #E5194B",
      borderRadius: "20px",
      boxShadow: state.isFocused ? null : null,
    }),
  };
  console.log(area);
  return (
    <div>
      <AdminHeader />
      <div className="row">
        <div className="col-md-2">
          <AdminSidebar />
        </div>
        <div
          style={{ backgroundColor: "#FCF4E0", minHeight: "150vh" }}
          className="col-md-10 pt-4"
        >
          <div className="text-center">
            <h2 className="text-danger">
              <u>Add a <span className="text-dark">Restaurant</span> </u>
            </h2>
          </div>
          <div className="col-md-12">
            <div>
              <form
                className="p-3 container col-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Restaurant Name</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="title"
                    placeholder="Enter Restaurant Name"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Restaurant Address</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="address"
                    placeholder="Enter Restaurant Address"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Restaurant Contact no.</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="mobile"
                    placeholder="Enter Restaurant Contact No."
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Restaurant Description</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="description"
                    placeholder="Enter Restaurant Description"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Facebook Code</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="number"
                    ref={register({ required: true })}
                    name="facebook"
                    placeholder="Enter Facebook Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Latitude</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="lat"
                    placeholder="Enter Latitude Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group  text-center">
                  <label for="">
                    <b>Enter Longitude</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #E5194B",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="long"
                    placeholder="Enter Longitude Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="">This field is required</span>
                  )}
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Enter Areas</b>
                    </label>
                    <Select
                      isMulti
                      styles={customStyles}
                      required
                      options={areaList}
                      onChange={(e) => {
                        handleArea(e);
                      }}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Select User</b>
                    </label>
                    <Select
                      isMult
                      styles={customStyles}
                      required
                      options={userList}
                      onChange={(e) => {
                        handleUser(e);
                      }}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
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
                      className="btn text-white btn-danger font-weight-bold"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <Iframe url={RestaurantLocation}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" /> */}
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
