import React, { Component } from 'react';
import Weather from '../components/Weather'
import './App.scss';

class App extends Component {

  currentDate = new Date().toISOString().slice(0, 10); // get current date

  state = {
    cities: [],
    cityId: null,
    selectCity: '',
    isLoaded: false,
    error: false,
    weather: '',
    tempType: "fanhrenheit",
  }

  // fetch city name from weather API
  fetchCity () {
    fetch('http://dev-weather-api.azurewebsites.net/api/city').then(
      response => {
        if(response.ok){
          return response.json()
        } else {
          throw Error('Download data error');
        }
      }
    ).then(data => {
      this.setState({
        cities: data,
        cityId: data[0].id,
        selectCity: data[0].name,
        
      }, this.fetchWeather); // set state for cities name, after download weather data
    }).catch(error => {
      this.setState({ error })
    })
  }

  // fetch weather data from API 
  fetchWeather() {
    let API = `http://dev-weather-api.azurewebsites.net/api/city/${this.state.cityId}/weather?date=${this.currentDate}`;
    fetch(API).then(
      response => {
        if(response.ok){
          return response.json();
        } else {
          throw Error('Download data error');
        }
      }
    ).then( data => {
      this.setState({
        weather: data,
        isLoaded: true
      })
    })
  }  

  handleTempChange = (type) => {
    this.setState({ tempType: type });
  }

  // handle click, selected city name, update setState
  handleCityChange = (id, city) => {
    this.setState({ 
      cityId: id,
      selectCity: city,
      isLoaded: false,
    }, this.fetchWeather);
  }  

  componentDidMount(){
    this.fetchCity(); // fetach city name when component mounted
  }

  render() {

    // display any error when fetch fail
    if(this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }
 
    return (
      <div className="App">
       <Weather date={this.currentDate} weather={this.state} click={this.handleCityChange} tempChange={this.handleTempChange}/>
      </div>
    );
  }
}

export default App;
