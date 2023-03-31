import React from "react";
// import { useState } from "react";
// import ReactMapGL, { Marker } from "react-map-gl";
// import image from "./images.png";
const MapComponent = ({
  toLat = "23.632474",
  toLong = "90.154622",
  fromLat = "23.790901",
  fromLong = "90.513239",
}) => {
  // const [viewport, setViewport] = useState({
  //   width: "100vw",
  //   height: "100vh",
  //   latitude: 51.5072,
  //   longitude: 0.1276,
  //   zoom: 10,
  // });
  return (
    <div>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d116924.14857416009!2d90.22332291085685!3d23.680261767915187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m4!2s${toLat}%2C${toLong}!3m2!1d${toLat}!2d90.15462199999999!4m4!2s${23.708783139843593}%2C${90.41120666295906}!3m2!1d23.732194999999997!2d${90.41120666295906}!5e0!3m2!1sen!2sbd!4v1663322684801!5m2!1sen!2sbd`}
        width="600"
        height="450"
        // style="border:0;"
        allowfullscreen=""
        loading="lazy"
        title="loc"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       height: "100vh",
  //       // width: "500px",
  //     }}
  //   >
  //     <ReactMapGL
  //       dragPan
  //       {...viewport}
  //       mapStyle="mapbox://styles/jubayerjuhan/ckur7mll607x818qcuwnkpbsi"
  //       mapboxAccessToken="pk.eyJ1IjoianViYXllcmp1aGFuIiwiYSI6ImNrdXI0cHFseTE4bWIyb3FybDdreWNpNDQifQ.ZlyPUhzJalEYFiinkw1ydg"
  //     >
  //       {/* 23.750956,90.391724 */}
  //       <Marker longitude={23.750956} latitude={90} anchor="bottom">
  //         <img
  //           height={10}
  //           width={10}
  //           src={image}
  //           alt=""
  //           style={{ height: "100px", width: "100px" }}
  //         />
  //       </Marker>
  //     </ReactMapGL>
  //   </div>
  // );
};

export default MapComponent;
