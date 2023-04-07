import React from 'react';
// import { a } from 'react-router-dom';
import logo2 from '../../../fakeData/images/logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container">
                <div style={{ paddingTop: '70px' }} className="row ">
                    <div className="col-md-6"> <img style={{ width: '200px' }} src={logo2} alt="" /></div>
                    <div className=" col-md-3">
                        <ul>
                            <li className="mb-2"><a href="/"className="text-white ">About Online item</a></li>
                            <li className="mb-2"><a href="/"className="text-white">Read our blog</a></li>
                            <li className="mb-2"><a href="/"className="text-white">Sign up for Restaurant</a></li>
                            <li className="mb-2"><a href="/"className="text-white">Add your Restaurant</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 ">
                        <ul >
                            <li className="mb-2"><a href="/"className="text-white">Get help</a></li>
                            <li className="mb-2"><a href="/"className="text-white">Read FAQs</a></li>
                            <li className="mb-2"><a href="/"className="text-white">View all cities</a></li>
                            <li className="mb-2"><a href="/"className="text-white">Restaurant near me</a></li>
                        </ul>
                    </div>
                </div>
                <div className=" row pb-5 pt-5">
                    <div style={{ marginRight: '190px' }} className="col-md-4 ">
                        <small style={{ color: 'lightGray' }}>Copyright @2023 || Nur Nahar Bithi</small>
                    </div>
                    <div className="col-md-2 text-right">
                        <a href="/"className="text-white">Privacy Policy.</a>
                    </div>
                    <div className="col-md-2 pl-5">
                        <a href="/"className="text-white">Terms of Use</a>
                    </div>
                    <div className="col-md-2 pl-5">
                        <a href="/"className="text-white">Pricing</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;