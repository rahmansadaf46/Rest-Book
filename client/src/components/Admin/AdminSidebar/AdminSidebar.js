import { faPlus, faCookieBite, faCheckCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="sidebar d-flex  justify-content-center  py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                {/* <li>
                    <Link to="/admin/pending" className="text-dark">
                        <span style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faCookieBite} /> Pending Order</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/delivery" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faCheckCircle} /> Delivery Order</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/addItem" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Item</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/itemList" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Item List</span>
                    </Link>
                </li>
                <br /> */}
                <li>
                    <Link to="/admin/addArea" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Area</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/areaList" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Area List</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/addRestaurant" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Restaurant</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/admin/restaurantList" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Restaurant List</span>
                    </Link>
                </li>
                <br />
                {/* <li>
                    <Link to="/admin/customer" className="text-dark">
                        <span style={{  fontWeight: 'bold' }}> <FontAwesomeIcon icon={faUserFriends} /> Customers</span>
                    </Link>
                </li> */}

            </ul>

        </div>
    );
};

export default AdminSidebar;