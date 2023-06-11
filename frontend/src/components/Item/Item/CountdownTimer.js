import React, { useState, useEffect } from 'react';

const CountdownTimer = ({handleAvailableSlot, index, time, duration }) => {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
});

useEffect(() => {
    // setNewTime()
    // setInterval(() => {
    //     setNewTime()
    //     // if(state.seconds === 0 ){
    //     //     window.location.assign('/')
    //     // }
    //     console.log(state.seconds)
    // }, 10);
    let timeData = new Date(new Date(time).getTime() + duration * 60000) - new Date().getTime();
    // console.log(parseInt(timeData / 1000))
    let filterTime = (parseInt(timeData / 1000)) * 1000;
    // console.log(!isNaN(filterTime))
    // function stop(){
    //     clearInterval(intervalID);
    // }
    var refreshIntervalId = setInterval(() => {
        setNewTime()
        // if(state.seconds === 0 ){
        //     window.location.assign('/')
        // }
        // console.log(state.seconds)
    }, 10)
    if (!isNaN(filterTime)) {

        setInterval(() => {
            clearInterval(refreshIntervalId)
            // window.location.reload('/exam')
        }, filterTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [time]);

const setNewTime = () => {
    if (new Date(time).getTime() + duration  * 60000) {
        const currentTime = new Date().getTime();

        const distanceToDate = new Date(time).getTime() + duration  * 60000 - currentTime;

        let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
            (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutes = Math.floor(
            (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
        );
        let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

        const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        days = `${days}`;
        if (numbersToAddZeroTo.includes(hours)) {
            hours = `0${hours}`;
        } else if (numbersToAddZeroTo.includes(minutes)) {
            minutes = `0${minutes}`;
        } else if (numbersToAddZeroTo.includes(seconds)) {
            seconds = `0${seconds}`;
        }

        if(minutes === 0 & seconds === 0){
            handleAvailableSlot(index)
        }
        setState({ days: days, hours: hours, minutes, seconds });
    }
};

  return (
      <> {state.minutes }: {state.seconds }</>
  );
};

export default CountdownTimer;
