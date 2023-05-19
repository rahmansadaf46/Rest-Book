import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../../fakeData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Item.css'
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';


const Item = () => {
    const { category, id } = useParams();
    const [item, setItem] = useState({});
    const [restaurant, setRestaurant] = useState({});
    const [count, setCount] = useState(1);
    const itemData = localStorage.getItem('item')
    const [timeSlot, setTimeSlot] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        fetch(`http://localhost:4200/${category}/${id}`)
            .then((res) => res.json())
            .then((response) => {
                setItem(response);
                console.log(response)
                fetch(`http://localhost:4200/restaurantProfile/${response.restaurantId}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setRestaurant(data);
                        function generateTimeSlots(openingTime, closingTime) {
                            const slots = [];

                            // Convert opening and closing times to minutes
                            const openingMinutes = convertToMinutes(openingTime);
                            const closingMinutes = convertToMinutes(closingTime);

                            // Start generating time slots
                            let currentMinutes = openingMinutes;

                            while (currentMinutes < closingMinutes) {
                                const startTime = convertToTime(currentMinutes);
                                let endTime = "";

                                // Calculate end time of the slot
                                if (currentMinutes + 60 <= closingMinutes) {
                                    endTime = convertToTime(currentMinutes + 60);
                                    currentMinutes += 60;
                                } else {
                                    endTime = convertToTime(closingMinutes);
                                    currentMinutes = closingMinutes;
                                }

                                // Format the time slot
                                const timeSlot = `${startTime}-${endTime}`;
                                slots.push(timeSlot);
                            }

                            return slots;
                        }
                        const slot = generateTimeSlots(data.openingTime, data.closingTime)
                        console.log(slot)
                        let allSlot = slot.map(el=> {
                            return {
                                time: el,
                                status: 'Available'
                            }
                        })
                        setTimeSlot(allSlot)
                        // setAllItem(data);
                        // localStorage.setItem('item', JSON.stringify(data));
                    });
                // setAllItem(data);
                // localStorage.setItem('item', JSON.stringify(data));
            });
            const now = new Date();

            // Format the date in YYYY-MM-DD format
            const formattedDate = now.toISOString().split('T')[0];
        
            // Set the current date
            setCurrentDate(formattedDate);
        window.scrollTo(0, 0);

    }, [category, id])
    const [cart, setCart] = useState([]);

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

    const handleAddProduct = (product) => {
        const toBeAddedKey = product._id;
        const sameProduct = cart.find(pd => pd._id === toBeAddedKey);
        let newCount;
        let newCart;
        if (sameProduct) {
            newCount = sameProduct.quantity + count;
            sameProduct.quantity = newCount;
            // debugger;
            const others = cart.filter(pd => pd._id !== toBeAddedKey);
            newCart = [...others, sameProduct]
            addToDatabaseCart(sameProduct._id, newCount);
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
            addToDatabaseCart(product._id, product.quantity);
        }
        setCart(newCart);
        // window.location.reload();

    }

    const incrementCount = () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        setCount(count - 1);
        if (count > 0) {
            setCount(count - 1);
            // props.handleRemoveProduct(props.product);
        }
        if (count <= 1) {
            setCount(1);
        }

    };





    // Helper function to convert time to minutes
    function convertToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Helper function to convert minutes to time
    function convertToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        if (mins === 0) {
            mins = '00'
        }
        // console.log(mins)
        let formattedHours = hours % 12;
        if (formattedHours === 0) {
            formattedHours = 12;
        }

        const meridiem = hours < 12 ? "am" : "pm";

        return `${formattedHours}:${mins}${meridiem}`;
    }

    const dateChange = (e) => {
        console.log(e);
        setCurrentDate(e.target.value);
    }

    // Example usage
    //   const openingTime = "10:15";
    //   const closingTime = "13:10";

    //   const timeSlots = generateTimeSlots(openingTime, closingTime);
    //   console.log(timeSlots);

    return (
        <div>
            <Header cart={cart.length}></Header>
            <div className="container mt-5 py-5">
                <div className='d-flex '>
                    <img style={{ width: '80px', borderRadius: '50px' }} src={`http://localhost:4200/restaurant/${restaurant.image}`} alt="" />
                    <h2 className='ml-4 mt-4 text-danger'>{restaurant.title}</h2>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <p style={{ fontSize: '50px' }} className="mt-4 ">{item.title}</p>
                        <p style={{ fontSize: '15px', lineHeight: '2.1', color: 'gray' }}>{item.description}</p>
                        <div className="row">
                            <p style={{ fontSize: '40px', margin: '0px 30px 0px 20px' }}>{item.price}/-</p>
                            {category === 'food' && <span>
                                <div className="input-group item-area">
                                    <input onClick={() => decrementCount()} type="button" defaultValue="-" className="button-minus" data-field="quantity" />
                                    <input type="number" onChange={(event) => {
                                        setCount(event.target.value)
                                    }} value={count} step={1} max defaultValue={1} name="quantity" className="quantity-field" />
                                    <input onClick={() => incrementCount()} type="button" defaultValue="+" className="button-plus" data-field="quantity" />
                                </div>
                            </span>}

                        </div>
                        <button onClick={() => handleAddProduct(item)} style={{ backgroundColor: '#E5194B', color: 'white', borderRadius: '30px', height: '40px' }} className="btn  px-4 mt-3"><ShoppingCartIcon className="mr-2" /> Add</button>
                        {category === 'food' && <div className="row mt-4">

                            <img width="200px" className="mx-4" src={`http://localhost:4200/food/${item.image}`} alt="" />
                            <img width="200px" className="mx-2" src={`http://localhost:4200/food/${item.image}`} alt="" />
                        </div>}


                    </div>
                    <div className="col-md-7 text-right">
                        <img style={{ width: '550px' }} src={`http://localhost:4200/${category}/${item.image}`} alt="" />
                    </div>


                </div>
                <div style={{display: item.type === 'food' ? 'none':''}} className='text-center mt-5'>
                    <label>Enter Date: &nbsp;</label><input onChange={dateChange} min={new Date().toISOString().split('T')[0]} value={currentDate} type="date" />
                    <div className='text-center mt-4'>
                        <h3>Available Slot</h3>
                        <div className="row">{timeSlot.map(time => <div style={{border:'1px solid gray'}} className="m-3 col-2 p-1"><p>{time.time}</p> <p>{time.status}</p></div>)}</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Item;