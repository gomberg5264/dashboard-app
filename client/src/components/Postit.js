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
      today: null,
      notes: [],
    }
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  componentDidMount() {
    var today = moment().format("dddd, MMMM Do YYYY");
    if (this.notes.length < 1) {
      var notes = [];
      notes.push('No Notes Added Yet!')
      this.setState({
        today,
        notes
      })
    }
    else {
      this.setState({
        today
      })
    }
  }

  onChange(dateString, { dateMoment, timestamp }){
    this.setState({
      today: dateString
    })
  }

  save(e) {
    var notes = this.state.notes;
    if (e.key === 'Enter') {
      notes.push(this.note.value);
      this.setState({
        notes
      })
      this.note.value = null;
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

  notes() {
    return (
      this.state.notes.map(note => (
        <ul className="all-notes">
          <li className="each-note">{note}</li>
        </ul>
      ))
    )
  }

  render() {
    return (
      <div className="main_Postit text-center">
          <h2 className="pull-left">
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
              <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
            </OverlayTrigger>
            &nbsp;
            Calendar</h2>
          <span className="pull-right">
            <input
              className="postit-input text-center"
              type="text"
              placeholder="Enter Your Note"
              ref={(input) => { this.note = input; }}
              onKeyPress={this.save}
            />
          </span>
          <br /><br />
          <Calendar
              className="calendar pull-left"
              dateFormat="YYYY-MM-DD"
              date={moment()}
              onChange={this.onChange}
            />
          <h4 className="today">{this.state.today}</h4>
          {this.notes()}
       </div>
    );
  }
}

export default Postit;
