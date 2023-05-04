import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({ item , activeMenu}) => {
    return (
        <div className="col-md-4 d-flex justify-content-center item mb-3">
            <Link to={activeMenu==='Table'?`/item/table/${item._id}`:`/item/food/${item._id}`} className="card-item">
                <Card style={{ width: '20rem', border: 'none' }}>
                    <div className="px-5 py-3">
                        <Card.Img className='cardImg' variant="top" src={activeMenu==='Table'?`http://localhost:4200/table/${item.image}`:`http://localhost:4200/food/${item.image}`} />
                    </div>
                    <Card.Body>
                        <Card.Title><div style={{ fontSize: '17px' }} className="text-center">
                            <p style={{ color: 'black' }}>{item.title}</p>
                        </div>
                        </Card.Title>
                        <Card.Text>
                            <div className="text-center">
                                {activeMenu==='Table'?<p style={{ color: 'gray' }}>{item.description}</p>:<p style={{ color: 'gray' }}>{item.shortDescription}</p>}
                               
                            </div>

                        </Card.Text>
                        <div className="text-center">
                            <h4 style={{ color: 'black' }}>{item.price}/-</h4>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default MenuItem;