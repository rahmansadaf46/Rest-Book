import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../../fakeData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Item.css'
import { addToDatabaseCart,  getDatabaseCart, updateToDatabaseCart } from '../../../utilities/databaseManager';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CountdownTimer from './CountdownTimer';


const Item = () => {
    const { category, id } = useParams();
    // const [localStoreData, setLocalStoreData] = useState([]);
    const [offDays, setOffDays] = useState([]);
    const [isOffDay, setIsOffDay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [restaurant, setRestaurant] = useState({});
    const [count, setCount] = useState(1);
    // const itemData = localStorage.getItem('item')
    const [timeSlot, setTimeSlot] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const duration = 10;
    useEffect(() => {

        getItemData(new Date())

        // setLocalStoreData(JSON.parse(localStorage.getItem('bookingData')))
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, id])
    useEffect(() => {
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        // const productKeys = Object.keys(savedCart);
        // const previousCart = productKeys.map(existingKey => {
        //     const product = JSON.parse(localStorage.getItem('item')).find(pd => pd._id === existingKey);
        //     product.quantity = savedCart[existingKey];
        //     return product;
        // })
        setCart(savedCart);
    }, [])
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
                        console.log(data.offDay)
                        setOffDays(data.offDay)
                        const options = { weekday: "short" };
                        const dateData = new Date(date);
                        const weekday = dateData.toLocaleDateString(undefined, options);
                        // const weekday = date.toLocaleDateString(undefined, options);
                        let filterOffDay = data?.offDay?.filter(el => el === weekday)
                        console.log(weekday, filterOffDay);
                        if (filterOffDay.length > 0) {
                            setIsOffDay(true)
                        } else {
                            setIsOffDay(false)
                        }
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
                        // console.log()
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
                                // console.log(allSlot)
                                // console.log(data, "success");
                                if (data.length > 0) {
                                    let userTimeSlots = filterAvailableTimeSlots(allSlot, data[0]?.bookingInfo);
                                    // console.log(userTimeSlots)
                                    let combineSlots = combineArrays(combineArrays(allSlot, userTimeSlots.selectedSlotsForUser), userTimeSlots.notAvailableSlotsForUser)
                                    // console.log(combineSlots)
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
        // console.log(selectedDate.toLocaleTimeString(), currentDate.toLocaleTimeString())
        let time1 = selectedDate.toLocaleTimeString();
        let time2 = currentDate.toLocaleTimeString();
        const convertToStandardFormat = (time) => {
            const [hours, minutes, seconds] = time.split(":").map((num) => parseInt(num, 10));

            const formattedHours = hours.toString().padStart(2, "0");
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const formattedSeconds = seconds.toString().padStart(2, "0");

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        };

        time1 = convertToStandardFormat(time1);
        time2 = convertToStandardFormat(time2);
        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!timeFormat.test(time1) || !timeFormat.test(time2)) {
            console.error("Invalid time format. Please use the HH:MM:SS format.");
        } else {
            const [h1, m1, s1] = time1.split(':').map(Number);
            const [h2, m2, s2] = time2.split(':').map(Number);

            const now = new Date(); // Get the current date and time

            const date1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h1, m1, s1);
            const date2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h2, m2, s2);

            const differenceInMilliseconds = Math.abs(date1 - date2);
            // console.log("Difference in milliseconds:", differenceInMilliseconds);
            const differenceInSeconds = differenceInMilliseconds / 1000;
            return differenceInSeconds;
        }

        // const [h1, m1, s1] = time1.split(':').map(Number);
        // const [h2, m2, s2] = time2.split(':').map(Number);

        // const now = new Date(); // Get the current date and time

        // const date1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h1, m1, s1);
        // const date2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h2, m2, s2);

        // const differenceInMilliseconds = Math.abs(date1 - date2);
        // console.log(date1, date2)

        // console.log(differenceInSeconds)

    }

    function filterAvailableTimeSlots(allTimeSlots, selectedTimeSlots) {
        // const dateToCheck = "2023-06-10T17:34:14.357Z";
        // const isWithinRange = calculateRemainingTime(dateToCheck);
        // console.log(isWithinRange);
        // console.log(allTimeSlots, selectedTimeSlots)
        const notAvailableSelectedSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && slot.userEmail !== sessionStorage.getItem('email') && calculateRemainingTime(slot.encounterTime) < (duration * 60));
        const notAvailableSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Not Available");
        // const selectedExpireSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && calculateRemainingTime(slot.encounterTime) > (duration * 60) && slot.userEmail === sessionStorage.getItem('email'));
        const selectedSlotsForUser = selectedTimeSlots.filter((slot) => slot.status === "Selected" && calculateRemainingTime(slot.encounterTime) < (duration * 60) && slot.userEmail === sessionStorage.getItem('email'));
        // const selectedTime = selectedTimeSlots.map((slot) => slot.time);

        // console.log(selectedSlotsForUser, selectedTimeSlots, notAvailableSelectedSlotsForUser, notAvailableSlotsForUser, selectedExpireSlotsForUser)
        // const availableTimeSlots = allTimeSlots.filter(
        //     (slot, index) => !selectedTime.includes(slot.time)[index]
        // );
        // const bookedTime = allTimeSlots.filter(
        //     (slot) => selectedTime.includes(slot.time)
        // );

        let mergeNotAvailable = [...notAvailableSelectedSlotsForUser, ...notAvailableSlotsForUser].map(data => {
            return {
                time: data.time, status: 'Not Available'
            }
        })

        // console.log({ notAvailableSelectedSlotsForUser: notAvailableSelectedSlotsForUser, notAvailableSlotsForUser: notAvailableSlotsForUser })
        return { selectedSlotsForUser: selectedSlotsForUser, notAvailableSlotsForUser: mergeNotAvailable };
    }
    const [cart, setCart] = useState([]);

    // console.log(currentDate)
    const handleAddProduct = (product) => {
        console.log(cart)
        if (Object.keys(cart).length === 0) {
            window.alert('Please add table first')
        } else {
            if (cart?.restaurantData?._id !== restaurant?._id) {
                window.alert('You have already booked another restaurant food. Please clear your previous data first.')
            }
            else {
                let cartDate = cart.date;
                let tableData = cart.tableData;
                const toBeAddedKey = product._id;
                const sameProduct = cart?.foodData?.find(pd => pd._id === toBeAddedKey);
                let newCount;
                if (sameProduct) {
                    newCount = sameProduct.count + count;
                    sameProduct.quantity = newCount;
                    updateToDatabaseCart(sameProduct._id, newCount, item, restaurant, tableData, cartDate);
                }
                else {
                    product.quantity = count;
                    addToDatabaseCart(product._id, product.quantity, item, restaurant, tableData, cartDate);
                }
                const savedCart = getDatabaseCart();
                setCart(savedCart);
            }

        }

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

        const options = { weekday: "short" };
        const date = new Date(e.target.value);
        console.log(date);
        const weekday = date.toLocaleDateString(undefined, options);
        // const weekday = date.toLocaleDateString(undefined, options);
        let filterOffDay = offDays.filter(el => el === weekday)
        console.log(weekday, filterOffDay);
        if (filterOffDay.length > 0) {
            setIsOffDay(true)
            setCurrentDate(e.target.value);
        } else {
            setIsOffDay(false)
            setCurrentDate(e.target.value);
            getItemData(e.target.value)
        }

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

    const handleBooking = (slot, index) => {
        console.log(slot.status)
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

                if (data.length > 0) {
                    let userTimeSlots = filterAvailableTimeSlots(timeSlot, data[0]?.bookingInfo);

                    let notAvailableSlot = userTimeSlots.notAvailableSlotsForUser;
                    let filterSlot = notAvailableSlot.filter(data => data.time === slot.time)
                    if (filterSlot.length > 0) {
                        window.alert('This slot is not available right now')
                        getItemData(currentDate)
                    } else {
                        if (Object.keys(cart).length === 0) {
                            callBooking(slot, index)
                        } else {

                            if (cart.date === currentDate) {
                                callBooking(slot, index)
                            }
                            else {
                                window.alert('You can not add more than one date')
                                console.log(cart.date, currentDate)
                            }
                        }


                    }
                }
                else {
                    if (Object.keys(cart).length === 0) {
                        callBooking(slot, index)
                    } else {
                        if (cart.date === currentDate) {
                            callBooking(slot, index)
                        }
                        else {
                            window.alert('You can not add more than one date')
                            console.log(cart.date, currentDate)
                        }
                    }
                }
            });
    }
    function filterBySimilarTime(array1, array2) {
        // Extracting time values from array2 into a new array
        const array2Times = array2.map(item => item.time);

        // Filtering array1 based on similar time values
        const filteredArray = array1.filter(item => !array2Times.includes(item.time));

        return filteredArray;
    }
    const handleAddBooking = (slot, index) => {
        console.log(cart?.restaurantData?._id !== restaurant?._id)
        if (Object.keys(cart).length === 0) {
            handleBooking(slot, index)
        } else {
            if (cart?.restaurantData?._id !== restaurant?._id) {
                if (window.confirm("You have already booked another restaurant. Want to remove previous booking?")) {
                    window.localStorage.clear();
                    cart.tableData.forEach(table => {
                        let dataBody = {
                            date: `${cart.date}`,
                            restaurantId: table.restaurantId,
                            tableId: table._id
                        }
                        fetch("http://localhost:4200/findBooking", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ dataBody }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                let result = filterBySimilarTime(data[0].bookingInfo, table.slot);
                                let updateData = {
                                    date: `${cart.date}`,
                                    bookingInfo: result,
                                    restaurantId: table.restaurantId,

                                    tableId: table._id
                                }
                                fetch(`http://localhost:4200/updateBooking/${data[0]._id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ updateData }),
                                })
                                    .then((response) => response.json())
                                    .then((res) => {
                                        if (res) {
                                            // window.location.reload()
                                            // const savedCart = getDatabaseCart();
                                            // setCart(savedCart);
                                        }
                                    })
                            })
                    })
                    handleBooking(slot, index)
                    window.location.reload()
                    // 
                }
            } else {
                handleBooking(slot, index)
            }
        }





    }

    const handleTableLocalStorage = (data) => {
        if (Object.keys(cart).length === 0) {
            let slot = data.bookingInfo;
            item.slot = slot;
            let localData = {
                restaurantData: restaurant,
                foodData: cart?.foodData || [],
                date: data.date,
                tableData: [
                    {
                        ...item,
                    }
                ]
            }
            window.localStorage.setItem("bookData", JSON.stringify(localData));
            const savedCart = getDatabaseCart();
            setCart(savedCart);
        } else {
            console.log(cart.date, data.date)
            if (data.date !== cart.date) {
                window.alert('You have selected another date')
            } else {
                let findTable = cart.tableData.filter(pd => pd._id === item._id)
                console.log(findTable)
                if (findTable.length > 0) {
                    let findAnotherTable = cart.tableData.filter(pd => pd._id !== item._id)
                    let slot = data.bookingInfo;
                    item.slot = slot;
                    let localData = {

                        restaurantData: restaurant,
                        foodData: cart?.foodData || [],
                        date: data.date,
                        tableData: [...findAnotherTable,
                        {
                            ...item,
                        }
                        ]
                    }
                    console.log(localData);
                    window.localStorage.setItem("bookData", JSON.stringify(localData));
                } else {
                    let slot = data.bookingInfo;
                    item.slot = slot;
                    let localData = {

                        restaurantData: restaurant,
                        foodData: cart?.foodData || [],
                        date: data.date,
                        tableData: [...cart.tableData,
                        {
                            ...item,
                        }
                        ]
                    }
                    console.log(localData);
                    window.localStorage.setItem("bookData", JSON.stringify(localData));
                }
            }


        }

    }
    const callBooking = (slot, index) => {
        if (slot.status === 'Available') {
            let existingSlot = [...timeSlot]
            if (existingSlot[index].status === 'Available') {
                existingSlot[index].status = 'Selected'
                existingSlot[index].encounterTime = new Date()
            }
            else {
                existingSlot[index].status = 'Selected'
            }
            setTimeSlot(existingSlot)
            let data = {
                date: currentDate,
                bookingInfo: [{ time: slot.time, status: slot.status, userEmail: sessionStorage.getItem('email'), encounterTime: new Date(), encounterDate: currentDate }],
                restaurantId: item.restaurantId,

                tableId: id
            }
            if (bookingData.length > 0) {
                let updateData = {
                    date: currentDate,
                    bookingInfo: filterBookingData([...bookingData[0].bookingInfo, { time: slot.time, status: slot.status, userEmail: sessionStorage.getItem('email'), encounterTime: new Date(), encounterDate: currentDate }]),
                    restaurantId: item.restaurantId,

                    tableId: id
                }
                fetch(`http://localhost:4200/updateBooking/${bookingData[0]._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ updateData }),
                })
                    .then((response) => response.json())
                    .then((res) => {
                        handleTableLocalStorage(updateData)
                        if (res) {
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
                                    if (data.length > 0) {
                                        setBookingData(data)
                                    }
                                });
                        }

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
                    .then((res) => {
                        handleTableLocalStorage(data)
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
                                // console.log(data, "success");

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
                    <div className={`col-md-5 ${category === 'table' && 'mt-5 pt-2'} `}>
                        <p style={{ fontSize: '50px' }} className="mt-4 ">{item.title}</p>
                        <p style={{ fontSize: '15px', lineHeight: '2.1', color: 'gray' }}>{item.description}</p>
                        <div className="row">
                            {category === 'food' && <p style={{ fontSize: '40px', margin: '0px 30px 0px 20px' }}>{item.price}/-</p>}
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

                        {loading === false ? <>{isOffDay ? <h2 className='my-5 py-5 text-danger'>Restaurant is closed this day</h2> : <> <h3 style={{ color: '#E5194B' }}>Available Slot</h3><div className="row">{timeSlot.map((time, index) => <div onClick={() => handleAddBooking(time, index)} style={{ cursor: 'pointer' }} className={`card m-3 col-2 p-1 ${time.status === 'Available' ? 'bg-success  text-white' : time.status === 'Selected' ? 'bg-warning text-dark' : 'bg-dark text-white'}`}><p>{time.time}</p> <p>{time.status === 'Available' ? time.status : time.status === 'Not Available' ? time.status : (
                            <span>
                                You have selected this slot for{' '}
                                {time.status === 'Selected' ? (
                                    <CountdownTimer duration={duration} handleAvailableSlot={handleAvailableSlot} index={index} startCountdown={time.status === 'Selected'} time={time.encounterTime} />
                                ) : (
                                    <span>Loading...</span>
                                )}{' '}
                                minutes.
                            </span>
                        )}</p></div>)}</div></>}</> : <div className="my-5 py-5"><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="" /></div>}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Item;