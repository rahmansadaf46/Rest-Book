import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../../fakeData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Item.css'
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CountdownTimer from './CountdownTimer';


const Item = () => {
    const { category, id } = useParams();
    // const [selectedSlot, setSelectedSlot] = useState([]);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [restaurant, setRestaurant] = useState({});
    const [count, setCount] = useState(1);
    const itemData = localStorage.getItem('item')
    const [timeSlot, setTimeSlot] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const duration = 2;
    useEffect(() => {

        getItemData(new Date())

        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, id])
    const getItemData = (date) => {
        setLoading(true)
        fetch(`http://localhost:4200/${category}/${id}`)
            .then((res) => res.json())
            .then((response) => {
                setItem(response);
                // console.log(response)
                fetch(`http://localhost:4200/restaurantProfile/${response.restaurantId}`)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data)
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
                        // console.log(slot)
                        let allSlot = slot.map(el => {
                            return {
                                time: el,
                                status: 'Available'
                            }
                        })
                        console.log()
                        const now = new Date(date);

                        // Format the date in YYYY-MM-DD format
                        const formattedDate = now.toISOString().split('T')[0];
                        setCurrentDate(formattedDate);
                        let dataBody = {
                            date: `${formattedDate}`,
                            restaurantId: response.restaurantId,
                            tableId: response._id
                        }

                        fetch("http://localhost:4200/findBooking", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ dataBody }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(allSlot)
                                console.log(data, "success");
                                if (data.length > 0) {
                                    let userTimeSlots = filterAvailableTimeSlots(allSlot, data[0]?.bookingInfo);
                                    console.log(userTimeSlots)
                                    let combineSlots = combineArrays(allSlot, userTimeSlots)
                                    console.log(combineSlots)
                                    setTimeSlot(combineSlots)
                                    setLoading(false)

                                    setBookingData(data)
                                    // console.log(filterAvailableTimeSlots(allSlot, data[0]?.bookingInfo))
                                }
                                else {
                                    setBookingData(data)
                                    setLoading(false)

                                    setTimeSlot(allSlot)
                                }
                            });

                    });
            });
    }
    function combineArrays(array1, array2) {
        // Create a deep copy of array1
        const mergedArray = JSON.parse(JSON.stringify(array1));

        // Iterate over array2 and update the status in mergedArray
        for (let i = 0; i < array2.length; i++) {
            const selectedTime = array2[i];
            const index = mergedArray.findIndex((time) => time.time === selectedTime.time);

            if (index !== -1) {
                mergedArray[index] = selectedTime;
            } else {
                mergedArray.push(selectedTime);
            }
        }

        return mergedArray;
    }

    function calculateRemainingTime(dateString) {
        const selectedDate = new Date(dateString);
        const currentDate = new Date();
        console.log(selectedDate.toLocaleTimeString(), currentDate.toLocaleTimeString())
        let time1 = selectedDate.toLocaleTimeString();
        let time2 = currentDate.toLocaleTimeString();

        const [h1, m1, s1] = time1.split(':').map(Number);
        const [h2, m2, s2] = time2.split(':').map(Number);

        const date1 = new Date();
        date1.setHours(h1, m1, s1, 0);

        const date2 = new Date();
        date2.setHours(h2, m2, s2, 0);

        const differenceInMilliseconds = Math.abs(date1 - date2);
        const differenceInSeconds = differenceInMilliseconds / 1000;
        console.log(differenceInSeconds)
        return differenceInSeconds;
    }
    function filterAvailableTimeSlots(allTimeSlots, selectedTimeSlots) {
        // const dateToCheck = "2023-06-10T17:34:14.357Z";
        // const isWithinRange = calculateRemainingTime(dateToCheck);
        // console.log(isWithinRange);
        console.log(allTimeSlots, selectedTimeSlots)
        const notAvailableSelectedSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && slot.userEmail !== sessionStorage.getItem('email'));
        const notAvailableSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Not Available");
        const selectedExpireSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && calculateRemainingTime(slot.encounterTime) > (duration * 60) && slot.userEmail === sessionStorage.getItem('email'));
        const selectedSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && calculateRemainingTime(slot.encounterTime) < (duration * 60) && slot.userEmail === sessionStorage.getItem('email'));
        const selectedTime = selectedTimeSlots.map((slot) => slot.time);

        console.log(selectedSlotsForUser, selectedTimeSlots, notAvailableSelectedSlotsForUser, notAvailableSlotsForUser, selectedExpireSlotsForUser)
        const availableTimeSlots = allTimeSlots.filter(
            (slot, index) => !selectedTime.includes(slot.time)[index]
        );
        const bookedTime = allTimeSlots.filter(
            (slot) => selectedTime.includes(slot.time)
        );
        console.log({ availableTimeSlots: availableTimeSlots, selectedSlotsForUser: selectedSlotsForUser })
        return selectedSlotsForUser;
    }
    const [cart, setCart] = useState([]);

    console.log(currentDate)
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
        // console.log(e);
        setCurrentDate(e.target.value);
        getItemData(e.target.value)
    }

    // Example usage
    //   const openingTime = "10:15";
    //   const closingTime = "13:10";

    //   const timeSlots = generateTimeSlots(openingTime, closingTime);
    //   console.log(timeSlots);
    const filterBookingData = (data) => {
        const groupedData = {};

        data.forEach((item) => {
          if (groupedData[item.time]) {
            const storedEncounterTime = new Date(groupedData[item.time].encounterTime);
            const currentEncounterTime = new Date(item.encounterTime);
        
            if (currentEncounterTime > storedEncounterTime) {
              groupedData[item.time] = item;
            }
          } else {
            groupedData[item.time] = item;
          }
        });
        
        const filteredData = Object.values(groupedData);
        return filteredData;

    }
    const handleAddBooking = (slot, index) => {
        // console.log(slot, index)
        let existingSlot = [...timeSlot]
        if (existingSlot[index].status === 'Available') {
            existingSlot[index].status = 'Selected'
            existingSlot[index].encounterTime = new Date()
        }
        else {
            existingSlot[index].status = 'Selected'
        }
        // console.log(existingSlot)
        setTimeSlot(existingSlot)
        let data = {
            date: currentDate,
            bookingInfo: [{ time: slot.time, status: slot.status, userEmail: sessionStorage.getItem('email'), encounterTime: new Date(), encounterDate: currentDate }],
            restaurantId: item.restaurantId,

            tableId: id
        }
        // console.log(data);
        if (bookingData.length > 0) {

            console.log(filterBookingData([...bookingData[0].bookingInfo, { time: slot.time, status: slot.status, userEmail: sessionStorage.getItem('email'), encounterTime: new Date(), encounterDate: currentDate }]), )

            // console.log(filteredData);
            let updateData = {
                date: currentDate,
                bookingInfo: filterBookingData([...bookingData[0].bookingInfo, { time: slot.time, status: slot.status, userEmail: sessionStorage.getItem('email'), encounterTime: new Date(), encounterDate: currentDate }]),
                restaurantId: item.restaurantId,

                tableId: id
            }
            console.log(updateData)
            fetch(`http://localhost:4200/updateBooking/${bookingData[0]._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updateData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // window.alert("Booking added successfully");
                    //   window.location.reload();
                    let dataBody = {
                        date: `${currentDate}`,
                        restaurantId: item.restaurantId,
                        tableId: id
                    }

                    fetch("http://localhost:4200/findBooking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ dataBody }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            // console.log(allSlot)
                            console.log(data, "success");
                            if (data.length > 0) {
                                setBookingData(data)
                            }
                        });
                })

                .catch((error) => {
                    console.error(error);
                });
        } else {
            fetch("http://localhost:4200/addBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // window.alert("Booking added successfully");
                    //   window.location.reload();
                    let dataBody = {
                        date: `${currentDate}`,
                        restaurantId: item.restaurantId,
                        tableId: id
                    }

                    fetch("http://localhost:4200/findBooking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ dataBody }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            // console.log(allSlot)
                            console.log(data, "success");

                            if (data.length > 0) {
                                setBookingData(data)
                            }
                        });
                })

                .catch((error) => {
                    console.error(error);
                });
        }

    }

    const handleAvailableSlot = (index) => {
        // console.log(slot, index)
        let existingSlot = [...timeSlot]
        existingSlot[index].status = 'Available'
        // console.log(existingSlot)
        setTimeSlot(existingSlot)
    }
    return (
        <div>
            <Header cart={cart.length}></Header>
            <div className="container mt-5 py-5">
                <Link to={`/restaurant/${item.restaurantId}`} className='d-flex res-title'>
                    <img className='res-img' style={{}} src={`http://localhost:4200/restaurant/${restaurant.image}`} alt="" />
                    <h2 className='ml-4 mt-4 res-name '>{restaurant.title}</h2>
                </Link>

                <div className="row  pt-2 mt-5">
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
                        {category === 'food' && <button onClick={() => handleAddProduct(item)} style={{ backgroundColor: '#E5194B', color: 'white', borderRadius: '30px', height: '40px' }} className="btn  px-4 mt-3"><ShoppingCartIcon className="mr-2" /> Add</button>}

                        {category === 'food' && <div className="row mt-4">

                            <img width="200px" className="mx-4" src={`http://localhost:4200/food/${item.image}`} alt="" />
                            <img width="200px" className="mx-2" src={`http://localhost:4200/food/${item.image}`} alt="" />
                        </div>}


                    </div>
                    <div className="col-md-7 text-right">
                        <img style={{ width: '550px' }} src={`http://localhost:4200/${category}/${item.image}`} alt="" />
                    </div>


                </div>
                <div style={{ display: category === 'food' ? 'none' : '' }} className='text-center mt-5'>
                    <label>Enter Date: &nbsp;</label><input onChange={dateChange} min={new Date().toISOString().split('T')[0]} value={currentDate} type="date" />
                    <div className="d-flex justify-content-center">
                        <div className='d-flex mx-2'><div style={{ borderRadius: '50%' }} className="p-2 mx-1 mb-3 mt-1 bg-success"></div>&nbsp;<label>Available</label></div>
                        <div className='d-flex mx-2'><div style={{ borderRadius: '50%' }} className="p-2 mx-1  mb-3 mt-1 bg-dark"></div>&nbsp;<label>Not Available</label></div>
                        <div className='d-flex mx-2'><div style={{ borderRadius: '50%' }} className="p-2 mx-1 mb-3 mt-1 bg-warning"></div>&nbsp;<label>Selected</label></div>
                    </div>
                    <div className='text-center mt-4'>
                        <h3 style={{ color: '#E5194B' }}>Available Slot</h3>
                        {loading === false ? <div className="row">{timeSlot.map((time, index) => <div onClick={() => handleAddBooking(time, index)} style={{ cursor: 'pointer' }} className={`card m-3 col-2 p-1 ${time.status === 'Available' ? 'bg-success  text-white' : time.status === 'Selected' ? 'bg-warning text-dark' : 'bg-danger text-white'}`}><p>{time.time}</p> <p>{time.status === 'Available' ? time.status : (
                            <span>
                                You have selected this slot for{' '}
                                {time.status === 'Selected' ? (
                                    <CountdownTimer duration={duration} handleAvailableSlot={handleAvailableSlot} index={index} startCountdown={time.status === 'Selected'} time={time.encounterTime} />
                                ) : (
                                    <span>Loading...</span>
                                )}{' '}
                                minutes.
                            </span>
                        )}</p></div>)}</div> : <div className="my-5 py-5"><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="" /></div>}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Item;