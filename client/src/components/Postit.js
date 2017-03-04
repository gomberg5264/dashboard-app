import React, { Component } from 'react';
import '../stylesheets/Postit.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import alertify from 'alertify.js';

class Postit extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
    this.showNote = this.showNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    axios.get('auth/login')
    .then((response) => {
      if (response.data.status === 'You are already logged in') {
        axios.get('/postit/list')
        .then((response) => {
          this.setState({
            notes: response.data['list']
          })
          // console.log(this.state.notes);
        })
        .catch((err) => { console.error(err); });
      }
    })
  }

  addNote() {
    axios.get('auth/login')
    .then((response) => {
      if (response.data.status === 'You are not logged in yet') {
        alertify.alert('Please login or register before adding a quick note. Thank you.');
      }
      if (response.data.status === 'You are already logged in') {
        axios.post('/postit/new', {
          data: this.note.value
        })
        .then((response) => {
          if (response.data['success']) {
            this.note.value = null;
            this.componentDidMount();
          }
        })
        .catch((err) => { console.error(err); });
      }
    })
  }

  deleteNote(id) {
    axios.post('/postit/delete', {
      id: id
    })
    .then((response) => {
      if (response.data['success']) {
        this.componentDidMount();
      }
    })
    .catch((err) => { console.error(err); });
  }

  showNote() {
    if (this.state.notes.length > 0) {
      return (
        this.state.notes.reverse().map(noteObj =>
          <li className="one_note">{noteObj.note}
            <Glyphicon className="pull-right deleteIcon" onClick={() => this.deleteNote(noteObj.id)} glyph="glyphicon glyphicon-trash align-right" />
          </li>
        )
      )
    }
  }

  render() {
    return (
      <div className="main_Postit text-center">
        <h2>Quick Note!</h2>
        <hr />
        <ul>
          {this.showNote()}
        </ul>
        <textarea
          rows="4"
          cols="45"
          type="text"
          placeholder="Add a quick note here."
          ref={(input) => { this.note = input; }}
        />
        <div>
          <input
            type="button"
            className="add_button"
            value="Add"
            onClick={this.addNote}
          />
        </div>
    </div>
    );
  }
}

export default Postit;
