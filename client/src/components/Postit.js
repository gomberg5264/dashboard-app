import React, { Component } from 'react';
import '../stylesheets/Postit.css';

class Postit extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
    this.showNote = this.showNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  saveNote() {
    var temp = this.state.notes;
    temp.push(this.note.value);
    this.setState({
      notes: temp
    });
    this.note.value = null;
  }

  showNote() {
    if (this.state.notes.length > 0) {
      return (
        this.state.notes.reverse().map(note =>
          <li>{note}</li>
        )
      )
    }
  }

  render() {
    return (
      <div className="main_Postit">
        <h1>Postit</h1>
        <textarea
          rows="4"
          cols="45"
          type="text"
          placeholder="Add a quick note!"
          ref={(input) => { this.note = input; }}
        />
        <input
          type="button"
          value="Add"
          onClick={this.saveNote}
        />
        <ul>
          {this.showNote()}
        </ul>
    </div>
    );
  }
}

export default Postit;
