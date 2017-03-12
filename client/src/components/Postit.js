import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';
import moment from 'moment';

class Postit extends Component {
  constructor() {
    super();
    this.state = {
      today: null
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    var today = moment().format("dddd, MMMM Do YYYY");
    this.setState({
      today
    })
    // console.log(moment(new Date())._d);
    console.log(moment().format("dddd, MMMM Do YYYY"));
  }

  onChange(dateString, { dateMoment, timestamp }){
    this.setState({
      today: dateString
    })
  }

  render() {
    return (
      <div className="main_Postit">
        <h2 className="pull-left">
          Calendar
        </h2>
        <br /><br />
        <Calendar
          className="calendar"
          dateFormat="YYYY-MM-DD"
          date={moment()}
          onChange={this.onChange}
        />
        {this.state.today}
    </div>
    );
  }
}

export default Postit;
