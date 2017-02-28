import React, { Component } from 'react';
import '../stylesheets/Weather.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import $ from 'jquery';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      currentCity: null,
      currentIcon: null,
      currentTemp: null,
      currentTempMin: null,
      currentTempMax: null,
      currentSummary: null,
      currentTime: null,
      currentHumidity: null
    }
    this.addZipcode = this.addZipcode.bind(this);
    this.kelvinToFarenheit = this.kelvinToFarenheit.bind(this);
    this.weatherInfo = this.weatherInfo.bind(this);
  }

  componentDidMount() {

  }

  kelvinToFarenheit(kelvin) {
     // T(K) × 9/5 - 459.67
     return (kelvin * 9/5 - 459.67).toFixed(2);
  }

  addZipcode() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.zipCode.value}&key=AIzaSyC612Te57jvPruYLaFSOTsl67ju82g714A`)
    .then((response) => {
      var lng = response.data.results[0].geometry.location.lng;
      var lat = response.data.results[0].geometry.location.lat;
      var city = response.data.results[0].address_components[1].long_name;
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.zipCode.value},us&appid=5fa0a6844ee0178fe0f7a7b05a3f3032`)
      .then((res) => {
        this.zipCode.value = null;
        this.setState({
          currentCity: city,
          currentTemp: this.kelvinToFarenheit(res.data.list[0].main.temp),
          currentTempMin: this.kelvinToFarenheit(res.data.list[0].main.temp_min),
          currentTempMax: this.kelvinToFarenheit(res.data.list[0].main.temp_max),
          currentSummary: res.data.list[0].weather[0].description,
          currentTime: res.data.list[0].dt,
          currentHumidity: res.data.list[0].main.humidity
        })
        console.log(this.state);
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  weatherInfo() {
    if (this.state.currentCity !== null) {
      return (
        <ul>
          <li>City: {this.state.currentCity}</li>
          <li>Temp: {this.state.currentTemp}</li>
          <li>Min Temp: {this.state.currentTempMin}</li>
          <li>Max Temp: {this.state.currentTempMax}</li>
          <li>Details: {this.state.currentSummary}</li>
          <li>Humidity: {this.state.currentHumidity}</li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="main_Weather">
        <h1>Weather</h1>
        <ul>
        </ul>
        <input
          type="text"
          placeholder="Enter a zipcode"
          ref={(input) => { this.zipCode = input; }}
        />
        <input
          type="button"
          value="Enter"
          onClick={this.addZipcode}
        />
        {this.weatherInfo()}
    </div>
    );
  }
}

export default Weather;
