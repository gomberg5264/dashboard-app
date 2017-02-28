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
          <li className="one_note">{note}</li>
        )
      )
    }
  }

  render() {
    return (
      <div className="main_Postit text-center">
        <h2>Postit</h2>
        <hr />
        <ul>
          {this.showNote()}
        </ul>
        <textarea
          rows="4"
          cols="45"
          type="text"
          placeholder="Add a quick note!"
          ref={(input) => { this.note = input; }}
        />
        <div>
          <input
            type="button"
            className="add_button"
            value="Add"
            onClick={this.saveNote}
          />
        </div>
    </div>
    );
  }
}

export default Postit;
