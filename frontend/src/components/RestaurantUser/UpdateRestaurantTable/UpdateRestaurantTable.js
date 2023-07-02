import React, { useEffect, useState } from 'react';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from "react-select";
// import './BookingRequest.css'
const UpdateRestaurantTable = () => {
    const [tableData, setTableData] = useState([])
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams();
    // const user = sessionStorage.getItem('email');
    const [layouts, setLayouts] = useState([]);

    const [selectedLayout, setSelectedLayout] = useState('');
    const handleLayout = (e) => {
      if (e === null) {
        setSelectedLayout("");
      } else {
        setSelectedLayout(e);
      }
    };

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
        fetch('http://localhost:4200/table/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSelectedLayout({label:data.layout, value:data.layout});
                setTableData(data)
                // setServices(data)
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
    }, [id])
    const onSubmit = data => {

        data.restaurantId = tableData.restaurantId;
        data.layout = selectedLayout.value;
        console.log(data)
        fetch('http://localhost:4200/updateTable/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(data => {
                window.alert('Table Updated successfully');
                window.location.href = "/restaurant/restaurantTableList"
                // window.location.reload();
            })

            .catch(error => {
                console.error(error)
            })



    }
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

                <div style={{ backgroundColor: '#FCF4E0', height: '100vh' }} className="col-md-10 pt-4">
                    <div className="text-center  text-danger">
                        <h2><u>Update Table</u></h2>
                    </div>
                    <div className="col-md-12">
                        <div><form className="p-3 container col-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Table Name</b></label>
                                <input defaultValue={tableData.title} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="title" placeholder="Table Name" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Table Description</b></label>
                                <textarea defaultValue={tableData.description} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="description" placeholder="Table Description" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div>
                            {/* <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Booking Price</b></label>
                                <input defaultValue={tableData.price} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="price" placeholder="Booking Pice" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div> */}
                            <div className="form-group text-danger text-center mx-5 px-5">
                                <label for="">
                                    <b>Enter Layout</b>
                                </label>
                                <Select
                                    value={selectedLayout}
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
                            <div className="form-group row">
                                <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                                    <button type="submit" style={{ padding: '10px 90px', borderRadius: '40px' }} className="btn btn-danger text-white  font-weight-bold">Update</button>
                                </div>
                            </div>

                        </form></div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UpdateRestaurantTable;