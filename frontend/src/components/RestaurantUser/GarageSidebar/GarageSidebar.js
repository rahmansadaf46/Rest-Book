import { faCookieBite, faPlus,faCheckCircle, faBars, faBacon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const GarageSidebar = () => {
    return (
        <div className="sidebar d-flex  justify-content-center  py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
            <li>
                    <Link to="/garage/profile" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBacon} /> Garage Profile</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/garage/pending" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faCookieBite} /> Pending Request</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/garage/delivery" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faCheckCircle} /> Delivery Request</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/garage/addService" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} /> Add Service</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/garage/serviceList" className="">
                        <span style={{  fontWeight: 'bold' }}><FontAwesomeIcon icon={faBars} /> Service List</span>
                    </Link>
                </li>
                <br />
            </ul>

        </div>
    );
};

export default GarageSidebar;