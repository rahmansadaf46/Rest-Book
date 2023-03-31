import { faPlus, faCookieBite, faCheckCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="sidebar d-flex  justify-content-center  py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                <li>
                    <Link to="/admin/pending" className="">
                        <span style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faCookieBite} /> Pending Order</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/delivery" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faCheckCircle} /> Delivery Order</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/addItem" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Item</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/itemList" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Item List</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/addArea" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Area</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/areaList" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Area List</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/addGarage" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Garage</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/garageList" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Garage List</span>
                    </Link>
                </li>
                <br />
                {/* <li>
                    <Link to="/admin/customer" className="">
                        <span style={{  fontWeight: 'bold' }}> <FontAwesomeIcon icon={faUserFriends} /> Customers</span>
                    </Link>
                </li> */}

            </ul>

        </div>
    );
};

export default AdminSidebar;