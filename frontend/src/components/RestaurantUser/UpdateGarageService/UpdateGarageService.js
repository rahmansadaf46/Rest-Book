import React, { useEffect, useState } from 'react';
import GarageHeader from '../GarageHeader/GarageHeader';
import GarageSidebar from '../GarageSidebar/GarageSidebar';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
// import './PendingRequest.css'
const UpdateGarageService = () => {
    const [garageData, setGarageData] = useState([])
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams();
    // const user = sessionStorage.getItem('email');
    useEffect(() => {
        fetch('http://localhost:4200/serviceDetails/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGarageData(data)
                // setServices(data)
                // setGarage(data);
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
    }, [id])
    const onSubmit = data => {
       
        data.garageId = garageData.garageId;
        console.log(data)
        fetch('http://localhost:4200/updateService/'+ id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(data => {
                window.alert('Service Updated successfully');
                window.location.href="/garage/serviceList"
                // window.location.reload();
            })

            .catch(error => {
                console.error(error)
            })



    }

    return (
        <div>
            <GarageHeader />
            <div className="row">
                <div className="col-md-2">
                    <GarageSidebar />
                </div>

                <div style={{ backgroundColor: '#FFB6C1', height: '100vh' }} className="col-md-10 pt-4">
                    <div className="text-center  text-danger">
                        <h2><u>Update Service</u></h2>
                    </div>
                    <div className="col-md-12">
                        <div><form className="p-3 container col-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Service Name</b></label>
                                <input defaultValue={garageData.title} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="title" placeholder="Service Name" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Service Description</b></label>
                                <textarea defaultValue={garageData.description} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="description" placeholder="Service Description" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group text-danger text-center">
                                <label for=""><b>Enter Service Rate</b></label>
                                <input defaultValue={garageData.rate} style={{ borderRadius: '15px', border: '2px solid #E5194B' }} type="text" ref={register({ required: true })} name="rate" placeholder="Service Rate" className="form-control" />
                                {errors.name && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group row">
                                <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                                    <button type="submit" style={{ padding: '10px 90px', borderRadius: '40px' }} className="btn btn-primary text-white  font-weight-bold">Submit</button>
                                </div>
                            </div>

                        </form></div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UpdateGarageService;