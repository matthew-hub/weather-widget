import React from 'react';
import './CityNames.scss'

const CityNames = (props) => {

  // destructuring assignment variables from props
  const {cities, cityId, selectCity, click} = props.cityData;

  const cityList = cities.map(city => {
    return (
      <li onClick={() => click(city.id, city.name)} key={city.id}>{city.name}</li>
    )
  })

  return ( 
    <div className="weather__city">
      <div className="city__dropdown">
        <h3>{cityId === null ? 'Select City' : selectCity}</h3>
        <ul className="city__list">
          {cityList}
        </ul>
      </div>
    </div>
  );
}
 
export default CityNames;