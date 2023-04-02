import React, { useEffect, useState } from 'react';
// import { a } from 'react-router-dom';
// import fakeData from '../../../fakeData';
// import { getDatabaseCart } from '../../../utilities/databaseManager';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const Menu = () => {
    const [item, setItem] = useState([]);
    const [allItem, setAllItem] = useState([]);
    // const [search, setSearch] = useState('');
    // const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4200/items')
            .then(res => res.json())
            .then(data => {
                setItem(data);
                setAllItem(data);
                localStorage.setItem('item', JSON.stringify(data));

            })
        // const items = fakeData.slice(0, 6);
        // setItem(items);
    }, []);
    // console.log(allItem)
    const itemData = localStorage.getItem('item')
    useEffect(() => {
        // const savedCart = getDatabaseCart();
        // console.log(savedCart);
        // const productKeys = Object.keys(savedCart);
        // const previousCart = productKeys.map(existingKey => {
        //     const product = JSON.parse(localStorage.getItem('item')).find(pd => pd._id === existingKey);
        //     // console.log(existingKey, savedCart[existingKey]);
        //     product.quantity = savedCart[existingKey];
        //     // console.log(product);
        //     return product;
        // })
        // setProducts(previousCart);
        // setCart(previousCart);
    }, [allItem, itemData])



    const handleSearch = value => {
        // e.preventDefault();
        // console.log(value);
        if(value==='All'){
            setItem(allItem)
        }
        else{
            const category = allItem.filter(pd => pd.category === value);
            setItem(category);
        }
     
        // setSearch(value);

    }




    return (
        <div className="mt-5">
            <div className="text-center cat">
            <h2 style={{ color: '#85CBD2'}} className="text-center mb-5 mt-5"><u>Available Product</u></h2>
                <nav>
                    <ul>
                    <li class="menu"><a href onClick={() => handleSearch('All')}><b>All Items</b></a></li>
                        <li class="menu"><a href onClick={() => handleSearch('Transmission system')}><b>Transmission system</b></a></li>
                        <li class="menu"><a href onClick={() => handleSearch('Suspension system')}><b>Suspension system</b></a></li>
                        <li class="menu"><a href onClick={() => handleSearch('Tyres and brakes')}><b>Tyres and brakes</b></a></li>
                        <li class="menu"><a href onClick={() => handleSearch('Other accessories')}><b>Other accessories</b></a></li>
                    </ul>
                </nav>
            </div>

            <div className="container mt-5">
                
                <div className="row">
                    {
                        item.map(data => <MenuItem item={data}></MenuItem>)
                    }
                </div>
            </div>

         
        </div>
    );
};

export default Menu;