import React, { Component } from 'react';
import Weather from '../components/Weather'
import './App.scss';

class App extends Component {
  currentDate = new Date().toISOString().slice(0, 10); // get current date
  state = {
    cities: [],
    cityId: 1,
    selectCity: 'Katowice',
    isLoaded: false,
    error: false,
    weather: ''
  }

  // fetch city name for weather API
  fetchCity = () => {
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
        isLoaded: true
      });
    }).catch(error => {
      this.setState({ error })
    });
  }

  // fetch weather from API 
  fetchWether() {
    console.log(this.currentDate)
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
        weather: data
      })
    })
  }  


  // handle click, selected city name, update setState
  handleCityChange = (id, city) => {
    this.setState({ 
      cityId: id,
      selectCity: city
    }, this.fetchWether);
  }  

  componentDidMount(){
    this.fetchCity(); // fetach city name when component mounted
    this.fetchWether();
  }

  render() {
    const {isLoaded} = this.state;

    if(this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }
 
    return (
      <div className="App">
       {isLoaded ===  false ? <h3>Loading..</h3> : <Weather weather={this.state} click={this.handleCityChange}/>}
      </div>
    );
  }
}

export default App;
