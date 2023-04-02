import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useParams } from 'react-router-dom';
const UpdateItem = () => {
  const { register, handleSubmit, errors } = useForm();
  // const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [item, setItem] = useState();
  // document.title = "Enroll A Student";
  const [category, setCategory] = useState("Transmission system");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "trustnride46@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
  }, [email]);

  const changeCategory = (data) => {
    setCategory(data);
  };
  // const [file, setFile] = useState(null);
  // const handleFileChange = (e) => {
  //   const newFile = e.target.files[0];
  //   setFile(newFile);
  // };

  useEffect(()=>{
    fetch('http://localhost:4200/item/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItem(data)
                setCategory(data.category)
                // setGarage(data)
                // const area = data?.area.map(item=> {return{
                //   value: `${item}`,
                //   label: `${item?.toUpperCase()}`,
                // }})
                // setArea(area)
                // setUser(data.user)
                // setSelectedUser({
                //   value: `${data.user}`,
                //   label: `${data.user}`,
                // })
                // // data.area = area;
                // setGarage(data)
                // console.log(area)
                // setServices(data)
                // setGarage(data);
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
  },[id])

  const onSubmit = (data) => {

    data.category = category
    fetch('http://localhost:4200/updateItem/'+ id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
  })
      .then(response => response.json())
      .then(data => {
          window.alert('Item Updated successfully');
          window.location.href="/admin/itemList"
          // window.location.reload();
      })

      .catch(error => {
          console.error(error)
      })
  };

  // useEffect(() => {
  //     setDept(JSON.parse(localStorage.getItem("dept")) || {});
  // }, [])
  return (
    <div>
      <AdminHeader />
      <div className="row">
        <div className="col-md-2">
          <AdminSidebar />
        </div>
        <div
          style={{ backgroundColor: "#FFB6C1", height: "100vh" }}
          className="col-md-10 pt-4"
        >
          <div className="text-center  text-danger">
            <h2>
              <u>Update Item</u>
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
                    defaultValue={item?.title}
                    type="text"
                    ref={register({ required: true })}
                    name="title"
                    placeholder="Enter Item Name"
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
                      defaultValue={item?.price}
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
                      defaultValue={item?.description}
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
                  <div className="form-group col-md-12 text-danger d-flex justify-content-center text-center">
                   <div>
                   <label for="">
                      <b>Enter Short Description</b>
                    </label>
                    <textarea
                      style={{
                        height: "70px",
                        borderRadius: "20px",
                        border: "2px solid #E5194B",
                      }}
                      defaultValue={item?.shortDescription}
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
                  </div>

             
                  <div
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
                      value={category}
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
                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
