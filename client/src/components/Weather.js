/* eslint-disable */
import React, { Component } from 'react';
import '../stylesheets/Weather.css';
import axios from 'axios';
import apiKeys from '../config.js';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import '../stylesheets/weather-icons-wind.min.css';
import '../stylesheets/weather-icons.min.css';
import alertify from 'alertify.js';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: null,
      currentTemp: null,
      weather_next_week: [],
      zipcode: 10013,
    }
    this.addZipcode = this.addZipcode.bind(this);
    this.weatherInfo = this.weatherInfo.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.forecast = this.forecast.bind(this);
    this.weatherIcon = this.weatherIcon.bind(this);
  }

  componentDidMount() {
    var zipcode = localStorage.getItem('dashboard-app-my-zip-code');
    if (!zipcode) {
      zipcode = this.state.zipcode;
    }
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${apiKeys.googleMapsAPI}`)
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
          weatherObjOneDay['time'] = time;
          weatherObjOneDay['summary'] = day.summary;
          weatherObjOneDay['icon'] = day.icon;
          weatherObjOneDay['humidity'] = Number(day.humidity * 100).toFixed(2);
          weatherObjOneDay['temperatureMin'] = day.temperatureMin;
          weatherObjOneDay['temperatureMax'] = day.temperatureMax;
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
            weatherObjOneDay['time'] = time;
            weatherObjOneDay['summary'] = day.summary;
            weatherObjOneDay['icon'] = day.icon;
            weatherObjOneDay['humidity'] = Number(day.humidity * 100).toFixed(2);
            weatherObjOneDay['temperatureMin'] = day.temperatureMin;
            weatherObjOneDay['temperatureMax'] = day.temperatureMax;
            weather_next_week.push(weatherObjOneDay);
          })
          // get weather for next six days from today, not seven days
          weather_next_week = weather_next_week.slice(0,7);
          this.setState({
            city,
            currentTemp,
            weather_next_week
          });
          localStorage.setItem('dashboard-app-my-zip-code', this.zipCode.value);
          alertify.logPosition('top left');
          alertify.log(`Weather: Zipcode ${this.zipCode.value} saved!`)
          this.zipCode.value = null;
        })
      })
    }
  }

  // add weather icons depending on weather conditions
  weatherIcon(icon) {
    switch(icon) {
     case("clear-day"):
      return (
        <i className="wi wi-day-sunny"></i>
      )

     case("clear-night"):
      return (
        <i className="wi wi-night-clear"></i>
      )

     case("rain"):
      return (
        <i className="wi wi-showers"></i>
      )

     case("snow"):
      return (
        <i className="wi wi-snow"></i>
      )

     case("sleet"):
      return (
        <i className="wi wi-night-sleet"></i>
      )

     case("wind"):
      return (
        <i className="wi wi-sleet"></i>
      )

     case("fog"):
      return (
        <i className="wi wi-fog"></i>
      )

     case("cloudy"):
      return (
        <i className="wi wi-cloudy"></i>
      )

     case("partly-cloudy-day"):
      return (
        <i className="wi wi-day-cloudy"></i>
      )

     case("partly-cloudy-night"):
      return (
        <i className="wi wi-night-alt-cloudy"></i>
      )

     case("thunderstrom"):
      return (
        <i className="wi wi-thunderstorm"></i>
      )

     case("tornado"):
      return (
        <i className="wi wi-tornado"></i>
      )

     case("hail"):
      return (
        <i className="wi wi-hail"></i>
      )

     default:

    }
  }

  forecast() {
    if (this.state.weather_next_week.length > 1) {
      return (
        this.state.weather_next_week.slice(1,6).map((day, idx) => (
          <li className="one-forecast-day" key={idx}>
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
            <li className="weather-summary">{this.state.weather_next_week[0].icon.toUpperCase()}</li>
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
      <Popover id="weather widget" className="aboutNewsWidget" title="About 'Weather'">
        <p>
          This widget gives you the current weather and next 5 days forecast.
        </p>
        <ul>
          <li><strong>Add Your Zipcode</strong>: Enter your zipcode at the top, and press 'Enter'.
           It will be saved in locally the next time you visit.</li><br />
        </ul>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_Weather text-center">
        <h2 className="pull-left">
          &nbsp;
          <i className="fa fa-thermometer-three-quarters" aria-hidden="true"></i>
          &nbsp;
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
          <OverlayTrigger placement="top" overlay={this.moreInfo()}>
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
