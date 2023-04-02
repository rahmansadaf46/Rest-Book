import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { useState } from "react";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const Location = ({ modalIsOpen, closeModal, submitLocation }) => {
    const {  handleSubmit  } = useForm();
    const [areaList, setAreaList] = useState([]);
    const [area, setArea] = useState([]);
    const handleArea = (e) => {
        setArea(e)
    }
    useEffect(()=>{
        fetch('http://localhost:4200/areas')
        .then(res => res.json())
        .then(data => {

            const area = data.map(item => {
                return {
                    value: `${item.title}`, label: `${item?.title?.toUpperCase()}`
                }
            })
            console.log(area);
            setAreaList(area);
        })
    },[])

    const onSubmit = data => {
        submitLocation(area);
        closeModal();
        // const finalData = {
        //     address: item.finalData.address,
        //     amount: data.amount,
        //     cart: item.finalData.cart,
        //     email: item.finalData.email,
        //     status: item.finalData.status,
        // }
        // console.log(finalData)
        // fetch(`http://localhost:4200/updateAmount/${item._id}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(finalData)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data) {

        //             window.location.reload();
                      
        //         }
        //     })

    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >


            <div className="px-5">
                <h4 className="text-center text-danger"><u>Enter Your Location</u> </h4>


                <br />
                <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row d-flex justify-content-center">
                        <div className="form-group col-12 ">
                            <label className="pt-1 " for=""><b>Location:</b></label>
                            <Select
                                styles={customStyles}
                                required
                                options={areaList}
                                onChange={(e) => {
                                    handleArea(e);
                                }}
                                isSearchable={true}
                                isClearable={true}
                            />
                            {/* <span className="pt-1  ml-3 font-weight-bold">$</span> */}
                        </div>

                    </div>



                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary mt-4 "><b>Submit</b></button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default Location;