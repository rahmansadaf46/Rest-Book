import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AddArea from "./components/Admin/AddArea/AddArea";
import AddRestaurant from "./components/Admin/AddRestaurant/AddRestaurant";
import AddItem from "./components/Admin/AddItem/AddItem";
import AreaList from "./components/Admin/AreaList/AreaList";
import Customer from "./components/Admin/Customer/Customer";
import DeliveryOrder from "./components/Admin/DeliveryOrder/DeliveryOrder";
import RestaurantListAdmin from "./components/Admin/RestaurantListAdmin/RestaurantListAdmin";
import ItemList from "./components/Admin/ItemList/ItemList";
import PendingOrder from "./components/Admin/PendingOrder/PendingOrder";
import UpdateRestaurant from "./components/Admin/UpdateRestaurant/UpdateRestaurant";
import UpdateItem from "./components/Admin/UpdateItem/UpdateItem";
import Checkout from "./components/Checkout/Checkout/Checkout";
import ServiceCheckout from "./components/Checkout/ServiceCheckout/ServiceCheckout";
import Restaurant from "./components/Restaurant/Restaurant/Restaurant";
import AddRestaurantTable from "./components/RestaurantUser/AddRestaurantTable/AddRestaurantTable";
import BookingDone from "./components/RestaurantUser/BookingDone/BookingDone";
import RestaurantProfileUser from "./components/RestaurantUser/RestaurantProfileUser/RestaurantProfileUser";
import BookingRequest from "./components/RestaurantUser/BookingRequest/BookingRequest";
import RestaurantTableList from "./components/RestaurantUser/RestaurantTableList/RestaurantTableList";
import UpdateRestaurantTable from "./components/RestaurantUser/UpdateRestaurantTable/UpdateRestaurantTable";
import Home from "./components/Home/Home/Home";
import Item from "./components/Item/Item/Item";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import SignUp from "./components/Login/SignUp/SignUp";
// import MapComponent from "./components/MapComponent/MapComponent.js";
import ServiceShipment from "./components/ServiceShipment/ServiceShipment/ServiceShipment";
import Shipment from "./components/Shipment/Shipment/Shipment";
import AddFood from "./components/RestaurantUser/AddFood/AddFood";
import UpdateFood from "./components/RestaurantUser/UpdateFood/UpdateFood";
import FoodList from "./components/RestaurantUser/FoodList/FoodList";
import AddLayout from "./components/RestaurantUser/AddLayout/AddLayout";
import LayoutList from "./components/RestaurantUser/LayoutList/LayoutList";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [myLocation, setMyLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);
  function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    setMyLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
    // console.log(position.coords, "juhancords");
  }

  // return <MapComponent></MapComponent>;
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, myLocation]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/checkout">
            <Checkout></Checkout>
          </PrivateRoute>
          <PrivateRoute path="/serviceCheckout">
            <ServiceCheckout></ServiceCheckout>
          </PrivateRoute>
          <PrivateRoute path="/item/:id">
            <Item></Item>
          </PrivateRoute>

          <PrivateRoute path="/serviceShipment/:coords">
            <ServiceShipment mylocation={myLocation}></ServiceShipment>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment mylocation={myLocation}></Shipment>
          </PrivateRoute>
          <PrivateRoute path="/admin/pending">
            <PendingOrder></PendingOrder>
          </PrivateRoute>
          <PrivateRoute path="/admin/delivery">
            <DeliveryOrder></DeliveryOrder>
          </PrivateRoute>
          <PrivateRoute path="/admin/areaList">
            <AreaList></AreaList>
          </PrivateRoute>
          <PrivateRoute path="/admin/addItem">
            <AddItem></AddItem>
          </PrivateRoute>
          <PrivateRoute path="/admin/updateItem/:id">
            <UpdateItem></UpdateItem>
          </PrivateRoute>
          <PrivateRoute path="/admin/itemList">
            <ItemList></ItemList>
          </PrivateRoute>
          <Route path="/admin/addArea">
            <AddArea></AddArea>
          </Route>
          <PrivateRoute path="/admin/addRestaurant">
            <AddRestaurant></AddRestaurant>
          </PrivateRoute>
          <PrivateRoute path="/admin/updateRestaurant/:id">
            <UpdateRestaurant></UpdateRestaurant>
          </PrivateRoute>
          <PrivateRoute path="/admin/restaurantList">
            <RestaurantListAdmin></RestaurantListAdmin>
          </PrivateRoute>
          <PrivateRoute path="/admin/customer">
            <Customer></Customer>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/profile">
            <RestaurantProfileUser></RestaurantProfileUser>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/pending">
            <BookingRequest></BookingRequest>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/delivery">
            <BookingDone></BookingDone>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/addTable">
            <AddRestaurantTable></AddRestaurantTable>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/updateTable/:id">
            <UpdateRestaurantTable></UpdateRestaurantTable>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/restaurantTableList">
            <RestaurantTableList></RestaurantTableList>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/addFood">
            <AddFood></AddFood>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/updateFood/:id">
            <UpdateFood></UpdateFood>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/foodList">
            <FoodList> </FoodList>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/addLayout">
            <AddLayout></AddLayout>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/layoutList">
            <LayoutList> </LayoutList>
          </PrivateRoute>
          <PrivateRoute path="/restaurant/:id">
            <Restaurant></Restaurant>
          </PrivateRoute>
         
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
