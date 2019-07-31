import React from 'react';
import "./DaysList.scss";


const DaysList = (props) => {
  const gsDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDay = new Date(props.date).getDay();

  const days = props.days.map((day, index) => {
    let date = new Date(day.date).getDay();
    
    return (
      <div className="weather__days__list" key={index}>
        <div className="list__day">{date === currentDay ? "Today": gsDayNames[date]}</div>
        <div className={`list__avatar ${day.type}`}></div>
        <div>{day.temperature}</div>
        <div className="list__pollen">{day.pollenCount}</div>
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