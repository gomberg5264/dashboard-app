import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import gmail_icon from '../images/gmail-icon.png';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

const onChange = (dateString, { dateMoment, timestamp }) => {
  console.log(dateString)
}

let date = '2017-04-24';

class Postit extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main_Postit">
        <h2 className="pull-left">
          Wikipedia/Google Calendar?
        </h2>
        <span className="pull-right">
          <i className="fa fa-wikipedia-w wikipedia-icon" aria-hidden="true"></i>
        </span>
        <Calendar
          className="calendar"

        />
    </div>
    );
  }
}

export default Postit;
