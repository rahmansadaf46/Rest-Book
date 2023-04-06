import { faCookieBite, faPlus,faCheckCircle, faBars, faBacon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantSidebar = () => {
    return (
        <div className="sidebar d-flex  justify-content-center  py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
            <li>
                    <Link to="/restaurant/profile" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faBacon} /> Restaurant Profile</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/pending" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faCookieBite} /> Booking Request</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/delivery" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faCheckCircle} /> Booking Done</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/addTable" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faPlus} /> Add Table</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/restaurantTableList" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faBars} /> Table List</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/addFood" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faPlus} /> Add Food</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/foodList" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faBars} /> Food List</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/addLayout" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faPlus} /> Add Layout</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/restaurant/layoutList" className="">
                        <span style={{  fontWeight: 'bold' }} className='text-dark'><FontAwesomeIcon icon={faBars} /> Layout List</span>
                    </Link>
                </li>
                <br />
            </ul>

        </div>
    );
};

export default RestaurantSidebar;