import React from 'react';
import './DaysList.scss';

const DaysList = (props) => {
  
  // get current day 
  const currentDay = new Date(props.date).getDay();
 
  const days = props.days.map((day, index) => {

    // get number of each day
    let date = new Date(day.date).getDay();

    let dayTempInfo = (props.tempType === 'fahrenheit' ? Math.round(day.temperature * 9 / 5 + 32) : day.temperature) ;
  
    return (
      <div className="weather__days__list" key={index}>
        <div className="list__day">{date === currentDay ? 'Today': props.daysNames[date]}</div> 
        <div className={`list__avatar ${day.type.toLowerCase()}`}></div>
        <div className="list__temp">{dayTempInfo}{props.tempType === 'fahrenheit' ? <sup>°F</sup> : <sup>°C</sup>}</div>
        <div className="list__pollen">{'Pollen ' + day.pollenCount}</div>
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