import React, { Component } from 'react';
import '../stylesheets/Weather.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import apiKeys from '../config.js';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import '../stylesheets/weather-icons-wind.min.css';
import '../stylesheets/weather-icons.min.css';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: null,
      currentTemp: null,
      weather_next_week: []
    }
    this.addZipcode = this.addZipcode.bind(this);
    this.weatherInfo = this.weatherInfo.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.forecast = this.forecast.bind(this);
    this.weatherIcon = this.weatherIcon.bind(this);
  }

  componentDidMount() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=10013&key=${apiKeys.googleMapsAPI}`)
    .then((g_maps_response) => {
      var lng = g_maps_response.data.results[0].geometry.location.lng;
      var lat = g_maps_response.data.results[0].geometry.location.lat;
      var city = g_maps_response.data.results[0].address_components[1].long_name;
      $.ajax({
        type: 'GET',
        dataType: 'JSONP',
        crossDomain: true,
        url: `https://api.darksky.net/forecast/${apiKeys.darkSkyAPI}/${lat},${lng}`,
      })
      .done((darksky_response) => {
        var currentTemp = darksky_response.currently.temperature;
        var weather_next_week = [];
        darksky_response.daily.data.map(day => {
          var weatherObjOneDay = {};
          var time = moment.unix(day.time).format("dddd");
          weatherObjOneDay['time'] = time,
          weatherObjOneDay['summary'] = day.summary,
          weatherObjOneDay['icon'] = day.icon,
          weatherObjOneDay['humidity'] = day.humidity * 100,
          weatherObjOneDay['temperatureMin'] = day.temperatureMin,
          weatherObjOneDay['temperatureMax'] = day.temperatureMax
          weather_next_week.push(weatherObjOneDay);
        })
        // get weather for next six days from today, not seven days
        weather_next_week = weather_next_week.slice(0,7);
        this.setState({
          city,
          currentTemp,
          weather_next_week
        })
      })
    })
  }

  addZipcode(e) {
    // when Enter is press from input, then exectue
    if (e.key === 'Enter') {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.zipCode.value}&key=${apiKeys.googleMapsAPI}`)
      .then((response) => {
        var lng = response.data.results[0].geometry.location.lng;
        var lat = response.data.results[0].geometry.location.lat;
        var city = response.data.results[0].address_components[1].long_name;
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.zipCode.value},us&appid=${apiKeys.openWeatherAPI}`)
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
          console.log(lat);
          console.log(lng);
          console.log(this.state.currentTemp);
          console.log(this.state.currentTempMin);
          console.log(this.state.currentTempMax);
          // console.log(this.state);
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  weatherIcon(icon) {
    switch(icon) {
     case("clear-day"):
      return (
        <i className="wi wi-day-sunny"></i>
      )
     break;

     case("clear-night"):
      return (
        <i className="wi wi-night-clear"></i>
      )
     break;

     case("rain"):
      return (
        <i className="wi wi-showers"></i>
      )
     break;

     case("snow"):
      return (
        <i className="wi wi-snow"></i>
      )
     break;

     case("sleet"):
      return (
        <i className="wi wi-night-sleet"></i>
      )
     break;

     case("wind"):
      return (
        <i className="wi wi-sleet"></i>
      )
     break;

     case("fog"):
      return (
        <i className="wi wi-fog"></i>
      )
     break;

     case("cloudy"):
      return (
        <i className="wi wi-cloudy"></i>
      )
     break;

     case("partly-cloudy-day"):
      return (
        <i className="wi wi-day-cloudy"></i>
      )
     break;

     case("partly-cloudy-night"):
      return (
        <i className="wi wi-night-alt-cloudy"></i>
      )
     break;

     case("thunderstrom"):
      return (
        <i className="wi wi-thunderstorm"></i>
      )
     break;

     case("tornado"):
      return (
        <i className="wi wi-tornado"></i>
      )
     break;

     case("hail"):
      return (
        <i className="wi wi-hail"></i>
      )
     break;

     default:

    }
  }

  forecast() {
    if (this.state.weather_next_week.length > 1) {
      return (
        this.state.weather_next_week.slice(1,6).map(day => (
          <li className="one-forecast-day">
            <div>{day.time}</div>
              <span className="weather-icons">
                {this.weatherIcon(day.icon)}
              </span>
            <div className="temp-min-max-forecast">
              {day.temperatureMin} / {day.temperatureMax}
            </div>
          </li>
        ))
      )
    }
  }

  weatherInfo() {
    if (this.state.weather_next_week.length > 0) {
      return (
        <ul className="weather-current">
          <span className="weather-icon-today">
            {this.weatherIcon(this.state.weather_next_week[0].icon)}
          </span>
          <h3><span className="cityName">{this.state.city}</span></h3>
          <div className="currentTemp">{this.state.currentTemp} &#8457;</div>
          <span className="weather-icon-today">
            {this.weatherIcon(this.state.weather_next_week[0].icon)}
          </span>
          <div className="details">
            <li>{this.state.weather_next_week[0].summary}</li>
            <li>{this.state.weather_next_week[0].temperatureMin} &#8457;/{this.state.weather_next_week[0].temperatureMax} &#8457;</li>
            <li>Humidity: {this.state.weather_next_week[0].humidity}%</li>
          </div>
          <ul className="all-forecast-day">
            {this.forecast()}
          </ul>
        </ul>
      )
    }
  }

 moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Weather'">
        <p>
          This widget gives you the current weather and short summary.
          You can just enter your zipcode and press Enter.
        </p>
        <p>
          This widget is powered by Open Weather API.
        </p>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_Weather text-center">
        <h2 className="pull-left">
          Weather
        </h2>
          <input
            className="weather-input text-center"
            type="text"
            placeholder="Enter Your Zipcode"
            ref={(input) => { this.zipCode = input; }}
            onKeyPress={this.addZipcode}
          />
        <span className="pull-right">
          <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
            <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
          </OverlayTrigger>
        </span>
        <br />
        {this.weatherInfo()}
    </div>
    );
  }
}

export default Weather;
