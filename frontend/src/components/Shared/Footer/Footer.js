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
                        <ul style={{listStyle:'none'}}>
                            <li className="mb-2"><a href="/"className="text-white link-hover">About Online item</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Read our blog</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Sign up for Restaurant</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Add your Restaurant</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 ">
                        <ul style={{listStyle:'none'}}>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Get help</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Read FAQs</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">View all cities</a></li>
                            <li className="mb-2"><a href="/"className="text-white link-hover">Restaurant near me</a></li>
                        </ul>
                    </div>
                </div>
                <div className=" row pb-5 pt-5">
                    <div style={{ marginRight: '190px' }} className="col-md-4 ">
                        <small style={{ color: 'lightGray' }}>Copyright @2023 || Nur Nahar Bithi</small>
                    </div>
                    <div className="col-md-2 text-right">
                        <a href="/"className="text-white link-hover">Privacy Policy.</a>
                    </div>
                    <div className="col-md-2 pl-5">
                        <a href="/"className="text-white link-hover">Terms of Use</a>
                    </div>
                    <div className="col-md-2 pl-5">
                        <a href="/"className="text-white link-hover">Pricing</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;