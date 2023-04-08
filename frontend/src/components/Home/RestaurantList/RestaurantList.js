import React, { useEffect, useState } from 'react';
import RestaurantProfile from '../RestaurantProfile/RestaurantProfile';
// import { Link } from 'react-router-dom';
// import fakeData from '../../../fakeData';
// import { getDatabaseCart } from '../../../utilities/databaseManager';
// import MenuItem from '../MenuItem/MenuItem';
// import './Menu.css';

const RestaurantList = ({handleLocation,area}) => {
    const [restaurant, setRestaurant] = useState([]);
    // const [allItem, setAllItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    // const [cart, setCart] = useState([]);
    useEffect(() => {
        setLoading(true)
        setRestaurant([])
        setNoData(false)
        fetch('http://localhost:4200/restaurants')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                let filterData = data.filter(restaurant=>  {return restaurant.area.some(data=> data === area)});
                console.log(filterData) 
                setRestaurant(filterData);
                if(filterData.length > 0){
                    setNoData(false)
                }else{
                    setNoData(true)
                }
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));

            })
        // const items = fakeData.slice(0, 6);
        // setItem(items);
    }, [area]);
    // console.log(allItem)
    // const itemData = localStorage.getItem('item')
    // useEffect(() => {
    //     const savedCart = getDatabaseCart();
    //     // console.log(savedCart);
    //     const productKeys = Object.keys(savedCart);
    //     const previousCart = productKeys.map(existingKey => {
    //         const product = JSON.parse(localStorage.getItem('item')).find(pd => pd._id === existingKey);
    //         // console.log(existingKey, savedCart[existingKey]);
    //         product.quantity = savedCart[existingKey];
    //         // console.log(product);
    //         return product;
    //     })
    //     // setProducts(previousCart);
    //     setCart(previousCart);
    // }, [allItem, itemData])



    // const handleSearch = value => {
    //     // console.log(value);
    //     const category = allItem.filter(pd => pd.category === value);
    //     setItem(category);
    //     // setSearch(value);

    // }




    return (
        <div style={{ borderBottom: '3px solid #E5194B', backgroundColor: '#FEC5E4', marginTop: '0px',minHeight:'690px' }} className="">
            {/* <div className="text-center cat">
                <nav>
                    <ul>
                        <li class="menu"><Link onClick={() => handleSearch('breakfast')}><b>Breakfast</b></Link></li>
                        <li class="menu"><Link onClick={() => handleSearch('lunch')}><b>Lunch</b></Link></li>
                        <li class="menu"><Link onClick={() => handleSearch('dinner')}><b>Dinner</b></Link></li>
                    </ul>
                </nav>
            </div> */}
            <div className="container mt-5 mb-5 ">
                
                <h4 className='text-center mb-3 pt-5  text-danger'>Selected Location: <span className='text-uppercase text-dark'>{sessionStorage.getItem('location')}</span> 
                </h4>
                <div className='text-center'>
                <button onClick={()=> handleLocation()} class="btn btn-danger mb-3 font-weight-bold" type="submit">Update Location</button>
                </div>
                <h2 style={{ color: '#E5194B' }} className="text-center mb-4  "><u><b>Available <span className='text-dark'>Restaurant</span></b></u></h2>
                {loading && <h2 className='text-center'>Loading...</h2>}
                {noData && <h2 className='text-center text-danger mt-5'>No <span className='text-dark'>Restaurant</span> Found</h2>}
                <div className="row">
                    {
                        restaurant.map(data => <div className="col-md-4"><RestaurantProfile restaurant={data}></RestaurantProfile></div>)
                    }
                </div>
            </div>


        </div>
    );
};

export default RestaurantList;