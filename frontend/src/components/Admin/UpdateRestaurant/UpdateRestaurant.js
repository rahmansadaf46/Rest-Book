import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Select from "react-select";
import { useParams } from 'react-router-dom';
// import Iframe from 'react-iframe';
const UpdateRestaurant = () => {
  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [dept, setDept] = useState([]);
  // document.title = "Enroll A Student";
  const email = sessionStorage.getItem("email");
  const [restaurant, setRestaurant] = useState();
  // const [restaurantLocation, setRestaurantLocation] = useState('');
  const [afterCheckIn, setAfterCheckIn] = useState(true);
  const [beforeCheckIn, setBeforeCheckIn] = useState(false);
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState([]);
  const handleArea = (e) => {
    setArea(e);
  };
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [user, setUser] = useState([]);
  const handleUser = (e) => {
    if (e === null) {
      setUser("");
    } else {
      setUser(e.value);
      setSelectedUser(e);
    }
  };
  // const [file, setFile] = useState(null);
  // const handleFileChange = (e) => {
  //   const newFile = e.target.files[0];
  //   setFile(newFile);
  // };
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
      fetch('http://localhost:4200/restaurantProfile/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRestaurant(data)
                const area = data?.area.map(item=> {return{
                  value: `${item}`,
                  label: `${item?.toUpperCase()}`,
                }})
                setArea(area)
                setUser(data.user)
                setSelectedUser({
                  value: `${data.user}`,
                  label: `${data.user}`,
                })
                // data.area = area;
                setRestaurant(data)
                setAfterCheckIn(data.afterCheckIn)
                setBeforeCheckIn(data.beforeCheckIn)
                console.log(area)
                // setServices(data)
                // setRestaurant(data);
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
    // fetch('http://localhost:4200/restaurants')
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
  }, [email, id]);

  const onSubmit = (data) => {
    // return console.log(data);
    let tempArray = [];
    area.forEach((data) => {
      tempArray.push(data.value);
    });
    data.coords = `${data?.lat}, ${data?.long}`;
    data.area = tempArray;
    data.user = user;
    if(data.openingTime> data.closingTime){
      window.alert("Opening time must be less than closing time")
    }else{
      fetch('http://localhost:4200/UpdateRestaurant/'+ id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
    })
        .then(response => response.json())
        .then(data => {
            window.alert('Restaurant Updated successfully');
            window.location.href="/admin/restaurantList"
            // window.location.reload();
        })

        .catch(error => {
            console.error(error)
        })
    }

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
          style={{ backgroundColor: "#FCF4E0", height: "210vh" }}
          className="col-md-10 pt-4"
        >
          <div className="text-center text-danger">
            <h2>
              <u>Update <span className="text-dark">Restaurant</span></u>
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
                    defaultValue={restaurant?.title}
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
                    defaultValue={restaurant?.address}
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
                    defaultValue={restaurant?.mobile}
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
                    defaultValue={restaurant?.description}
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
                    defaultValue={restaurant?.facebook}
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
                    defaultValue={restaurant?.coords.split(',')[0]}
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
                    defaultValue={restaurant?.coords.split(',')[1]}
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
                      value={area}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Enter Opening Time</b>
                    </label>
                    <input
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="time"
                      defaultValue={restaurant?.openingTime}
                      ref={register({ required: true })}
                      name="openingTime"
                      placeholder="Enter Longitude Code"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Enter Closing Time</b>
                    </label>
                    <input
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="time"
                      ref={register({ required: true })}
                      defaultValue={restaurant?.closingTime}
                      name="closingTime"
                      placeholder="Enter Longitude Code"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Payment Method</b>
                    </label>
                    <br/>
                    <input
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="checkbox"
                      ref={register({ required: false })}
                      onClick={()=>{beforeCheckIn && setAfterCheckIn(!afterCheckIn)}}
                      checked={afterCheckIn}
                      name="afterCheckIn"
                    />
                    <label>&nbsp;After Check In</label>
                    <br/>
                    <input
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="checkbox"
                      ref={register({ required: false })}
                      onClick={()=>{afterCheckIn &&setBeforeCheckIn(!beforeCheckIn)}}
                      checked={beforeCheckIn}
                      name="beforeCheckIn"
                    />
                    <label>&nbsp;Before Check In</label>
                  </div>
                </div>
               {beforeCheckIn &&  <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Minimum Payment Amount</b>
                    </label>
                    <input
                      style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }}
                      type="number"
                      ref={register({ required: true })}
                      name="paymentAmount"
                      defaultValue={restaurant?.paymentAmount}
                      min="0"
                    />
                  </div>
                </div>}
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6  text-center">
                    <label for="">
                      <b>Active Status</b>
                    </label>
                    <select
                     ref={register({ required: true })}
                    style={{
                        borderRadius: "15px",
                        border: "2px solid #E5194B",
                      }} name="status" className="ml-2">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
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
                      value={selectedUser}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{ padding: "10px 90px", borderRadius: "40px" }}
                      className="btn text-white btn-danger font-weight-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <Iframe url={restaurantLocation}
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

export default UpdateRestaurant;
