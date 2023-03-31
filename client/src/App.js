import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AddArea from "./components/Admin/AddArea/AddArea";
import AddRestaurant from "./components/Admin/AddRestaurant/AddRestaurant";
import AddItem from "./components/Admin/AddItem/AddItem";
import AreaList from "./components/Admin/AreaList/AreaList";
import Customer from "./components/Admin/Customer/Customer";
import DeliveryOrder from "./components/Admin/DeliveryOrder/DeliveryOrder";
import GarageListAdmin from "./components/Admin/GarageListAdmin/GarageListAdmin";
import ItemList from "./components/Admin/ItemList/ItemList";
import PendingOrder from "./components/Admin/PendingOrder/PendingOrder";
import UpdateGarage from "./components/Admin/UpdateGarage/UpdateGarage";
import UpdateItem from "./components/Admin/UpdateItem/UpdateItem";
import Checkout from "./components/Checkout/Checkout/Checkout";
import ServiceCheckout from "./components/Checkout/ServiceCheckout/ServiceCheckout";
import Restaurant from "./components/Restaurant/Restaurant/Restaurant";
import AddGarageService from "./components/RestaurantUser/AddGarageService/AddGarageService";
import DeliveryRequest from "./components/RestaurantUser/DeliveryRequest/DeliveryRequest";
import GarageProfileUser from "./components/RestaurantUser/GarageProfileUser/GarageProfileUser";
import PendingRequest from "./components/RestaurantUser/PendingRequest/PendingRequest";
import ServiceList from "./components/RestaurantUser/ServiceList/ServiceList";
import UpdateGarageService from "./components/RestaurantUser/UpdateGarageService/UpdateGarageService";
// import GarageList from "./components/Home/GarageList/GarageList";
import Home from "./components/Home/Home/Home";
import Item from "./components/Item/Item/Item";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import SignUp from "./components/Login/SignUp/SignUp";
// import MapComponent from "./components/MapComponent/MapComponent.js";
import ServiceShipment from "./components/ServiceShipment/ServiceShipment/ServiceShipment";
import Shipment from "./components/Shipment/Shipment/Shipment";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [myLocation, setMyLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);
  function showPosition(position) {
    setMyLocation(position.coords);
    // console.log(position.coords, "juhancords");
  }

  // return <MapComponent></MapComponent>;
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
          <PrivateRoute path="/admin/updateGarage/:id">
            <UpdateGarage></UpdateGarage>
          </PrivateRoute>
          <PrivateRoute path="/admin/restaurantList">
            <GarageListAdmin></GarageListAdmin>
          </PrivateRoute>
          <PrivateRoute path="/admin/customer">
            <Customer></Customer>
          </PrivateRoute>
          <PrivateRoute path="/garage/profile">
            <GarageProfileUser></GarageProfileUser>
          </PrivateRoute>
          <PrivateRoute path="/garage/pending">
            <PendingRequest></PendingRequest>
          </PrivateRoute>
          <PrivateRoute path="/garage/delivery">
            <DeliveryRequest></DeliveryRequest>
          </PrivateRoute>
          <PrivateRoute path="/garage/addService">
            <AddGarageService></AddGarageService>
          </PrivateRoute>
          <PrivateRoute path="/garage/updateService/:id">
            <UpdateGarageService></UpdateGarageService>
          </PrivateRoute>
          <PrivateRoute path="/garage/serviceList">
            <ServiceList></ServiceList>
          </PrivateRoute>
          <PrivateRoute path="/garage/:id">
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
