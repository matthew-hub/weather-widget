import React from 'react';
import "./DaysList.scss";

const DaysList = (props) => {

  const currentDay = new Date(props.date).getDay();

  const days = props.days.map((day, index) => {

    let date = new Date(day.date).getDay();
    let infoTemp = (props.tempType === "fanhrenheit" ? Math.round(day.temperature * 9 / 5 + 32) : day.temperature) ;
  
    return (
      <div className="weather__days__list" key={index}>
        <div className="list__day">{date === currentDay ? "Today": props.daysNames[date]}</div>
        <div className={`list__avatar ${day.type.toLowerCase()}`}></div>
        <div className="list__temp">{infoTemp}{props.tempType === "fanhrenheit" ? <sup>°F</sup> : <sup>°C</sup>}</div>
        <div className="list__pollen">{"Pollen " + day.pollenCount} </div>
      </div>
    )
  })

  return (  
    <>
      {days}
    </>
  );
}
 
export default DaysList;