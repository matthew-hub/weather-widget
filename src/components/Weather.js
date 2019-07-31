import React from 'react';
import './Weather.scss'
import DaysList from './DaysList';
const Weather = (props) => {

  const {cities, isLoaded, weather, cityId, selectCity} = props.weather;

  let content = null;


  console.log(props.weather.weather)
  if(isLoaded && weather){
    
    content = (
      <>
      <div className="weather__info">
        <div className="weather_date">{weather[0].date}</div>
        <div className="weather_type">{weather[0].type}</div>
        <div className="weather_type">{weather[0].temperature}</div>
      </div>
      <div className="weather__days">

        <DaysList days={weather}/> 
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
      {content}
     
    </div>
  );
}
 
export default Weather;