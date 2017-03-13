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
      selectedDay: null,
      notes: []
    }
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    // select today
    var selectedDay = moment().format("dddd, MMMM Do YYYY");
    // pull the data/events for that day from localStorage and update notes state
    var notes = localStorage.getItem(selectedDay);
    // change string value to array
    if (notes){
      notes = notes.split(',');
    }
    else {
      notes = [];
      notes.push('No Events Added Yet!');
    }
    this.setState({
      selectedDay,
      notes
    })
  }

  onChange(dateString){
    var selectedDay = moment(dateString, 'YYYY-MM-DD').format("dddd, MMMM Do YYYY");
    // pull the data/events for that day from localStorage and update notes state
    var notes = localStorage.getItem(selectedDay);
    // change string value to array
    if (notes){
      notes = notes.split(',');
    }
    else {
      notes = [];
      notes.push('No Events Added Yet!');
    }

    this.setState({
      selectedDay,
      notes
    })
  }

  save(e) {
    if (e.key === 'Enter') {
      if (this.state.notes[0] === 'No Events Added Yet!') {
        var note = [];
        note.push(this.note.value);
        // save the note in localstorage
        localStorage.setItem(this.state.selectedDay, note);
        this.setState({
          notes: note
        })
      }
      else {
        // add the new note to the current notes
        var notes = this.state.notes;
        notes.push(this.note.value);
        // save/updates the notes in the localstorage
        localStorage.setItem(this.state.selectedDay, notes.join());
        this.setState({
          notes
        })
      }
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

  deleteEvent(idxToDelete, noteToDelete) {
    var notes = this.state.notes;
    // delete that item from the array
    notes.splice(idxToDelete,1);

    // update the state with new notes array
    this.setState({
      notes
    })

    // update the localStorage
    notes = notes.join(',');
    localStorage.setItem(this.state.selectedDay, notes);

    //alert the successful delete of item
    alertify.logPosition("top left");
    alertify.log('Calendar: \'' + noteToDelete + '\' deleted!');
  }

  notes() {
    if (this.state.notes) {
      return (
        this.state.notes.map((note, idx) => (
          <li className="each-note">{note}
            <i className="fa fa-times-circle-o pull-left deleteIcon"
               aria-hidden="true"
               onClick={() => {this.deleteEvent(idx,note)}}
               >
            </i>
          </li>
        ))
      )
    }
  }

  render() {
    return (
      <div className="main_Postit text-center">
          <h2 className="pull-left">
            &nbsp;
            <i className="fa fa-calendar" aria-hidden="true"></i>
            &nbsp;
            Calendar
          </h2>
          <span className="pull-right">
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
              <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
            </OverlayTrigger>
          </span>
            <input
              className="postit-input text-center"
              type="text"
              placeholder="Enter Your Events"
              ref={(input) => { this.note = input; }}
              onKeyPress={this.save}
            />
          <br /><br />
          <Calendar
              className="calendar pull-left"
              dateFormat="YYYY-MM-DD"
              date={moment()}
              onChange={this.onChange}
            />
          <h4 className="selectedDay">{this.state.selectedDay}</h4>
          <ul className="all-notes pull-right">
            {this.notes()}
          </ul>
       </div>
    );
  }
}

export default Postit;
