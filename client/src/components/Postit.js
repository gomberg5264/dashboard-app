/* eslint-disable */
import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';
import 'react-date-picker/index.css';
import { Calendar } from 'react-date-picker';
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
      notes.push('No Events Yet!');
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
      notes.push('No Events Yet!');
    }

    this.setState({
      selectedDay,
      notes
    })
  }

  save(e) {
    if (e.key === 'Enter') {
      if (this.state.notes[0] === 'No Events Yet!') {
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
      // alert new item added!
      alertify.logPosition('top left');
      alertify.log('Calendar: \'' + this.note.value + '\' added!');
      this.note.value = null;
    }
  }

  moreInfo() {
    return (
      <Popover id="calendar widget" className="aboutNewsWidget" title="About 'Calendar'">
        <p>
          This widget lets you add/delete events to each day.
        </p>
        <ul>
          <li><strong>Add Event</strong>: Click on a date, enter event on top ('Enter Your Events'), and press 'Enter'.</li><br/>
          <li><strong>Delete Event</strong>: Click the 'x' to the left of the event.</li>
        </ul>
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
          <li className="each-note" key={idx}>{note}
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
            <OverlayTrigger placement="bottom" overlay={this.moreInfo()}>
              <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
            </OverlayTrigger>
          </span>
            <input
              className="postit-input text-center"
              type="text"
              placeholder="Enter Your Event"
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
