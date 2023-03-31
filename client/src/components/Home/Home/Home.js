import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';

import About from '../About/About';
import Menu from '../Menu/Menu';
import Search from '../Search/Search';
import { getDatabaseCart } from '../../../utilities/databaseManager';
import GarageList from '../GarageList/GarageList';
import Location from '../Location/Location';
// import fakeData from '../../../fakeData';

const Home = () => {
    const [cart, setCart] = useState([]);
    const [area, setArea] = useState('');
    const [location, setLocation] = useState(false);
    const itemData = localStorage.getItem('item')
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = JSON.parse(localStorage.getItem('item')).find(pd => pd._id === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [itemData])

    const handleLocation = () =>{
        // console.log('Clicked')
        if(sessionStorage.getItem('email')){
            openModal()
        }
        else{
            window.location.href='/login'
        }
        
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    // const [item, setItem] = useState();
    function openModal() {
        // setItem(data)
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    function submitLocation(data) {
        // setIsOpen(false);
        console.log(data)
        if(data.value){
            setLocation(true)
            sessionStorage.setItem('location', data.value)
            window.scroll(0,0)
            window.location.reload();
        }
    }
    useEffect(() => {
        if(sessionStorage.getItem('location')){
            setLocation(true)
            setArea(sessionStorage.getItem('location'))
        }
    },[])
    return (
        <div>
            <Header cart={cart.length}></Header>
            {location? <GarageList area={area} handleLocation={handleLocation}></GarageList> : <Search handleLocation={handleLocation}></Search>}
            
            

            <Menu></Menu>
            <About></About>
            <Footer></Footer>
            <Location modalIsOpen={modalIsOpen} submitLocation={submitLocation}  closeModal={closeModal}></Location>
        </div>
    );
};

export default Home;