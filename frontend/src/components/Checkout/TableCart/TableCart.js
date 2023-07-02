import React, { useState } from 'react';
// import fakeData from '../../../fakeData';
// import { getDatabaseCart } from '../../../utilities/databaseManager';


const TableCart = (props) => {
    const item = props.item;
    // const [count, setCount] = useState(item.quantity);


    // const incrementCount = () => {
    //     setCount(count + 1);
    //     props.handleAddProduct(props.item);
    // };

    // const decrementCount = () => {
    //     if (count > 0) {
    //         setCount(count - 1);
    //         props.handleRemoveProduct(props.item);

    //     }
    // };
    return (
        <div key={item.id} style={{ background: '#E8E8E8', border: '1px solid white', borderRadius: '30px', marginTop: '10px' }}>
            <div className="row p-2">
                <div className="col-md-4">
                    <img width="85px"  style={{borderRadius:'20%'}} src={`http://localhost:4200/table/${item.image}`} alt="" />
                </div>
                <div className="col-md-6">
                    <p style={{ fontSize: '13px', position:'relative', right:'15px' }}><b>{item.title}</b></p>
                    <div style={{marginTop:'-15px'}} className='row'>
                    {item.slot.map(slot => <div className='mr-1' style={{fontSize:'10px',background:'white'}}>{slot.time}</div>)} 
                    </div>
             
                    {/* <p style={{ marginTop: '-15px', color: '#E5194B', marginBottom: '-1px' }}>Quantity:- <b>{props.item.count}</b></p> */}
                    {/* <small style={{ marginTop: '-88px', fontSize: '10px', lineHeight: '80%' }}>Delivery Free</small> */}
                </div>
           

            </div>
        </div >
    );
};

export default TableCart;