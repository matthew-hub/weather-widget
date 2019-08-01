import React from 'react';
import './Weather.scss'
import DaysList from './DaysList';

const Weather = (props) => {

  // destructuring assignment variables from props
  const {cities, error, isLoaded, weather, cityId, selectCity, tempType} = props.weather;

  const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let content = null;

  let newDate = new Date(props.date);
 
  // get ordinal numbers
  const nth = (d) => {
    if(d > 3 && d < 21) return 'th'; 
    switch (d % 10) {
      case 1:  
        return "st";
      case 2:  
        return "nd";
      case 3:  
        return "rd";
      default: 
        return "th";
     }
  }

  let weatherDate = daysNames[newDate.getDay()] + ", " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + nth(newDate.getDate());

  // check if weather data was downloaded
  if(isLoaded && weather && !error){

    let weatherTemp = (tempType === "fanhrenheit" ? Math.round(weather[0].temperature * 9 / 5 + 32) : weather[0].temperature);

    let tempContent;

    if(tempType === "fanhrenheit"){
       tempContent = (
        <div className="weather__info--temp">{weatherTemp} 
          <sup className={tempType === "fanhrenheit" ? "temp__active" : null} onClick={() => props.tempChange("fanhrenheit")}>°F | </sup>
          <sup onClick={() => props.tempChange("celsius")}>°C</sup>
        </div>
      )
    } else {
      tempContent = (
        <div className="weather__info--temp">{weatherTemp}
          <sup className={tempType === "celsius" ? "temp__active" : null} onClick={() => props.tempChange("celsius")}>°C | </sup>
          <sup onClick={() => props.tempChange("fanhrenheit")}>°F</sup>
        </div>
      )
    }

    // find capital letters in string || insert space before capital letters
    let weatherType = weather[0].type.replace(/([A-Z])/g, ' $1').trim();

    // changed string to lowercase letters
    weatherType = weatherType.toLowerCase(); 
    // set first letter to upperscase || add rest string to first letter
    weatherType = weatherType.charAt(0).toUpperCase() + weatherType.slice(1);

  
    content = (
      <>
        <div className="weather__info">
          <div className="weather__info--date">{weatherDate}</div>
          <div className="weather__info--type">{weatherType}</div>
          <div className={`weather__info--avatar ${weather[0].type.toLowerCase()}`}></div>
          <div className="weather__info--temp">{tempContent}</div>
          <div className="weather__info--more">
            <ul>
              <li>Precipitation: <span>{weather[0].precipitation + "%"}</span> </li>
              <li>Humidity: <span>{weather[0].humidity + "%"}</span> </li>
              <li>Wind: <span>{weather[0].windInfo.speed + " mph " + weather[0].windInfo.direction }</span> </li>
              <li>Pollen Count: <span>{weather[0].pollenCount}</span> </li>
            </ul>
          </div>
        </div>
        <div className="weather__days">
          <DaysList days={weather}  tempType={tempType} date={props.date} daysNames={daysNames}/> 
        </div>
      </>
    )
  }

  const cityList = cities.map( city => {
    return (
      <li onClick={() => props.click(city.id, city.name)} key={city.id}>{city.name}</li>
    )
  })

  return (  
    <div className="weather">
      <div className="weather__city">
        <div className="city__dropdown">
          <h3>{cityId === null ? "Select City" : selectCity }</h3>
          <ul className="city__list">
            {cityList}
          </ul>
        </div>
      </div> 
      {isLoaded === false ? <h3>Loadding...</h3> : content}
    </div>
  );
}
 
export default Weather;