import React from 'react';
import "./DaysList.scss";
import cloudy from "../assets/images/cloudy.png"
import partlyCloudy from "../assets/images/partly_cloudy.png"
import rainLight from "../assets/images/rain_light.png"
import sunny from "../assets/images/sunny.png"
import rainScloudy from "../assets/images/rain_s_cloudy.png"

const DaysList = (props) => {
  const gsDayNames = [ 'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  
  const days = props.days.map((day, index) => {
    let date = new Date(day.date).getDay();

    return (
      <div className="weather__days__list" key={index}>
        <div className="list__day">{gsDayNames[date]}</div>
        <div className="list__avatar"><img src={cloudy} alt="cloudy"/></div>
        <div>{day.temperature}</div>
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