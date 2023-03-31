import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Select from "react-select";
import { useParams } from 'react-router-dom';
// import Iframe from 'react-iframe';
const UpdateGarage = () => {
  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [dept, setDept] = useState([]);
  // document.title = "Enroll A Student";
  const email = sessionStorage.getItem("email");
  const [garage, setGarage] = useState();
  // const [garageLocation, setGarageLocation] = useState('');
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
      fetch('http://localhost:4200/garageProfile/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGarage(data)
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
                setGarage(data)
                console.log(area)
                // setServices(data)
                // setGarage(data);
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
    // fetch('http://localhost:4200/garages')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setGarageLocation(data[0].googleMap)
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

    fetch('http://localhost:4200/updateGarage/'+ id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(data => {
                window.alert('Garage Updated successfully');
                window.location.href="/admin/garageList"
                // window.location.reload();
            })

            .catch(error => {
                console.error(error)
            })
  };

  // useEffect(() => {
  //     setDept(JSON.parse(localStorage.getItem("dept")) || {});
  // }, [])
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #007BFF",
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
          style={{ backgroundColor: "#FFB6C1", height: "150vh" }}
          className="col-md-10 pt-4"
        >
          <div className="text-center  text-danger">
            <h2>
              <u>Update Garage</u>
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
                    <b>Enter Garage Name</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="title"
                    defaultValue={garage?.title}
                    placeholder="Enter Garage Name"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Garage Address</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="address"
                    defaultValue={garage?.address}
                    placeholder="Enter Garage Address"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Garage Contact no.</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    type="text"
                    ref={register({ required: true })}
                    name="mobile"
                    defaultValue={garage?.mobile}
                    placeholder="Enter Garage Contact No."
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Garage Description</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    defaultValue={garage?.description}
                    type="text"
                    ref={register({ required: true })}
                    name="description"
                    placeholder="Enter Garage Description"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Facebook Code</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    defaultValue={garage?.facebook}
                    type="number"
                    ref={register({ required: true })}
                    name="facebook"
                    placeholder="Enter Facebook Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Latitude</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    defaultValue={garage?.coords.split(',')[0]}
                    type="text"
                    ref={register({ required: true })}
                    name="lat"
                    placeholder="Enter Latitude Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group text-danger text-center">
                  <label for="">
                    <b>Enter Longitude</b>
                  </label>
                  <input
                    style={{
                      borderRadius: "15px",
                      border: "2px solid #007BFF",
                    }}
                    defaultValue={garage?.coords.split(',')[1]}
                    type="text"
                    ref={register({ required: true })}
                    name="long"
                    placeholder="Enter Longitude Code"
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">
                  <div className="form-group col-6 text-danger text-center">
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
                  <div className="form-group col-6 text-danger text-center">
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
                      className="btn text-white btn-primary font-weight-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <Iframe url={garageLocation}
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

export default UpdateGarage;
