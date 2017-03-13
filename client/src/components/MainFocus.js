import React, { Component } from 'react';
import '../stylesheets/MainFocus.css';

class MainFocus extends Component {
  constructor() {
    super();
    this.state = {
      mainFocus: null
    }
  }
  render() {
    function save(e) {
      if (e.key === 'Enter') {
        localStorage.setItem('main-focus', this.mainFocus.value )
        this.mainFocus.value;
      }
    }
    return (
      <div>
        <div className="text-center main-focus">
          What is your main focus for today?
          &nbsp;
          <input className="main-focus-input text-center"
            placeholder="Type Here"
            ref={(input) => { this.mainFocus = input; }}
            onKeyPress={save}
          />
          {this.state.mainFocus}
        </div>
      </div>
    );
  }
}

export default MainFocus;
