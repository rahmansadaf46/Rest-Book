import React, { useEffect, useState } from 'react';
// import { a } from 'react-router-dom';
// import fakeData from '../../../fakeData';
// import { getDatabaseCart } from '../../../utilities/databaseManager';
import MenuItem from '../../Home/MenuItem/MenuItem';
import Select from "react-select";
import './Menu.css';

const Menu = ({ restaurant }) => {
    const [activeMenu, setActiveMenu] = useState('Table')
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [layoutList, setLayoutList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [item, setItem] = useState([]);
    const [allItem] = useState([]);
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '180px',
            border: "2px solid #E5194B",
            borderRadius: "20px",
            boxShadow: state.isFocused ? null : null,
        }),
    };
    // const [search, setSearch] = useState('');
    // const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4200/tables/${restaurant._id}`)
            .then(res => res.json())
            .then(data => {
                setItem(data);
                console.log(data)
                setRestaurantList(data)
                setLoading(false)
            })
        fetch(`http://localhost:4200/layouts/${restaurant._id}`)
            .then(res => res.json())
            .then(data => {
                // setItem(data);
                const layouts = data.map((item) => {
                    return {
                        value: `${item.layout}`,
                        label: `${item?.layout?.toUpperCase()}`,
                    };
                });
                setLayoutList(layouts)
                console.log(data)

            })
        // fetch('http://localhost:4200/items')
        //     .then(res => res.json())
        //     .then(data => {
        //         setItem(data);
        //         setAllItem(data);
        //         localStorage.setItem('item', JSON.stringify(data));

        //     })
        // const items = fakeData.slice(0, 6);
        // setItem(items);
    }, [restaurant]);
    // console.log(allItem)
    // const itemData = localStorage.getItem('item')
   const handleLayout = (e) => {

    if(e){
        console.log(e.value)
        const filterRestaurant = restaurantList.filter(el=> el.layout === e.value)
        setItem(filterRestaurant)
    }
    else{
        setItem(restaurantList)
    }
   }



    const handleSearch = value => {
        // e.preventDefault();
        // console.log(value);
        setLoading(true)
        console.log(value, restaurant)
        if (value === 'Table') {
            fetch(`http://localhost:4200/tables/${restaurant._id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setItem(data);
                    setLoading(false)
                })
        } else {
            fetch(`http://localhost:4200/foods/${restaurant._id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setItem(data);
                    setLoading(false)
                })
        }
        if (value === 'All') {
            setItem(allItem)
        }
        else {
            const category = allItem.filter(pd => pd.category === value);
            setItem(category);
        }

        // setSearch(value);

    }

    const search = (rows) => {
        if (rows) {
            const columns = rows[0] && Object?.keys(rows[0]);
            return rows?.filter((row) =>
                columns?.some(
                    (column) =>
                        row[column]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(query?.toLowerCase()) > -1
                )
            )
        }
    }


    return (
        <div style={{borderTop:'1px solid lightGray'}} className="mt-5">
            <div className="text-center cat mt-5">

                <nav className='mt-5'>
                    <ul className='mt-5'>
                        {/* <li class="menu"><a href onClick={() => handleSearch('All')}><b>All Items</b></a></li> */}
                        <li className={activeMenu === 'Table' ? 'menu-active menu' : 'menu'}><a className='' href
                            onClick={() => {
                                handleSearch('Table')
                                setActiveMenu(('Table'))
                                setQuery('')
                            }}
                        ><b>Table</b>
                            <div class="underline underline-hover"></div></a></li>
                        <li className={activeMenu === 'Food' ? 'menu-active menu' : 'menu'}><a className='' href
                            onClick={() => {
                                handleSearch('Food')
                                setActiveMenu(('Food'))
                            }}
                        ><b>Food</b>
                            <div class="underline underline-hover"></div></a></li>
                        {/* <li className={activeMenu === 'Table' ? 'menu-active menu' : 'menu'}><a href onClick={() => {
                            handleSearch('Transmission system')
                            setActiveMenu(('Foods'))
                        }}><b>Foods</b></a></li> */}
                        {/* <li class="menu"><a href onClick={() => handleSearch('Tyres and brakes')}><b>Tyres and brakes</b></a></li> */}
                        {/* <li class="menu"><a href onClick={() => handleSearch('Other accessories')}><b>Other accessories</b></a></li> */}
                    </ul>
                </nav>
            </div>

            <div className="container mt-5">
                {activeMenu === 'Table' ? <div className=' d-flex justify-content-end'>
                    <p style={{ color: '#DC3444' }} className="mr-4 mt-2">Select Layout</p>
                    <Select

                        styles={customStyles}
                        required
                        options={layoutList}
                        onChange={(e) => {
                            // handleArea(e);
                            handleLayout(e)
                        }}
                        isSearchable={true}
                        isClearable={true}
                    />
                </div> : <div className=' d-flex justify-content-end'>
                    <p style={{ color: '#DC3444' }} className="mr-4 mt-2">Search Food</p>
                    <input
                        style={{
                            borderRadius: "20px",
                            border: "2px solid #E5194B",
                            width: '180px'
                        }}
                        type="text"
                        // ref={register({ required: true })}
                        name="address"
                        placeholder=""
                        className="form-control"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    {/* <Select
                      
                      styles={customStyles}
                      required
                      options={layoutList}
                      onChange={(e) => {
                        // handleArea(e);
                      }}
                      isSearchable={true}
                      isClearable={true}
                    /> */}
                </div>}
                {/* <div className=' d-flex justify-content-end'>
                    <p style={{ color: '#DC3444' }} className="mr-4 mt-2">Select Layout</p>
                    <Select
                      
                      styles={customStyles}
                      required
                      options={layoutList}
                      onChange={(e) => {
                        // handleArea(e);
                      }}
                      isSearchable={true}
                      isClearable={true}
                    />
                </div> */}
                {loading?<div className='d-flex justify-content-center'><img alt="loading" src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"/></div>:<>
                 <div className="row">
                 {
                     search(item).map(data => <MenuItem activeMenu={activeMenu} item={data}></MenuItem>)
                 }
               

                 
             </div>
             <div style={{margin:'130px 0px', fontSize:'25px', color:'red'}}className="text-center">
             {search(item).length === 0 && activeMenu === 'Food' ? <p>This food is not available</p>:search(item).length === 0 && activeMenu === 'Table'?<p>Table not available at this moment</p>:<></>}
             </div>
             </>}
               
            </div>


        </div>
    );
};

export default Menu;