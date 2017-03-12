import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';
import moment from 'moment';

const onChange = (dateString, { dateMoment, timestamp }) => {
  console.log(dateString)
}


class Postit extends Component {
  constructor() {
    super();
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
          onChange={onChange}
        />
    </div>
    );
  }
}

export default Postit;
